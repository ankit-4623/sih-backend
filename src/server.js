import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import photoRoutes from "./route/photo.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",  photoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});