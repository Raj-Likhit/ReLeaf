import { CORE_PRODUCTS, LIMITED_EDITIONS } from '../data/catalog';
import { Product } from '../types';

const NETWORK_DELAY = 600; // ms

interface CoreProducts {
    [key: string]: Product;
}

export const api = {
    getCoreProducts: (): Promise<CoreProducts> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(CORE_PRODUCTS as unknown as CoreProducts);
            }, NETWORK_DELAY);
        });
    },

    getLimitedEditions: (): Promise<Product[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(LIMITED_EDITIONS);
            }, NETWORK_DELAY);
        });
    },

    getProductById: (id: string | number): Promise<Product> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const core = Object.values(CORE_PRODUCTS).find((p: any) => p.id === id);
                const limited = LIMITED_EDITIONS.find((p: any) => p.id === id);
                const product = core || limited;

                if (product) resolve(product as Product);
                else reject(new Error('Product not found'));
            }, NETWORK_DELAY);
        });
    }
};
