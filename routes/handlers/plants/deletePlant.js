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

    // Hapus tanaman
    await plant.destroy();

    return res.json({
      code: 200,
      status: "success",
      data: {
        message: "Plant deleted successfully",
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
