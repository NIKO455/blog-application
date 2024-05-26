const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

/**
 * Creates a JSON Web Token (JWT) for a user.
 * @param {Object} user - The user object containing user information.
 * @returns {string} - The generated JWT.
 */
function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };

    try {
        return jwt.sign(payload, secretKey);
    } catch (error) {
        console.error('Error creating JWT:', error);
        throw new Error('Internal server error');
    }
}

function validateToken(token) {
    return jwt.verify(token, secretKey)
}

module.exports = {createTokenForUser, validateToken}