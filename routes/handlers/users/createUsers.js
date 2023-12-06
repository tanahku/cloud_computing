const { User } = require("../../../models");

// create a user data
module.exports = async (req, res) => {
  // Gunakan express-validator untuk menentukan aturan validasi

  // Jika ada kesalahan validasi

  const body = req.body;

  const isEmailUsed = await User.findOne({
    where: { email: body.email },
  });

  if (isEmailUsed) {
    return res.status(400).json({
      meta: {
        message: "Email has been used",
        code: 400,
        status: "error",
      },
      data: null,
    });
  }

  // Buat entitas pengguna
  try {
    const user = await User.create(body);
    return res.json({
      meta: {
        message: "Create user successfully",
        code: 200,
        status: "success",
      },
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: "Error creating user",
        code: 500,
        status: "error",
      },
      data: null,
    });
  }
};
