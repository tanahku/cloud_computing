const { Plant } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const plantId = req.params.id;

    // Temukan tanaman berdasarkan ID
    const plant = await Plant.findByPk(plantId);

    if (!plant) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "Plant not found",
        },
      });
    }

    // Respon dengan detail tanaman
    return res.json({
      code: 200,
      status: "success",
      data: {
        id: plant.id,
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
