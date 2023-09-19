import mongoose from "mongoose";

export const connectBD = async () => {
    try {
        await mongoose.connect("mongodb://localhost/ecommerce");
        console.log(">>> DB is conected");
    } catch (error) {
        console.log(error);
    }
};

