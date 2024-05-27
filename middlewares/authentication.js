const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            req.user = validateToken(tokenCookieValue);
        } catch (e) { }
        return next();
    };
}



function redirectIfAuthenticated(req, res, next) {
    const tokenCookieValue = req.cookies['token'];
    if (tokenCookieValue) {
        try {
            req.user = validateToken(tokenCookieValue);
            return res.redirect('/');
        } catch (e) {
            return next();
        }
    } else {
        return next();
    }
}

function authenticatedUserOnly(req, res, next) {
    const tokenCookieValue = req.cookies['token']
    if (tokenCookieValue) {
        try {
            req.user = validateToken(tokenCookieValue);
            next()
        } catch (e) {
            console.log('not authenticated');
        }
    }else{
        return res.redirect('/')
    }
}


module.exports = { checkForAuthenticationCookie, redirectIfAuthenticated, authenticatedUserOnly };
