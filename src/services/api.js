import { CORE_PRODUCTS, LIMITED_EDITIONS } from '../data/catalog';

const NETWORK_DELAY = 600; // ms

export const api = {
    getCoreProducts: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(CORE_PRODUCTS);
            }, NETWORK_DELAY);
        });
    },

    getLimitedEditions: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(LIMITED_EDITIONS);
            }, NETWORK_DELAY);
        });
    },

    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const core = Object.values(CORE_PRODUCTS).find(p => p.id === id);
                const limited = LIMITED_EDITIONS.find(p => p.id === id);
                const product = core || limited;

                if (product) resolve(product);
                else reject(new Error('Product not found'));
            }, NETWORK_DELAY);
        });
    }
};
