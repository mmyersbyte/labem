import express from 'express';
import cors from 'cors';
import rootRoutes from './routes/root.routes.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import updatesRoutes from './routes/updates.routes.js';
import encontrosRoutes from './routes/encontros.routes.js';
import authAdminRoutes from './routes/authAdmin.routes.js';
import swagger from './routes/swagger.routes.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [/^https:\/\/(www\.)?labemunisul\.com\.br$/];
      if (!origin || allowedOrigins.some((regex) => regex.test(origin))) {
        return callback(null, true);
      }
      return callback(new Error('Não permitido pelo CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/updates', updatesRoutes);
app.use('/api/encontros', encontrosRoutes);
app.use('/api/admin', authAdminRoutes);
app.use(swagger);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
