/**
 * Middleware para proteger rotas destinadas apenas a administradores.
 * Verifica se o usuário está logado E se é um administrador.
 */
export default function authAdmin(req, res, next) {
  if (req.session && req.session.userId && req.session.isAdmin) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: 'Acesso restrito ao painel administrativo. Faça login como admin.',
  });
}
