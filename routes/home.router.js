import { Router } from 'express';
import { productsData } from '../sockets/productsData.js';
const router = Router();

router.get('/', (req, res) => {
    const productos = productsData.getProducts();
    res.render('home', {
        title: 'Home - Guitar LA',
        productos,
    });
});
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        title: 'Vista en Tiempo Real',
    });
});

export default router;
