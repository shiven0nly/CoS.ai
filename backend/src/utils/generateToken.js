const jwt = require('jsonwebtoken');

// Generate token and save it in cookie
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Secure token storage, immune to XSS
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token, // Send it in body too for apps that can't use cookies
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

module.exports = sendTokenResponse;
