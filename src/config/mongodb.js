import { MongoClient } from "mongodb";
import { env } from "*/config/environtment";
//PC083duIobE5vfSf
const uri = env.MONGODB_URI;

let dbInstance = null;
export const connectDB = async () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  //connect the client to the server
  await client.connect();
  //assign clientDB to our dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};
//get Database Instance
export const getDB = () => {
  if (!dbInstance) throw new Error("Must connect to Database first!");
  return dbInstance;
};

// const listDatabases = async (client) => {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log(databasesList);
//   console.log("your databases:");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// };
