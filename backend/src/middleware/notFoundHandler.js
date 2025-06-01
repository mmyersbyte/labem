export default function notFound(req, res, next) {
  res.status(404).json({
    error: 'Rota não encontrada',
    method: req.method,
    path: req.originalUrl,
  });
}
