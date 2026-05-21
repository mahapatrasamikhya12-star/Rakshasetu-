import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

/* SUBMIT FEEDBACK */

router.post("/", async (req, res) => {

  try {

    const { rating } = req.body;

    if (!rating) {

      return res.status(400).json({
        message: "Rating required",
      });
    }

    const newFeedback = new Feedback({
      rating,
    });

    await newFeedback.save();

    console.log(
      `⭐ New Feedback Received: ${rating} Star`
    );

    res.json({
      message: "Feedback submitted successfully ❤️",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;