import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import photoRoutes from "./route/photo.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT



app.use(cors({
  origin: [
    "http://localhost:5173",
    "exp://10.172.237.69:8081",
    "http://localhost:8081"
  ],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",  photoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});