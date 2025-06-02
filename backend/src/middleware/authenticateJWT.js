import jwt from 'jsonwebtoken';

/**
 * Middleware para autenticação JWT.
 * Verifica se o token está presente e válido no header Authorization.
 * Se válido, adiciona os dados do usuário em req.user e permite o acesso à rota.
 * Se inválido ou ausente, retorna erro 401 (não autorizado).
 */
export function authenticateJWT(req, res, next) {
  // O token pode vir do header ou do cookie
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Disponibiliza os dados do usuário para as próximas funções
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}
