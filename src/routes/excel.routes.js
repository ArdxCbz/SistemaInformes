import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { subirExcel } from '../controllers/controllers.excel.js';

const router = Router();

// Configuración de multer para guardar archivos temporalmente en /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombreArchivo = 'excel-' + Date.now() + ext;
    cb(null, nombreArchivo);
  }
});

const upload = multer({ storage });

router.post('/upload-excel', upload.single('archivo'), subirExcel);

router.get('/cargar-excel', (req, res) => {
    res.render('cargar_excel');
  });
  
export default router;
