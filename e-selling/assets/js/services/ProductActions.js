import axios from 'axios';

function findAll() {
    return axios
        .get('/api/products')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.name > b.name) ? 1 : -1));
}

function deleteProduct(id) {
    return axios
        .delete('/api/products/' + id);
}

function find(id) {
    return axios.get('/api/products/' + id)
                .then(response => response.data);
}

// function update(id, product, suppliers) {
function update(id, product) {
    return axios.put('/api/products/' + id,
                    {...product,
                        // category: `/api/categories/${ product.category }`,
                        // suppliers: suppliers.map(supplier => `/api/suppliers/${ supplier.id }`),
                        // unit: `/api/units/${ product.unit }`,
                        // userCategories: product.userCategories.map(userCategory => userCategory.value)
                    });
}

// function create(product, suppliers) {
function create(product) {
    return axios.post('/api/products', 
                    {...product, 
                        // category: `/api/categories/${ product.category }`, 
                        // suppliers: suppliers.map(supplier => `/api/suppliers/${ supplier.id }`),
                        // unit: `/api/units/${ product.unit }`,
                        // userCategories: product.userCategories.map(userCategory => userCategory.value),
                        // picture: null
                    });
}

function updateFromMercure(products, product) {
    const filteredProducts = products.filter(item => item.id !== product.id);
    return [...filteredProducts, product].sort((a, b) => (a.name > b.name) ? 1 : -1);

}

function deleteFromMercure(products, id) {
    return products.filter(item => parseInt(item.id) !== parseInt(id));
}

// function setAxiosToken() {
//     axios.defaults.headers['Authorization'] = "Bearer " + process.env.MERCURE_JWT_TOKEN;
//     axios.defaults.headers['Content-Type'] = "application/json";
// }

export default { 
    findAll,
    delete: deleteProduct,
    find, 
    update, 
    create,
    updateFromMercure,
    deleteFromMercure,
}