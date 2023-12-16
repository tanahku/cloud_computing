const express = require("express");
const router = express.Router();
const uploadImage = require("../middleware/uploadImage");

const plantHandler = require("./handlers/plants");

router.get("/", plantHandler.getAllPlant);
router.get("/:id", plantHandler.getDetailPlant);
router.put("/:id", uploadImage.single("image"), plantHandler.editPlant);
router.delete("/:id", plantHandler.deletePlant);
router.post("/", uploadImage.single("image"), plantHandler.createPlant);

module.exports = router;
