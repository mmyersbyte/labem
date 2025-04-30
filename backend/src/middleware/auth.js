// Middleware de autenticação para proteger rotas restritas
// Por padrão, verifica se existe uma sessão de usuário (req.session.user)

export default function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }

  return res.status(401).json({ success: false, message: 'Não autorizado.' });
}
