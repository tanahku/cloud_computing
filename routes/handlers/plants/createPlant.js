require("dotenv").config();
const { Plant } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

const plantSchema = {
  name: { type: "string", empty: false, max: 255 },
  description: { type: "string", empty: false },
  latin_name: { type: "string", empty: false },
  soil: { type: "string", empty: false },
};

module.exports = async (req, res) => {
  const { body, file } = req;

  // Validasi data masukan
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
    const plant = await Plant.create({ ...body, image: file.filename });
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
};
