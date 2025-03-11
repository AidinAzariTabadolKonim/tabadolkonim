import {
  databases,
  DATABASE_ID,
  RATINGS_COLLECTION_ID,
  ACCOUNTS_COLLECTION_ID,
  AppwriteQuery as Query,
  AppwriteID,
} from "@lib/appwrite";
import { InstagramAccount } from "../types";

export async function fetchAllAccounts(): Promise<InstagramAccount[]> {
  let allAccounts: InstagramAccount[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const response = await databases.listDocuments(
      DATABASE_ID,
      ACCOUNTS_COLLECTION_ID,
      [Query.limit(limit), Query.offset(offset)]
    );
    const batch = response.documents as unknown as InstagramAccount[];
    allAccounts = [...allAccounts, ...batch];

    if (batch.length < limit) break;
    offset += limit;
  }

  return allAccounts;
}

export async function addAccount(
  data: Omit<
    InstagramAccount,
    "$id" | "totalStars" | "voteCount" | "userId" | "source"
  >,
  userId: string,
  isAdmin: boolean
): Promise<void> {
  const instagramRegex =
    /^https:\/\/www\.instagram\.com\/[A-Za-z0-9._]{1,30}\/?$/;
  if (!instagramRegex.test(data.link)) {
    throw new Error("لینک اینستاگرام معتبر نیست");
  }

  const existing = await databases.listDocuments(
    DATABASE_ID,
    ACCOUNTS_COLLECTION_ID,
    [Query.equal("username", data.username), Query.equal("link", data.link)]
  );
  if (existing.total > 0) {
    throw new Error("این نام کاربری یا لینک قبلاً ثبت شده است");
  }

  const source = isAdmin ? "admin_search" : "user_added";

  await databases.createDocument(
    DATABASE_ID,
    ACCOUNTS_COLLECTION_ID,
    AppwriteID.unique(),
    {
      ...data,
      userId,
      source,
      totalStars: 0,
      voteCount: 0,
    }
  );
}

export async function rateAccount(
  accountId: string,
  userId: string,
  stars: number
) {
  // Check if user has already rated this account
  const existingRating = await databases.listDocuments(
    DATABASE_ID,
    RATINGS_COLLECTION_ID,
    [Query.equal("accountId", accountId), Query.equal("userId", userId)]
  );

  const account = await databases.getDocument(
    DATABASE_ID,
    ACCOUNTS_COLLECTION_ID,
    accountId
  );
  let newTotalStars = account.totalStars || 0;
  let newVoteCount = account.voteCount || 0;

  if (existingRating.total > 0) {
    // Update existing rating
    const ratingId = existingRating.documents[0].$id;
    const oldStars = existingRating.documents[0].stars;
    await databases.updateDocument(
      DATABASE_ID,
      RATINGS_COLLECTION_ID,
      ratingId,
      { stars }
    );
    newTotalStars = newTotalStars - oldStars + stars;
  } else {
    // Create new rating
    await databases.createDocument(
      DATABASE_ID,
      RATINGS_COLLECTION_ID,
      AppwriteID.unique(),
      { accountId, userId, stars }
    );
    newTotalStars += stars;
    newVoteCount += 1;
  }

  // Update account totals
  await databases.updateDocument(
    DATABASE_ID,
    ACCOUNTS_COLLECTION_ID,
    accountId,
    { totalStars: newTotalStars, voteCount: newVoteCount }
  );
}
export async function deleteAccount(accountId: string) {
  await databases.deleteDocument(
    DATABASE_ID,
    ACCOUNTS_COLLECTION_ID,
    accountId
  );
}
