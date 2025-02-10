const { Firestore } = require("@google-cloud/firestore");

// Create a new client
export const firestore = new Firestore();

export const resultCollectionName = "results";
export const cacheGeneratePerspectiveCollectionName =
  "cache_generatePerspective";
