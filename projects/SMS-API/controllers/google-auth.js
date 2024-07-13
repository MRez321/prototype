require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth/google/callback'
);

exports.homePage = (req, res, next) => {
    // GET /
    res.send('<a href="/auth/google">Login with Google</a>');

}
exports.authGoogle = (req, res, next) => {
    // GET /auth/google
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile'],
    });
    res.redirect(url);
}
exports.authGoogleCallback = async (req, res, next) => {
    //  GET /auth/google/callback
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const response = await oauth2Client.request({ url });
    const user = response.data;

    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`/profile?token=${token}`);
}
exports.profile = (req, res, next) => {
    // GET /profile
    const { token } = req.query;

    if (!token) {
        return res.redirect('/');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }

        res.send(`Hello ${decoded.user.name}`);
    });
}