require("dotenv").config();
const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis"); // Perbaikan pada import

module.exports = async (req, res) => {
  const { code } = req.query;
  const { body } = req;

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, // Perbaikan pada process.env
    process.env.GOOGLE_CLIENT_SECRET, // Perbaikan pada process.env
    "http://localhost:5000/auth/google/callback"
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client, // Perbaikan pada object auth
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      // Perbaikan pada if condition
      return res.status(400).json({
        code: 400,
        status: "error",
        data: data,
      });
    }

    const isEmailUsed = await User.findOne({
      where: { email: data.email },
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

    const user = await User.create({
      name: data.name,
      email: data.email,
    });

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      image_profile: user.image_profile,
    };

    const secret = process.env.JWT_SECRET;

    const expiresIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    return res.json({
      code: 200,
      status: "success",
      data: {
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      data: error.message,
    });
  }
};
