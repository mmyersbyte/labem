import express from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import {
  criarEncontro,
  deletarEncontro,
  listarEncontros,
  baixarSlide,
  baixarMaterial,
  patchEncontro,
} from '../controllers/encontros.Controller.js';
import { validateBody } from '../middleware/validate.js';
import { encontroSchema } from '../validators/encontroValidator.js';

const router = express.Router();

// Configuração do multer para armazenar arquivos em memória
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
const handleUpload = upload.fields([
  { name: 'slideTeorico', maxCount: 1 },
  { name: 'materialApoio', maxCount: 1 },
]);
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message:
          'O arquivo PDF é muito grande! Por favor, comprima o PDF em ilovepdf.com antes de enviar (limite de 5MB por arquivo).',
      });
    }
    return res.status(400).json({
      success: false,
      message: `Erro no upload: ${err.message}`,
    });
  }
  next(err);
};

// POST /api/encontros (protegido)
router.post(
  '/',
  authenticateJWT,
  authorizeAdmin,
  validateBody(encontroSchema),
  handleUpload,
  handleMulterErrors,
  criarEncontro
);
// DELETE /api/encontros/:id (protegido)
router.delete('/:id', authenticateJWT, authorizeAdmin, deletarEncontro);
// GET /api/encontros
router.get('/', listarEncontros);
// GET /api/encontros/:id/slide
router.get('/:id/slide', baixarSlide);
// GET /api/encontros/:id/material
router.get('/:id/material', baixarMaterial);
// PATCH /api/encontros/:id (protegido)
router.patch(
  '/:id',
  authenticateJWT,
  authorizeAdmin,
  handleUpload,
  handleMulterErrors,
  patchEncontro
);
export default router;
