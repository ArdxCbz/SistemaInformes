import {Router} from 'express'
import {pool} from '../config/db.js'
const router =  Router()

router.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const { rows } = await pool.query("SELECT * FROM productos LIMIT $1 OFFSET $2", [limit, offset]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});


router.get('/products/:id', async (req, res) => {
    const { id } = req.params

    const { rows } = await pool.query('SELECT * FROM productos WHERE id=$1', [id]);

    if (rows.length === 0){
        return res.status(404).json({ message: "Producto no Encontrado"})
    }
})

router.post('/products', async (req, res) => {
    const data = req.body;
    if (!data || !data.nombre || !data.grupo || !data.precio || !data.costo || !data.profit) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    try {
        const { rows } = await pool.query(
            "INSERT INTO productos (nombre, grupo, precio, costo, profit) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [data.nombre, data.grupo, data.precio, data.costo, data.profit]
        );
        return res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al guardar el producto' });
    }
});
export default router