require("dotenv").config();
const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

const userSchema = {
  name: { type: "string", empty: false, max: 255 },
  email: { type: "email", empty: false },
  password: { type: "string", min: 8, empty: false },
};

const createUser = async (req, res) => {
  const { body } = req;

  // Validasi data masukan
  const validationResponse = v.validate(body, userSchema);

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

  const isEmailUsed = await User.findOne({
    where: { email: body.email },
  });

  if (isEmailUsed) {
    return res.status(400).json({
      code: 400,
      status: "error",
      data: {
        error: "Email has been used",
      },
    });
  }

  const password = bcrypt.hashSync(body.password, 10);

  try {
    const user = await User.create({ ...body, password });
    return res.json({
      code: 200,
      status: "success",
      data: {
        name: user.name,
        email: user.email,
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

module.exports = createUser;
