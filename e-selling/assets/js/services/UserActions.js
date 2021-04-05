import axios from 'axios';

function register(user) {
    const { name, email, password } = user;
    return axios.post("/api/users", { name, email, password });
}

function findAll() {
    return axios
        .get('/api/users')
        .then(response => response.data['hydra:member']);
}

function deleteUser(id) {
    return axios
        .delete('/api/users/' + id);
}

function find(id) {
    return axios.get('/api/users/' + id)
                .then(response => response.data);
}

function update(id, user) {
    return axios.put('/api/users/' + id, user);
}

function create(user) {
    return axios.post('/api/users', user);
}

export default {
    register,
    findAll,
    delete: deleteUser,
    find, 
    update, 
    create
}