import express from "express";
import multer from "multer";
import { checkAuthenticity } from "../utils/ai.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/verify-photo", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      latitude,
      longitude,
      city,
      district,
      region,
      postalCode,
      country,
    } = req.body;

    if (!description || !latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "description, latitude and longitude are required" });
    }

    let imgUrl = null;
    let authenticity = "";

    if (req.file) {
      authenticity = await checkAuthenticity(
        title || "",
        req.file.buffer,
        req.file.mimetype
      );
    }

    res.json({
      message: "successfully",
      authenticity,
    });
  } catch (err) {
    console.error("Error creating issue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
