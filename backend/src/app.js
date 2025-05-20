import express from 'express';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import updatesRoutes from './routes/updates.js';
import encontrosRoutes from './routes/encontros.js';
import authAdminRoutes from './routes/authAdmin.js';

const app = express();

app.use('/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/updates', updatesRoutes);
app.use('/api/encontros', encontrosRoutes);
app.use('/api/admin', authAdminRoutes);

export default app;
