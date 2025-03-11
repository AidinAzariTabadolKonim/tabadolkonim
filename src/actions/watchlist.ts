import {
  databases,
  DATABASE_ID,
  WATCHLIST_COLLECTION_ID,
  AppwriteQuery as Query,
  AppwriteID as ID,
} from "@lib/appwrite";

export async function fetchWatchlist(userId: string) {
  const response = await databases.listDocuments(
    DATABASE_ID,
    WATCHLIST_COLLECTION_ID,
    [Query.equal("userId", userId)]
  );
  return response.documents;
}

export async function addToWatchlist(userId: string, accountId: string) {
  await databases.createDocument(
    DATABASE_ID,
    WATCHLIST_COLLECTION_ID,
    ID.unique(),
    { userId, accountId }
  );
}
export async function deleteFromWatchlist(watchlistId: string) {
  await databases.deleteDocument(
    DATABASE_ID,
    WATCHLIST_COLLECTION_ID,
    watchlistId
  );
}
