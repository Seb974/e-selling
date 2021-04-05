import React, { useState, useContext } from 'react';
import Field from '../forms/Field';
// import CartContext from '../contexts/CartContext';
// import ProductsContext from '../contexts/ProductsContext';
// import CartActions from '../services/CartActions';

const ProductCard = (props) => {

    // const { setCart } = useContext(CartContext);
    // const { products } = useContext(ProductsContext);
    const [quantity, setQuantity] = useState("");
    const [errors, setErrors] = useState({quantity: ""});

    const handleChange = ({ currentTarget }) => {
        setQuantity(currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (quantity.length > 0) {
            // setCart(CartActions.add(props.details, quantity, products));
            setQuantity("");
        }
    }

    return (
        <div className="col-lg-4">
            <div className="card mb-5 "> 
                { props.product.picture ? 
                    <img src={ process.env.APP_IMAGES_FOLDER + props.product.illustration.filePath } className="d-block user-select-none card-picture" alt={ props.product.name } title={ props.product.name } /> :     // card-img-top product-card-img
                    <svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none card-picture" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style={{fontSize: 1.125 + 'rem', textAnchor: 'middle'}}>
                        <rect width="100%" height="100%" fill="#868e96"></rect>
                        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">{ props.product.name }</text>
                    </svg>
                }
                <div className="card-body card-product-name">
                    <h4>{ props.product.name }</h4>
                </div>
                <ul className="list-group list-group-flush card-price-list">
                    <li className="list-group-item"><i className="fas fa-utensils mr-2"></i>999.99 €</li>
                    {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <hr className="ml-5 mr-5"/>
                <div className="card-body action-panel">
                    <form onSubmit={ handleSubmit } className="product-form">
                        <div className="row qty-container">
                            <div className="col-md-6 qty-component-input">
                                <Field
                                    className="card-field mr-10"
                                    name={ props.product.id }
                                    type="number"
                                    label="Quantité"
                                    value={ quantity }
                                    onChange={ handleChange }
                                    placeholder=" "
                                    error={ errors.quantity }
                                />
                            </div>
                            <div className="col-md-6 qty-component-button">
                                <button type="submit" className="btn btn-success ml-auto card-button" disabled={quantity.length === 0}><i className="fas fa-cart-plus mr-2"></i>Ajouter</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    <i className="fas fa-utensils mr-2"></i> Category Name
                    {/* <i className="fas fa-utensils mr-2"></i> { props.details.category.name } */}
                </div>
            </div>
        </div>
    );
}
 
export default ProductCard;