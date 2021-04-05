import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/HomePage/ProductCard';
import ProductsContext from '../contexts/ProductsContext';

const Homepage = (props) => {

    const { products, navSearch } = useContext(ProductsContext);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const filteredProducts = displayedProducts.filter(product => (product.name.toUpperCase()).includes(navSearch.toUpperCase()) )

    useEffect(() => {
        setDisplayedProducts(products);
    }, [products]);

    return (
        <div className="row pt-3">
            { filteredProducts.length === 0 ? <p className="ml-3">Aucun produit à afficher.</p> : 
                filteredProducts.map(product => <ProductCard key={product.id} product={product}/>) }
        </div>
    );
}
 
export default Homepage;