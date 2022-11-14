const _mapBackHost = "http://37.18.121.45:3000";
//const _mapBackHost = "http://127.0.0.1:3000";
//const _hostUrl = "http://192.168.0.100:5173";
const _hostUrl = "http://192.168.0.100:5173";


let _accessToken = "";
let _refreshToken = "";
let _userId = "";
let _groupId = "";

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
        _accessToken = getCookie("accessToken");
        _refreshToken = getCookie("refreshToken");
        _userId = getCookie("userId");
        _groupId = getCookie("groupId");
        //_groupId = "239b5ff6-937b-4629-97ad-ffbc44db5dd7";
    },

    signIn: async (login, password, rememberMe) => {
        const response = await _post("/api/auth/login", {
            arg: login,
            password: password,
            rememberMe: rememberMe
        });

        if (!response.ok) {
            return false;
        }

        const json = await response.json();
        console.log(json);
        _accessToken = json.accessToken;
        _userId = json.userId;

        setCookie("accessToken", `${_accessToken}`, { expires: new Date(json.expires) });
        setCookie("userId", _userId, { expires: new Date(json.expires) });

        if (rememberMe && json.refreshToken) {
            setCookie("refreshToken", json.refreshToken, { expires: new Date(json.expires) });
        }

        return true;
    },

    saveGroupId: (groupId) => {
        _groupId = groupId;
        setCookie("groupId", _groupId);
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
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("userId");
        deleteCookie("groupId");
        _accessToken = "";
        _refreshToken = "";
        _userId = "";
        _groupId = "";
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
        return await _post("/api/group/create_group", {
            userId: _userId,
            host: _hostUrl
        })
    },

    joinGroup: async () => {
        return await _post("/api/Group/join_group", {
            userId: _userId, 
            groupId: _groupId
        })
    },

    hasGroupId: () => _groupId.length > 0,

    deleteGroup: async () => {
        console.log(_groupId);
        return await _delete(`/api/group/delete_group/${_groupId}`);
    },

    getGroupDetails: async () => {
        return await _get(`/api/Group/group_details/${_groupId}`);
    },

    getUserDetails: async () => {
        return await _get(`/api/user/user_details/${_userId}`);
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
