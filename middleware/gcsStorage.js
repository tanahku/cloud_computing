const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE_PATH,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

const multerStorage = Multer.memoryStorage();

const multerUpload = Multer({
  storage: multerStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Batasan ukuran file (5 MB)
  },
});

module.exports = { multerUpload, bucket };
