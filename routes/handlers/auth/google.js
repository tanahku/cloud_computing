require("dotenv").config();
const { google } = require("googleapis");

module.exports = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.envGOOGLE_CLIENT_SECRET,
    "http://localhost:5000/auth/google/callback"
  );

  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });

  res.redirect(authorizationUrl);
};
