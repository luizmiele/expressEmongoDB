import mongoose from "mongoose";

async function conectaDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default conectaDatabase;



