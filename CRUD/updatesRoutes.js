// CRUD/updatesRoutes.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Importa a função authenticateToken que você exportou lá no final de authRoutes.js
const { authenticateToken } = require('../authRoutes');

// Cria um pool de conexão (mesmo connectionString que você já usa)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_akCQIUW4Aw6v@ep-royal-pine-a89zrpwb-pooler.eastus2.azure.neon.tech/contatos_db?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

/**
 * CREATE - Criar uma nova atualização
 * (POST /updates)
 * Protegido por JWT
 */
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const query = `
      INSERT INTO updates (title, description)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await pool.query(query, [title, description]);
    return res.status(201).json({ success: true, update: result.rows[0] });
  } catch (error) {
    console.error('Erro ao criar update:', error);
    return res.status(500).json({ success: false, error: 'Erro ao criar update' });
  }
});

/**
 * READ - Listar todas as atualizações
 * (GET /updates)
 * Se quiser proteger, adicione authenticateToken, mas geralmente GET é aberto
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM updates ORDER BY created_at DESC');
    return res.status(200).json({ success: true, updates: result.rows });
  } catch (error) {
    console.error('Erro ao listar updates:', error);
    return res.status(500).json({ success: false, error: 'Erro ao listar updates' });
  }
});

/**
 * READ - Obter detalhes de uma atualização específica
 * (GET /updates/:id)
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM updates WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Atualização não encontrada' });
    }
    return res.status(200).json({ success: true, update: result.rows[0] });
  } catch (error) {
    console.error('Erro ao buscar update:', error);
    return res.status(500).json({ success: false, error: 'Erro ao buscar update' });
  }
});

/**
 * UPDATE - Editar uma atualização
 * (PUT /updates/:id)
 * Protegido por JWT
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const query = `
      UPDATE updates
      SET title = $1, description = $2
      WHERE id = $3
      RETURNING *;
    `;
    const result = await pool.query(query, [title, description, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Atualização não encontrada' });
    }
    return res.status(200).json({ success: true, update: result.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar update:', error);
    return res.status(500).json({ success: false, error: 'Erro ao atualizar update' });
  }
});

/**
 * DELETE - Excluir uma atualização
 * (DELETE /updates/:id)
 * Protegido por JWT
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM updates WHERE id = $1 RETURNING *;', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Atualização não encontrada' });
    }
    return res.status(200).json({ success: true, message: 'Atualização removida' });
  } catch (error) {
    console.error('Erro ao deletar update:', error);
    return res.status(500).json({ success: false, error: 'Erro ao deletar update' });
  }
});

module.exports = router;
