const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const usersTable = require('../../models/userModel')

const register = async(req, res) => {
    const { first_name, last_name, email, password, about_us } = req.body;
    const checkIfUserExist = await usersTable.findOne({ email: email })
    try {
        // ✅ User sudah terdaftar ??
        if (checkIfUserExist) {
            return res.status(200).json({ success: false, message: "user is already exist" })
        } else {
            // ✅ Hash password dan store ke db
            const hashpw = await bcrypt.hash(password, 10)
            const user = new usersTable({ first_name, last_name, email, password: hashpw, about_us })
            user.save()
            return res.status(200).json({ success: true, message: "user is created" })
        }
    } catch (e) {
        // ✅ Handle error
        return res.status(404).json({ errors: "errors" })
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await usersTable.findOne({ email });
    } catch (e) {
        console.log("Error");
    }

    if (existingUser == null) {
        return res.status(404).json({ status: false, message: "User is not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (isPasswordCorrect) {
        // If password is correct, generate a token
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time (optional)
        });

        return res.status(200).json({
            status: true,
            message: "Successfully login!",
            user: existingUser,
            token: token, // Include the generated token in the response
        });
    }

    return res.status(400).json({ status: false, message: "Incorrect Password!" });
};

module.exports = { register,  login  };