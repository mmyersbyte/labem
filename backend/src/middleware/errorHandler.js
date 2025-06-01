export default function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`);
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
  });
}
