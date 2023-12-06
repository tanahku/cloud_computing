const { User } = require("../../../models");

// Get all users data
module.exports = async (req, res) => {
  const users = await User.findAll({
    // attributes: ["name", "email"], (perintah ini di gunakan untuk memfilter data yg akan ditampilkan)
    attributes: { exclude: ["password"] }, // ini untuk filter juga tapi yg di tulis tidak akan di tampilkan
  });

  return res.json({
    meta: {
      message: "Get all users successfully",
      code: 200,
      status: "success",
    },
    data: users,
  });
};
