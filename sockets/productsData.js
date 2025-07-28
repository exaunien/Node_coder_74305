import { productos } from '../db.js';

export const productsData = {
    getProducts: () => productos,

    addProduct: (product) => {
        const nextId = productos.length
            ? productos[productos.length - 1].id + 1
            : 1;
        const nuevo = { id: nextId, ...product };
        productos.push(nuevo);
        return nuevo;
    },

    deleteProduct: (id) => {
        const index = productos.findIndex((p) => p.id === id);
        if (index !== -1) {
            productos.splice(index, 1);
            return true;
        }
        return false;
    },
};
