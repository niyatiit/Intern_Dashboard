import mongoose from "mongoose";

const DB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log(`👏 Database Connected the port : ${process.env.PORT} & host name is : ${mongoose.connection.host}`)
    );
    await mongoose.connect(`${process.env.MONGOOSE_URI}/INTERNSHIP_PROJECT`);
  } catch (err) {
    return console.log("Not Connected the Database Pelase try again");
  }
};
export { DB };