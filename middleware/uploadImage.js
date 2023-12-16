const multer = require("multer");

// Fungsi untuk memeriksa tipe file yang diterima
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Menerima file jika tipe filenya adalah gambar
  } else {
    cb(new Error("File bukan berupa gambar"), false); // Menolak file jika bukan berupa gambar
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({ storage, fileFilter });

module.exports = uploadImage;
