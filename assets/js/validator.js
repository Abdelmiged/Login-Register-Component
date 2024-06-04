let emailRegex = /^\w[a-zA-Z0-9_\.]*@[a-zA-Z]+\.[a-z]{2,15}$/;
let passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[\w\d@$!%*#?&]+$/;

export function validateEmail(email) {
    return emailRegex.test(email);
}

export function validatePassword(password) {
    return passwordRegex.test(password);
}