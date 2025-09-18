import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function checkAuthenticity(title, fileBuffer) {
  try {
  
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const imageBase64 = fileBuffer.toString("base64");
  
    let mimeType = "image/png"; 
    if (fileBuffer[0] === 0xFF && fileBuffer[1] === 0xD8) {
      mimeType = "image/jpeg";
    } else if (fileBuffer[0] === 0x89 && fileBuffer[1] === 0x50) {
      mimeType = "image/png";
    } else if (fileBuffer[0] === 0x47 && fileBuffer[1] === 0x49) {
      mimeType = "image/gif";
    }
    
    const parts = [
      {
        text: `Check if this title and image are real or fake. Respond only with "real" or "fake".\nTitle: ${title}`
      },
      {
        inlineData: {
          mimeType: mimeType,
          data: imageBase64
        }
      }
    ];

    const response = await model.generateContent(parts);
    const text = response.response.text().toLowerCase();
    
    return text.includes("fake") ? "fake" : "real";
  } catch (err) {
    console.error("AI check error:", err);
    return "unknown";
  }
}