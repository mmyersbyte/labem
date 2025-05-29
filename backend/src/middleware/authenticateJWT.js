import jwt from 'jsonwebtoken';

/**
 * Middleware para autenticação JWT.
 * Verifica se o token está presente e válido no header Authorization.
 * Se válido, adiciona os dados do usuário em req.user e permite o acesso à rota.
 * Se inválido ou ausente, retorna erro 401 (não autorizado).
 */
export function authenticateJWT(req, res, next) {
  // O token deve ser enviado no header: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  // Extrai o token do header
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token inválido.' });
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
