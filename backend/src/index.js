import dotenv from 'dotenv';
import app from "./app.js";
import connectDB from "./db/dbConnection.js";

dotenv.config({
    path: './.env'
});

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`http:/localhost:${port}/`)
        })
    })
    .catch((error) => {
        console.log("MongoDB connection error.", error);
        process.exit(1);
    })