
const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const quizRoute = require("./routes/quiz");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());


mongoose
 .connect(process.env.MONGODB_URI)
 .then(()=>console.log("DB connected"))
 .catch((error)=>console.log("error",error));


 app.use("/api/v1/auth", authRoute);
 app.use("/api/v1/quiz", quizRoute)

 app.use("*", (req, res) => {
   res.status(404).json({ errorMessage: "Route not found!" });
 });

 const PORT = 3000;
 app.listen(PORT, () => {
   console.log(`server is running at ${PORT}`);
 });
