import { MongoClient } from "mongodb";
import { env } from "*/config/environtment";
//PC083duIobE5vfSf
const uri = env.MONGODB_URI;
console.log(uri);

export const connectDB = async () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    //connect the client to the server
    await client.connect();
    console.log("Connected successfully to server!");

    // list database
    await listDatabases(client);
  } finally {
    //Ensures that the cloent will close when finish/error
    await client.close();
  }
};

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases();
  console.log(databasesList);
  console.log("your databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
};
