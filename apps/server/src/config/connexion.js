import mongoose from "mongoose"

const connectToDatabase = async () => {
  await mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Database has been connection is successfully 👍"))
        .catch(() => console.log("Database has been not connection 👎"))
}

export default connectToDatabase