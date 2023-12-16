const { Plant } = require("../../../models");

// Get all users data
module.exports = async (req, res) => {
  const plants = await Plant.findAll({ attributes: ["id", "name", "soil"] });

  return res.json({
    meta: {
      message: "Get all plants successfully",
      code: 200,
      status: "success",
    },
    data: plants,
  });
};
