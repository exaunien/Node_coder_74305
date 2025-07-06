let { productos } = require('./db');
let { carts } = require('./db');
const express = require('express');
const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());

//Metodos GET

app.get('/', (req, res) => {
    res.send('Servidor de Express');
});

app.get('/api/products', (req, res) => {
    res.status(200).json(productos);
});

app.get('/api/carts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = carts[id - 1];
    if (!carrito) {
        return res.status(404).json({ mensage: 'Carrito Inexistente' });
    }
    res.status(200).json(carrito.products);
});

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find((item) => item.id === id);
    if (!producto) {
        return res.status(404).json({ mensage: 'Producto no encontrado' });
    }
    res.json(producto);
});

//Metodos POST

app.post('/api/products', (req, res) => {
    const { title, image, description, price, code, status, stock, category } =
        req.body;
    const registro = {
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        title,
        image,
        description,
        price,
        code,
        status,
        stock,
        category,
    };
    productos.push(registro);
    res.status(201).json(registro);
});

app.post('/api/carts', (req, res) => {
    const { products } = req.body;
    const carrito = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products,
    };
    carts.push(carrito);
    res.status(201).json(carrito);
});

app.post('/api/carts/:id', (req, res) => {
    const pid = parseInt(req.params.id);
    const { id, quantity } = req.body;
    const registro = {
        id,
        quantity,
    };
    carts[pid - 1].products.push(registro);
    res.status(201).json(carts[pid - 1]);
});

//Metodos PUT

app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find((item) => item.id === id);
    if (!producto) {
        return res.status(404).json({ mensage: 'Producto no encontrado' });
    }
    const { title, image, description, price, code, status, stock, category } =
        req.body;
    if (title) producto.title = title;
    if (image) producto.image = image;
    if (description) producto.description = description;
    if (price) producto.price = price;
    if (code) producto.code = code;
    if (status) producto.status = status;
    if (stock) producto.stock = stock;
    if (category) producto.category = category;
    res.json(producto);
});

//Metodos DELETE

app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productos = productos.filter((item) => item.id !== id);
    res.status(204).send();
});

//Definicion del puerto donde se escucha el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
