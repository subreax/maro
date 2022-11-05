function _buildUrl(path) {
    return `http://37.18.121.45:7269${path}`;
}

const _hostUrl = "http://192.168.0.100:5173";

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

export const Backend = {
    signIn: async (login, password, rememberMe) => {
        return await _post("/api/auth/login", {
            arg: login,
            password: password,
            rememberMe: rememberMe
        });
    },

    signUp: async (login, password) => {
        return await _post("/api/auth/register", {
            arg: login,
            password: password,
            host: _hostUrl
        });
    },

    confirmRegistration: async (userId, code) => {
        return await _post("/api/auth/confirm", {
            userId, code
        });
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
};
