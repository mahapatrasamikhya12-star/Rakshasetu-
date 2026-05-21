import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

import authRoutes from "./routes/auth.js";
import sosRoutes from "./routes/SOSRoutes.js";
import Rating from "./models/Rating.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({
    origin: "*",
}));

app.use(express.json());

/* ---------------- GEMINI AI ---------------- */

if (!process.env.GEMINI_API_KEY) {

    console.log("❌ GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => {

    res.send("Rakshasetu Backend Running ✅");
});

app.use("/api/auth", authRoutes);

/* SOS ROUTE */
app.use("/api/sos", sosRoutes);
app.use("/api/feedback", feedbackRoutes);

/* ---------------- SAVE RATING ---------------- */

app.post("/api/rating", async (req, res) => {

    try {

        const { stars } = req.body;

        if (!stars) {

            return res.status(400).json({
                success: false,
                message: "Rating missing",
            });
        }

        const newRating = new Rating({
            stars,
        });

        await newRating.save();

        console.log("⭐ New Rating:", stars);

        res.json({
            success: true,
            message: "Rating submitted successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

/* ---------------- GET ALL RATINGS ---------------- */

app.get("/api/rating", async (req, res) => {

    try {

        const ratings = await Rating.find().sort({
            createdAt: -1,
        });

        res.json(ratings);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
});

/* ---------------- AI CHAT ROUTE ---------------- */

app.post("/api/ai-chat", async (req, res) => {

    try {

        const { message, personaName } = req.body;

        if (!message || message.trim() === "") {

            return res.json({
                reply: "Haan bolo yaar."
            });
        }

        const friendName = personaName || "Anjali";

        const prompt = `
You are ${friendName}, a caring female friend talking naturally on a phone call.

RULES:
- Reply naturally like a real person
- If user speaks Hindi reply Hindi
- If user speaks English reply English
- If user speaks Hinglish reply Hinglish
- Keep replies short and realistic
- Never say you are AI
- Sound emotional, caring, protective
- Talk like a best friend on call
- Never give robotic answers
- Never repeat same sentences

User Message:
${message}
`;

        const result =
        await model.generateContent(prompt);

        const response =
        result.response;

        const text =
        response.text();

        return res.json({
            reply: text,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            reply:
            "Yaar thoda network issue ho gaya.",
        });
    }
});

/* ---------------- DATABASE ---------------- */

const PORT =
process.env.PORT || 5008;

mongoose
    .connect(process.env.MONGO_URI)

    .then(() => {

        console.log(
            "✅ MongoDB Connected Successfully"
        );

        app.listen(PORT, "0.0.0.0", () => {

            console.log(
`✅ Server running on http://localhost:${PORT}`
            );
        });
    })

    .catch((err) => {

        console.log(
            "❌ MongoDB Error:",
            err.message
        );
    });