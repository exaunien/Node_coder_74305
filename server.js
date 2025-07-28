import { createServer } from 'http';
import __dirname from './utils.js';
import homeRouter from './routes/home.router.js';
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { productos } from './db.js';
import { carts } from './db.js';
import { productsData } from './sockets/productsData.js';

const app = express();
const PORT = 8080;
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());

//Configuracion del motor de plantillas
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    })
);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//Configuracion de archivos estaticos
app.use(express.static(__dirname + '/public'));

//Rutas
app.use('/', homeRouter);
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Paginna no encontrada' });
});
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

//socket Backend

io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado vía WebSocket');

    socket.emit('productosActualizados', productsData.getProducts());

    socket.on('nuevoProducto', (producto) => {
        const nuevo = productsData.addProduct(producto);
        io.emit('productosActualizados', productsData.getProducts());
    });

    socket.on('eliminarProducto', (id) => {
        const eliminado = productsData.deleteProduct(id);
        if (eliminado) {
            io.emit('productosActualizados', productsData.getProducts());
        }
    });
});

//Definicion del puerto donde se escucha el servidor

httpServer.listen(PORT, () => {
    console.log(`Servidor y WebSocket corriendo en http://localhost:${PORT}`);
});
