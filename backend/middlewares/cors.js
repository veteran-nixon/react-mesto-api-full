const allowedCors = 'http://mesto.dolganev.nomoredomains.xyz/';

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};

module.exports = cors;
