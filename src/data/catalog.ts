export const CORE_PRODUCTS = {
    forest: {
        id: 'p_forest',
        name: 'Deep Forest',
        image: '/case-forest.png',
        bg: '#0f241d',
        price: 49.00,
        type: 'core',
        description: 'Deep green hues inspired by the untouched Nordic wilderness.'
    },
    midnight: {
        id: 'p_midnight',
        name: 'Midnight Black',
        image: '/case-midnight.png',
        bg: '#0f172a',
        price: 49.00,
        type: 'core',
        description: 'The void of space, captured in a zero-waste chassis.'
    },
    sand: {
        id: 'p_sand',
        name: 'Dune Sand',
        image: '/case-sand.png',
        bg: '#e8e4d9',
        price: 49.00,
        type: 'core',
        darkText: true,
        description: 'Warm, neutral tones reflecting the timeless desert landscape.'
    }
};

export const LIMITED_EDITIONS = [
    {
        id: 'le_alpine',
        name: "Alpine Mist",
        price: 54.00,
        colorName: "alpine",
        image: "/alpine-mist.png",
        bg: "bg-[#2f3e3b]",
        type: 'limited',
        tag: 'New'
    },
    {
        id: 'le_sahara',
        name: "Sahara Stealth",
        price: 54.00,
        colorName: "sahara",
        image: "/sahara-stealth.png",
        bg: "bg-[#4a4238]",
        type: 'limited',
        tag: 'Low Stock'
    },
    {
        id: 'le_carbon',
        name: "Carbon Zero",
        price: 59.00,
        colorName: "carbon",
        image: "/carbon-zero.png",
        bg: "bg-[#1a1a1a]",
        type: 'limited',
        tag: 'Best Seller'
    }
];
