const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            req.user = validateToken(tokenCookieValue);
        } catch (e) {
            // If there's an error in token validation, proceed without setting req.user
        }
        return next();
    };
}

function redirectIfAuthenticated(req, res, next) {
    const tokenCookieValue = req.cookies['token'];
    if (tokenCookieValue) {
        try {
            req.user = validateToken(tokenCookieValue);
            return res.redirect('/');  // Redirect to the homepage or dashboard
        } catch (e) {
            return next();
        }
    } else {
        return next();
    }
}

module.exports = { checkForAuthenticationCookie, redirectIfAuthenticated };
