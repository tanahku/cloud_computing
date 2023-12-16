const { Plant } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

// const plantSchema = {
//   name: { type: "string", empty: false, max: 255 },
//   description: { type: "string", empty: false },
//   latin_name: { type: "string", empty: false },
//   soil: { type: "string", empty: false },
// };

module.exports = async (req, res) => {
  const { body, file } = req;
  const plantId = req.params.id; // Ambil ID tanaman dari parameter URL

  // Validasi data masukan
  //   const validationResponse = v.validate(body, plantSchema);

  //   if (validationResponse !== true) {
  //     return res.status(400).json({
  //       code: 400,
  //       status: "error",
  //       data: {
  //         error: "Validation failed",
  //         details: validationResponse,
  //       },
  //     });
  //   }

  try {
    // Temukan tanaman berdasarkan ID
    const existingPlant = await Plant.findByPk(plantId);

    if (!existingPlant) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "Plant not found",
        },
      });
    }

    // Update data tanaman berdasarkan field yang dikirim dalam body
    const updatedPlant = await existingPlant.update({
      ...body,
      image: file ? file.filename : existingPlant.image, // Menggunakan file lama jika file baru tidak diunggah
    });

    return res.json({
      code: 200,
      status: "success",
      data: {
        name: updatedPlant.name,
        image: updatedPlant.image,
        description: updatedPlant.description,
        latinName: updatedPlant.latinName,
        soil: updatedPlant.soil,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      data: error.message,
    });
  }
};
