import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userModel = new User();

// register new user
const handleRegisterUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if user with that email exists
        const userExists = await userModel.getUserByEmail(email);
        if (userExists) {
            return res.status(409).json({ message: "User with that email already exists" });
        }

        // register user
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.registerNewUser({ email, password: hashedPassword });

        if(!result){
            return res.status(400).json({message: "An error occurred creating user"})
        }
        return res.status(200).json(result);

    } catch (error) {
        console.log("an error occurred registering new user", error);
        return res.status(500).json({ message: "Internal server error!" })
    }
}


// handle user login
const handleUserLogin = async (req,res) => {
    const { email, password } = req.body;

    try {
        // check if user with that email exists
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User with that email does not exist" });
        }

        // compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // crete a json web toke
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '14d' });

        return res.status(200).json({ message: "User logged in successfully" , token: token});

    } catch (error) {
        console.log("an error occurred logging in user", error);
        return res.status(500).json({ message: "Internal server error!" })
    }
}

export default {
    handleRegisterUser,
    handleUserLogin,
}