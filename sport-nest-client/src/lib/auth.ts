import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    client,
  }),

  //for server auth
    plugins: [
        jwt(), 
    ],
    session:{
      cookieCache:{
        enabled: true,
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60
      }
    }
});



