const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error, success } = require('../utils/responseWrapper');

const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.send(error(400, 'All fields are required'));
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send(error(409, 'User is already registered'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.send(success(201, 'User created successfully'));
    } catch (e) {
        console.log(e);
        return res.send(error(500, e.message));
    }
};

const loginController = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        if (!name,!email || !password ) {
            return res.send(error(400, 'All fields are required'));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.send(error(404, 'User is not registered'));
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.send(error(403, 'Incorrect password'));
        }

        const accessToken = generateAccessToken({ _id: user._id, email: user.email });

        return res.send(success(200, { accessToken, user }));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const generateAccessToken = (data) => {
    try {
        return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '10s' });
    } catch (e) {
        console.log(e);
        return res.send(error(401, 'Invalid refresh token'));
    }
};

module.exports = { signupController, loginController };
