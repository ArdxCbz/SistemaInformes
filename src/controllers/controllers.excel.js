import { leerExcelYValidar } from '../services/excel.service.js';
import { pool } from '../config/db.js';
import fs from 'fs';

export const subirExcel = async (req, res) => {
  const archivo = req.file;

  if (!archivo) {
    return res.status(400).json({ error: 'No se envió ningún archivo' });
  }

  try {
    const productos = await leerExcelYValidar(archivo.path);

    for (const producto of productos) {
      await pool.query(
        'INSERT INTO productos (nombre, grupo, precio, costo, profit) VALUES ($1, $2, $3, $4, $5)',
        [producto.nombre, producto.grupo, producto.precio, producto.costo, producto.profit]
      );
    }

    fs.unlinkSync(archivo.path); // Borra el archivo temporal
    res.json({ mensaje: 'Productos importados correctamente', cantidad: productos.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el archivo Excel' });
  }
};
