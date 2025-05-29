/**
 * Middleware para autorizar apenas administradores.
 * Verifica se o usuário autenticado tem o papel 'admin'.
 */
export function authorizeAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res
    .status(403)
    .json({ message: 'Acesso restrito a administradores.' });
}
