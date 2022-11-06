//const _mapBackHost = "http://37.18.121.45:3000";
const _mapBackHost = "http://127.0.0.1:3000";
const _hostUrl = "http://192.168.0.100:5173";

let _accessToken = undefined;
let _userId = "";


function _buildUrl(path) {
    return `http://37.18.121.45:7269${path}`;
}

async function _get(path) {
    return fetch(_buildUrl(path));
}

async function _post(path, body = {}) {
    const json = JSON.stringify(body);
    console.log(json);

    return fetch(_buildUrl(path), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
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
    return cookie[cookieName];
}

function deleteCookie(cookieName) {
    setCookie(cookieName, "", {
      'max-age': -1
    })
  }

export const Backend = {
    init: async () => {
        _accessToken = getCookie("accessToken");
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
        _accessToken = json.accessToken;

        if (json.refreshToken) {
            setCookie("accessToken", `Bearer_${_accessToken}`, { expires: json.expires });
            setCookie("refreshToken", json.refreshToken, { expires: json.expires });
        }

        return true;
    },

    isSignedIn: () => _accessToken !== undefined,

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
    },

    confirmRegistration: async (userId, code) => {
        return await _post("/api/auth/confirm", {
            userId, code
        });
    },

    addUserDetails: async (userId, firstname, lastname, age) => {
        return await _post(`/api/User/add_user_details/${userId}`, {
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
