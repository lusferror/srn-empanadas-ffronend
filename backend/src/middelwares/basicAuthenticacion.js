export const basicAuthenticacion = (req, res, next) => {
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = decodedToken.split(':');
    if (username === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD) {
      return next();
    }
  }
  res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"');
  return res.status(401).json({ message: 'Unauthorized', success: false });
}