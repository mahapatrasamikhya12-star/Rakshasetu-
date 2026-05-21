const axios = require("axios");

const sendSOS = async (req, res) => {
    try {
        const { location, contacts } = req.body;
        // contacts = array of 10-digit Indian numbers

        if (!contacts || contacts.length === 0) {
            return res.status(400).json({ success: false, message: "No contacts provided" });
        }

        const message = `SOS ALERT! I need immediate help! My live location: ${location}`;
        const numbers = contacts.join(",");

        const response = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                message,
                language: "english",
                route: "q",
                numbers,
            },
            {
                headers: {
                    authorization: process.env.FAST2SMS_API_KEY
                }
            }
        );

        console.log("Fast2SMS response:", response.data);

        if (response.data.return === true) {
            return res.status(200).json({ success: true, message: "SOS sent!" });
        } else {
            return res.status(500).json({ success: false, error: response.data });
        }

    } catch (error) {
        console.error("SOS Error:", error.message);
        return res.status(500).json({ success: false, message: "Failed to send SOS" });
    }
};

module.exports = { sendSOS };