const CLIENT_ID=process.env.CLIENT_ID;
const REDIRECT_URI=process.env.REDIRECT_URI
const AUTH_ENDPOINT = process.env.AUTH_ENDPOINT
const RESPONSE_TYPE = process.env.RESPONSE_TYPE

exports.login = async function (req, res) {
    try {
        const { username, password } = req.body;


        const user = await UserModel.findOne({
            username: username
        }).exec();

        if (!user) {
            return res.status(400).send({
                message: "Error! Invalid username or password!"
            });
        }

        const isMatch = await user.validatePassword(password);

        if (!isMatch) {
            return res.status(400).send({
                message: "Error! Invalid username or password!"
            });
        }

        const token = generateToken(user._id, user.username);
        user.token = token;
        await user.save();

        return res.status(201).send({
            message: "Logged in successfully!",
            token: token,
            expiresIn: 3600
        });
    } catch (err) {
        //TODO: other error handling
        return res.status(500).send({
            error: 'Something went wrong'
        });
    }
}