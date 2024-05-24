const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res.status(400).json({ errorMessage: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });

        await userData.save();
        res.json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "something went wrong" });
    }
};

const loginUser = async(req,res)=>{
    try {
        const { email, password } = req.body;
         if (!email || !password) {
           return res.status(400).json({
             errorMessage: "Bad Request! Invalid credentials",
           });
         }

         const userDetails = await User.findOne({ email });

         if (!userDetails) {
           return res.status(401).json({ errorMessage: "User doesn't exists" });
         }

         const passwordMatch = await bcrypt.compare(
           password,
           userDetails.password
         );

         if (!passwordMatch) {
           return res.status(401).json({ errorMessage: "Invalid credentials" });
         }
         
         const token = jwt.sign({userId:userDetails._id, name: userDetails.name},process.env.SECRET_CODE, {expiresIn:"60hrs"})
         res.json({
           message: "User logged in",
           name: userDetails.name,
           userId: userDetails?._id,
           token:token,
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Something went wrong!" });
    }
}


module.exports = { registerUser, loginUser };
