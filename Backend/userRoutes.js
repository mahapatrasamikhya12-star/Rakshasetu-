const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/User");


// ===============================
// AUTH MIDDLEWARE
// ===============================

const authMiddleware = async (req, res, next) => {

    try {

        const token =
        req.headers.authorization?.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "No token provided"
            });
        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({

            success: false,

            message: "Invalid token"
        });
    }
};


// ===============================
// REGISTER
// ===============================

router.post(

    "/register",

    async (req, res) => {

        try {

            const {

                name,
                email,
                password

            } = req.body;

            // CHECK USER
            const existingUser =
            await User.findOne({ email });

            if (existingUser) {

                return res.status(400).json({

                    success: false,

                    message:
                    "User already exists"
                });
            }

            // HASH PASSWORD
            const hashedPassword =
            await bcrypt.hash(password, 10);

            // CREATE USER
            const user =
            await User.create({

                name,
                email,

                password:
                hashedPassword
            });

            res.json({

                success: true,

                message:
                "Registered Successfully"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                "Server Error"
            });
        }
    }
);


// ===============================
// LOGIN
// ===============================

router.post(

    "/login",

    async (req, res) => {

        try {

            const {

                email,
                password

            } = req.body;

            // FIND USER
            const user =
            await User.findOne({ email });

            if (!user) {

                return res.status(400).json({

                    success: false,

                    message:
                    "User not found"
                });
            }

            // CHECK PASSWORD
            const isMatch =
            await bcrypt.compare(

                password,
                user.password
            );

            if (!isMatch) {

                return res.status(400).json({

                    success: false,

                    message:
                    "Invalid credentials"
                });
            }

            // TOKEN
            const token = jwt.sign(

                {

                    id: user._id
                },

                process.env.JWT_SECRET,

                {

                    expiresIn: "7d"
                }
            );

            res.json({

                success: true,

                token,

                user: {

                    id: user._id,

                    name: user.name,

                    email: user.email
                }
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                "Server Error"
            });
        }
    }
);


// ===============================
// SAVE EMERGENCY CONTACT
// ===============================

router.post(

    "/save-contact",

    authMiddleware,

    async (req, res) => {

        try {

            const {

                name,
                phone

            } = req.body;

            const user =
            await User.findById(req.user.id);

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                    "User not found"
                });
            }

            user.emergencyContact = {

                name,
                phone
            };

            await user.save();

            res.json({

                success: true,

                message:
                "Emergency Contact Saved"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                "Server Error"
            });
        }
    }
);


// ===============================
// GET EMERGENCY CONTACT
// ===============================

router.get(

    "/get-contact",

    authMiddleware,

    async (req, res) => {

        try {

            const user =
            await User.findById(req.user.id);

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                    "User not found"
                });
            }

            res.json({

                success: true,

                contact:
                user.emergencyContact
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                "Server Error"
            });
        }
    }
);


// ===============================
// SEND SOS
// ===============================

router.post(

    "/send-sos",

    authMiddleware,

    async (req, res) => {

        try {

            const { location } = req.body;

            const user =
            await User.findById(req.user.id);

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                    "User not found"
                });
            }

            const contact =
            user.emergencyContact;

            if (!contact) {

                return res.status(400).json({

                    success: false,

                    message:
                    "No emergency contact saved"
                });
            }

            // MESSAGE
            const message = `

🚨 EMERGENCY SOS ALERT 🚨

${user.name} may be in danger.

📍 Live Location:
${location}

Please contact immediately.

            `;

            // TERMINAL OUTPUT
            console.log(message);

            console.log(

"Emergency Contact:",
contact.phone
            );

            res.json({

                success: true,

                message:
                "SOS Sent Successfully"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                "Server Error"
            });
        }
    }
);


module.exports = router;