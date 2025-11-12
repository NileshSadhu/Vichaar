export function isPasswordValid(password) {
    const minLength = 8;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
        return "Password length must be at least 8 character long.";
    }

    if (!specialChar.test(password)) {
        return "Password must include at least one specail character.";
    }

    return null;
};

export function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
        return "Email is required";
    }

    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }

    return null;
}
