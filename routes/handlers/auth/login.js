const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");
const v = new Validator();

const loginSchema = {
  email: { type: "email", empty: false },
  password: { type: "string", min: 8, empty: false },
};

module.exports = async (req, res) => {
  const { body } = req;

  // Validasi input
  const validationResponse = v.validate(body, loginSchema);

  if (validationResponse !== true) {
    return res.status(400).json({
      meta: {
        message: "Validation failed",
        code: 400,
        status: "error",
      },
      data: validationResponse,
    });
  }

  try {
    const user = await User.findOne({
      where: { email: body.email },
    });

    if (!user) {
      return res.status(401).json({
        meta: {
          message:
            "Authentication failed. Please ensure your email and password are correct.",
          code: 401,
          status: "error",
        },
        data: null,
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(body.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        meta: {
          message:
            "Authentication failed. Please ensure your email and password are correct.",
          code: 401,
          status: "error",
        },
        data: null,
      });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      image_profile: user.image_profile,
    };

    const secret = process.env.JWT_SECRET;
    const expiresIn = "1h"; // Use "1h" for 1 hour expiration

    const token = jwt.sign(payload, secret, { expiresIn });

    return res.status(200).json({
      meta: {
        message: "Authentication successful",
        code: 200,
        status: "success",
      },
      data: {
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      meta: {
        message: "Internal Server Error",
        code: 500,
        status: "error",
      },
      data: error.message,
    });
  }
};
