// get the model
const userModel = require("../models/user-model")

// importing bcrypt to create salt and hash
const bcrypt = require("bcrypt");

// importing generteToken
const generateToken = require("../utils/generateToken");


module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Now we'll find on the basis of email if that email user already exists
        let user = await userModel.findOne({email});
        
        // If user already exists, then return an error
        if(user){
            return res.status(400).json({ message: "User with this email already exists" }); // or can res.send("")
        }

        // Performing salt aur hash ka kaam
        let salt = await bcrypt.genSalt(); // by default 10 rounds leta h
        let hash = await bcrypt.hash(password, salt);

        // Otherwise, create a new user
        user = await userModel.create({
            email,
            password: hash,  // password save hoga a hashed in DB
            name,
        });

        // Ab account bn chuka h aur agr itna krke chhod doge fir user ko manually login krna pdega account creation ke baad,
        // lekin hm chahate h ki jb user apna account create kre tb wo automatically login hojaye
        // To do that, we need to generate a JWT token and send it to client, then client will store that JWT and send it with every request in Authorization header

        // Hm token create krenge, aur ek seperate utility function bnayenge to generate token

        // ab mujhe ise wo data bhejna h jo data mujhe put krwana h token mei
        let token = generateToken({ email });

        // Ab mujhe token ke basis pr cookie bnani pdegi
        // Aur wo token hm bhej denge cookie se hmare browser pr
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days -> 30 din, hrr din m 25 ghnte, hrr ghnte mei 60 min, hrr min mei 60 sec, aur harr sec m 1000 mili second
        })

        res.status(201).send(user);
    } catch (error) {
        res.status(500).send("some error occurred: " + error.message);
    }
}


module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // user ke email ke basis pr pehle check krna h ki account exist krta bhi h ya nhi
        let user = await userModel.findOne({ email });

        if(!user){   // agr user exist nhi krta h
            return res.status(500).json({ message: "Email or Password incorrect" });
        }

        // agr user exist h, check krna h ki password correct h ya nhi
        let result = await bcrypt.compare(password, user.password);

        if(result){  // mtlb ki password correct h
            // password correct h, agr sahi h, token generate krenge
            let token = generateToken({ email });

            // Ab mujhe token ke basis pr cookie bnani pdegi
            // Aur wo token hm bhej denge cookie se hmare browser pr
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days -> 30 din, hrr din m 25 ghnte, hrr ghnte mei 60 min, hrr min mei 60 sec, aur harr sec m 1000 mili second
            })

            // Jb main yhn pr user ko send kr rha hun tb i don't want ki yhn pr password bhi dikhe so,
            res.status(201).send("Logged in Successfully");
        }
        else{  // agr password incorrect h
            return res.status(500).json({ message: "Email or Password incorrect" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
}


// Validation bhi bnana h ki user jo dusre route m jaa rha h wo whi user h jisne login kiya h
// toh hm req mei data bhej denge
// uska code likha h ----> 


module.exports.logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0) // Immediately expire the cookie
    });

    res.status(200).json({ message: "Logout successful" });
};



module.exports.getUserProfile = (req, res) => {
    // iss route pr aane se pehle ye check krna bht zaruri h ki user logged in h ya nhi
    // so hm ek middleware bnayenge protected/ isLoggedIn ke naam se jo ki iss route ke pehle chlega
    res.send("loggedin ho aap")
}