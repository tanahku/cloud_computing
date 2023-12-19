require("dotenv").config();
const { Plant } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const { bucket } = require("../../../middleware/gcsStorage"); // Sesuaikan dengan path ke file konfigurasi GCS

const plantSchema = {
  name: { type: "string", empty: false, max: 255 },
  description: { type: "string", empty: false },
  latin_name: { type: "string", empty: false },
  soil: { type: "string", empty: false },
};

module.exports = async (req, res) => {
  const { body } = req;

  const validationResponse = v.validate(body, plantSchema);

  if (validationResponse !== true) {
    return res.status(400).json({
      code: 400,
      status: "error",
      data: {
        error: "Validation failed",
        details: validationResponse,
      },
    });
  }

  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        code: 400,
        status: "error",
        data: {
          error: "No file uploaded",
        },
      });
    }
    // const timestamp = new Date().toISOString().replace(/[-:]/g, "");
    // const newFileName = `${timestamp}_${file.originalname}`;
    // const blob = bucket.file(newFileName);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.error(err);
      return res.status(500).json({
        code: 500,
        status: "error",
        data: err.message,
      });
    });

    blobStream.on("finish", async () => {
      // Setelah gambar berhasil diunggah ke GCS, simpan data tanaman ke database
      try {
        const plant = await Plant.create({
          ...body,
          image: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
        });

        return res.json({
          code: 200,
          status: "success",
          data: {
            name: plant.name,
            image: plant.image,
            description: plant.description,
            latinName: plant.latinName,
            soil: plant.soil,
          },
        });
      } catch (error) {
        return res.status(500).json({
          code: 500,
          status: "error",
          data: error.message,
        });
      }
    });

    blobStream.end(file.buffer);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      data: error.message,
    });
  }
};
