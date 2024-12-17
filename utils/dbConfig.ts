import env from "dotenv";
import { connect } from "mongoose";
env.config();

export const dbConfig = async () => {
  try {
    await connect(process.env.MONGODB_LIVE_URL as string).then(() => {
      console.clear();
      console.log("connected 🚀🚀❤️❤️");
    });
  } catch (error) {
    return error;
  }
};
