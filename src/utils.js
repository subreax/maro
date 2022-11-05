const _email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isEmailValid(email) {
    return _email_regex.exec(email) != null ? true : false;
}

export function isPasswordValid(password) {
    return true;
}

export function parseGetParams(searchUrl) {
    const urlSearchParams = new URLSearchParams(searchUrl);
    return Object.fromEntries(urlSearchParams.entries());
}
