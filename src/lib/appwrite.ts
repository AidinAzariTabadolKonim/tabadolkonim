import { Client, Databases, ID, Query } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export const databases = new Databases(client);
export const DATABASE_ID = "67c0659400092309e435";
export const ACCOUNTS_COLLECTION_ID = "67c065a900395f47e70d";
export const RATINGS_COLLECTION_ID = "67c065b4003bf957aaf6";
export const WATCHLIST_COLLECTION_ID = "67c065c2002ca6a57c8a";
export const AppwriteID = ID;
export const AppwriteQuery = Query;
export default client;
