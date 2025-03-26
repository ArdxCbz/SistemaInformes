import { Router } from 'express';
const router = Router();

router.get("/", (req, res) => res.render("index",{title:'Home'}));

router.get("/subir", (req, res) => res.render("subir"));

router.get("/informes", (req, res) => res.render("informes"));

export default router;
