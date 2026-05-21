import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/send-sos", async (req, res) => {

    try {

        console.log("BODY:", req.body);

        const {
            phone,
            latitude,
            longitude
        } = req.body;

        if (!phone) {

            return res.status(400).json({
                success: false,
                message: "Phone missing",
            });
        }

        const cleanPhone =
        phone.replace(/\D/g, "");

        const message = `
🚨 EMERGENCY SOS ALERT 🚨

I may be in danger.

📍 Live Location:
https://www.google.com/maps?q=${latitude},${longitude}

Please help immediately.

- Rakshasetu
`;

        console.log("Sending SMS to:", cleanPhone);

        const response = await axios.post(

            "https://www.fast2sms.com/dev/bulkV2",

            {
                route: "v3",

                sender_id: "TXTIND",

                message: message,

                language: "english",

                flash: 0,

                numbers: cleanPhone,
            },

            {
                headers: {
                    authorization:
                    process.env.FAST2SMS_API_KEY,

                    "Content-Type":
                    "application/json",
                },
            }
        );

        console.log("FAST2SMS RESPONSE:");
        console.log(response.data);

        if (!response.data.return) {

            return res.status(400).json({
                success: false,
                message: "SMS Failed",
                data: response.data,
            });
        }

        res.json({
            success: true,
            message: "SOS Sent Successfully",
        });

    } catch (error) {

        console.log("FULL ERROR:");

        if (error.response) {

            console.log(error.response.data);

        } else {

            console.log(error.message);
        }

        res.status(500).json({
            success: false,
            message: "Failed To Send SOS",
        });
    }
});

export default router;