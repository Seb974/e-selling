import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/layout/Pagination';
import SearchBar from '../../components/layout/SearchBar';
import ProductsContext from '../../contexts/ProductsContext';
import ProductActions from '../../services/ProductActions';

const ProductsPage = (props) => {

    const { products } = useContext(ProductsContext);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const itemsPerPage = 15;
    const filteredProducts = displayedProducts.filter(product => (product.name.toUpperCase()).includes(search.toUpperCase()))
    const paginatedProducts = Pagination.getData(filteredProducts, currentPage, itemsPerPage);

    useEffect(() => {
        ProductActions.findAll()
                .then(response => setDisplayedProducts(response))
                .catch(error => console.log(error.response));
    }, []);

    useEffect(() => {
        setDisplayedProducts(products);
    }, [products]);

    const handleDelete = (id) => {
        const originalProducts = [...displayedProducts];
        setDisplayedProducts(displayedProducts.filter(product => product.id !== id));
        ProductActions.delete(id)
                       .catch(error => {
                            setDisplayedProducts(originalProducts);
                            console.log(error.response);
                       });
    }

    const handlePageChange = page => setCurrentPage(page);

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des produits</h1>
                <Link to="/products/new" className="btn btn-success">Créer un produit</Link>
            </div>

            <SearchBar value={ search } onSearch={ handleSearch } />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nom</th>
                        {/* <th>Catégorie</th> */}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedProducts.length === 0 ? <tr><td colSpan="3">Aucune donnée à afficher.</td></tr> : paginatedProducts.map(product => {
                         return (
                            <tr key={ product.id }>
                                <td><Link to={"/products/" + product.id}>{ product.name }</Link></td>
                                {/* <td>{ product.category.name }</td> */}
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>Supprimer</button>
                                </td>
                            </tr>
                         );
                    }) }
                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredProducts.length}/>
        </>
    );
}
 
export default ProductsPage;