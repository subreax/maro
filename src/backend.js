const _mapBackHost = "http://37.18.121.45:3000";
//const _mapBackHost = "http://127.0.0.1:3000";
//const _hostUrl = "http://25.56.101.230:5173";
//const _hostUrl = "http://192.168.0.100:5173";
const _hostUrl = "http://37.18.121.45";


export const GroupRole = {
    NO_ROLE: 0,
    ADMIN: 1,
    MEMBER: 2
};

let _accessToken = "";
let _refreshToken = "";
let _userId = "";
let _groupId = "";
let _groupRole = GroupRole.NO_ROLE;
let _groupMembers = []

function _setAccessToken(token, modify = true, expires) {
    if (token) {
        _accessToken = token;
        if (modify)
            setCookie("accessToken", _accessToken, { expires: expires })
    }
    else {
        _accessToken = "";
        if (modify)
            deleteCookie("accessToken");
    }
}

function _loadRefreshToken() {
    return localStorage.getItem("refreshToken");
}

function _setRefreshToken(token, modify = true, expires = undefined) {
    if (token) {
        _refreshToken = token;
        if (modify)
            localStorage.setItem("refreshToken", _refreshToken);
    }
    else {
        _refreshToken = "";
        if (modify) 
            localStorage.removeItem("refreshToken")
    }
}

function _setGroupRoleStr(role) {
    if (role) {
        if (role === "group_admin") {
            _groupRole = GroupRole.ADMIN;
        }
        else if (role === "group_member") {
            _groupRole = GroupRole.MEMBER;
        }
        else {
            _groupRole = GroupRole.NO_ROLE;
        }
    }
    else {
        _groupRole = GroupRole.NO_ROLE;
    }
}

function _setUserId(id, modify = true, expires) {
    if (id) {
        _userId = id;
        if (modify)
            setCookie("userId", _userId, { expires });
    }
    else {
        _userId = "";
        if (modify)
            deleteCookie("userId");
    }
}

function _setGroupId(role) {
    _groupId = role ? role : "";
}

function _buildUrl(path) {
    return `http://37.18.121.45:7269${path}`;
}

async function _get(path) {
    return fetch(_buildUrl(path), {
        headers: {
            "Authorization": `Bearer ${_accessToken}`
        }
    });
}

async function _post(path, body = {}) {
    const json = JSON.stringify(body);
    //console.log(json);

    return fetch(_buildUrl(path), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            "Authorization": `Bearer ${_accessToken}`
        },
        body: json
    });
}

async function _delete(path) {
    return fetch(_buildUrl(path), {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${_accessToken}`
        }
    });
}

async function _put(path, body = {}) {
    const json = JSON.stringify(body);
    return fetch(_buildUrl(path), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            "Authorization": `Bearer ${_accessToken}`
        },
        body: json
    });
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })

    if (cookie[cookieName]) {
        return cookie[cookieName];
    }
    return "";
}

function deleteCookie(cookieName) {
    setCookie(cookieName, "", {
        'max-age': -1
    })
}

export const Backend = {
    init: async () => {
        _setAccessToken(getCookie("accessToken"), false);
        _setRefreshToken(_loadRefreshToken(), false);
        _setUserId(getCookie("userId"), false);

        if (Backend.isSignedIn()) {
            const res = await Backend.getUserDetails();
            const json = await res.json();
            /* console.log("user details");
            console.log(json); */
            _setGroupId(json.groupId);
            _setGroupRoleStr(json.groupRole);
            /* console.log(_groupRole); */
        } 
    },

    signIn: async (login, password, rememberMe) => {
        const response = await _post("/api/auth/login", {
            arg: login,
            password: password,
            rememberMe: rememberMe
        });

        const json = await response.json();
        /* console.log("signin");
        console.log(json); */

        if (!response.ok) {
            return false;
        }

        _setAccessToken(json.accessToken, true, json.expires);
        _setRefreshToken(json.refreshToken, true, json.refreshTokenExpires);
        _setUserId(json.userId, true, json.expires);

        Backend.init();

        return true;
    },

    isSignedIn: () => _accessToken.length > 0,

    isFirstSignIn: async () => {
        const details = await Backend.getUserDetails();
        const json = await details.json();
        return json.age === 0;
    },

    signUp: async (login, password) => {
        return await _post("/api/auth/register", {
            arg: login,
            password: password,
            host: _hostUrl
        });
    },

    signOut: async () => {
        _setAccessToken();
        _setRefreshToken();
        _setUserId();
        _setGroupId();
        _setGroupRoleStr();
    },

    refreshToken: async () => {
        return await _put("/api/auth/refresh_token", {
            "access_token": _accessToken,
            "refresh_token": _refreshToken
        });
    },

    confirmRegistration: async (userId, code) => {
        return await _post("/api/auth/confirm", {
            userId, code
        });
    },

    addUserDetails: async (firstname, lastname, age) => {
        return await _post(`/api/User/add_user_details/${_userId}`, {
            firstname, lastname, age
        })
    },

    getUserDetails: async (userId = _userId) => {
        console.log("Getting user details for '%s'", userId);
        return await _get(`/api/user/user_details/${userId}`);
    },

    resetPassword: async (login) => {
        return await _get(`/api/auth/forgot_password?arg=${login}&host=${_hostUrl}`)
    },

    confirmNewPwd: async (login, newpwd, code) => {
        return await _post("/api/auth/reset_password", {
            arg: login,
            code: code,
            password: newpwd
        });
    },

    createGroup: async () => {
        const res = await _post("/api/group/create_group", {
            userId: _userId,
            host: _hostUrl
        });

        const json = await res.json();

        let result = {
            ok: res.ok
        };

        if (res.ok) {
            _setGroupId(json.groupId);
            _setGroupRoleStr("group_admin");
            result = { ...result, qrLink: json.qrLink }
        }
        else {
            console.error(json);
        }
        
        return result;
    },

    joinGroup: async (groupId) => {
        return await _post("/api/Group/join_group", {
            userId: _userId, 
            groupId: groupId
        })
    },

    hasGroupId: () => _groupId.length > 0,

    getGroupRole: () => _groupRole,

    getGroupMembers: async () => {
        if (_groupMembers.length <= 0) {
            const res = await Backend.getGroupDetails()
            if (!res.ok) {
                return { ok: false };
            }

            const json = await res.json();
            const membersIds = json.members;
            let groupMembers = []
            for (let i = 0; i < membersIds.length; ++i) {
                const userId = membersIds[i];
                const res1 = await Backend.getUserDetails(userId)
                const json1 = await res1.json();
                const name = json1.fullName;
                console.log("User name: '%s'", name);
                groupMembers.push(name);
            }

            _groupMembers = groupMembers;
        }

        return {
            ok: true,
            members: _groupMembers
        };
    },
    
    deleteGroup: async () => {
        const res = await _delete(`/api/group/delete_group/${_groupId}`);
        if (res.ok) {
            _setGroupId();
            _setGroupRoleStr();
            return { ok: res.ok }
        }

        _groupMembers = [];
        return { ok: false };
    },

    getGroupDetails: async () => {
        return await _get(`/api/group/group_details/${_groupId}`);
    },

    getMapPoints: async () => {
        const query = await fetch(`${_mapBackHost}/points`);
        return await query.json();
    },

    getMapRoute: async (interests, wishes, mapboxgl_token) => {
        const query = await fetch(`${_mapBackHost}/route?interests=${interests}&wishes=${wishes}&mapboxgl-token=${mapboxgl_token}`);
        return await query.json()
    }
};

Backend.init();
