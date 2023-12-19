const express = require("express");
const router = express.Router();
// const uploadImage = require("../middleware/uploadImage");
const { multerUpload } = require("../middleware/gcsStorage"); // Sesuaikan dengan path ke file konfigurasi GCS

const plantHandler = require("./handlers/plants");

router.get("/", plantHandler.getAllPlant);
router.get("/:id", plantHandler.getDetailPlant);
router.put("/:id", multerUpload.single("image"), plantHandler.editPlant);
router.delete("/:id", plantHandler.deletePlant);
router.post("/", multerUpload.single("image"), plantHandler.createPlant);

module.exports = router;
