import express from 'express'
import {PORT} from './config/config.js'
import productRoutes from './routes/products.routes.js'
import excelRoutes from './routes/excel.routes.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


// Middleware para leer JSON
app.use(express.json());


const uploadPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Rutas de productos y carga de Excel
app.use(productRoutes);
app.use(excelRoutes);

app.listen(PORT, () => {
    console.log('Servidor en el Puerto', PORT);
  });