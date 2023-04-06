import express from "express";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/environtment";

// import { mapOrder } from "*/utilities/sorts.js";

connectDB()
  .then(() => console.log("Connected success to database server"))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.get("/test", async (req, res) => {
    // const dbInstance = getDB();
    // await dbInstance.collection("board").insertOne({
    //   title: "Group8",
    // });
    res.end("<h1>Hello world</h1><hr/>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello Phong, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`);
  });
};
