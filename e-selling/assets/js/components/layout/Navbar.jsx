import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import ProductsContext from '../../contexts/ProductsContext';
import Identification from '../../pages/Identification/Identification';
import AuthActions from '../../services/AuthActions';
import Roles from '../../config/Roles';

const Navbar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } = useContext(AuthContext);
    // const { cart } = useContext(CartContext);
    const { navSearch, setNavSearch } = useContext(ProductsContext);

    const handleChange = ({ currentTarget }) => {
        setNavSearch(currentTarget.value);
    }

    const onErase = e => {
        e.preventDefault();
        setNavSearch('');
    }

    const handleLogout = () => {
        AuthActions.logout()
                   .then(response => {
                       setIsAuthenticated(false);
                       setCurrentUser(AuthActions.getCurrentUser());
                       history.push("/");
                   });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#"> Frais Péi
                {/* <picture>
                    <source className="header-logo" media="(max-width: 414px)" srcSet="uploads/logo/cap_mechant.png" height="50px"/>
                    <source className="header-logo" media="(min-width: 415px)" srcSet="uploads/logo/cap_mechant.png" height="50px"/>
                    <img className="header-logo" src="uploads/logo/cap_mechant.png" alt="Logo Cap Méchant" height="50px" />
                </picture> */}
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
            { !isAuthenticated ? 
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"> 
                        <Identification />
                        {/* <a className="nav-link" href="#" onClick={ handleLogout }>onnexion</a> */}
                    </li>
                </ul>
              :
                <>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={ handleLogout }>Déconnexion</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Menu</a>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/profile">Mes coordonnées</Link>
                                {/* <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/orders">Mes commandes</Link>
                                <div className="dropdown-divider"></div> */}

                                { Roles.hasPrivileges(currentUser) &&
                                    <>
                                        {/* <Link className="dropdown-item" to="/categories">Catégories</Link>
                                        <div className="dropdown-divider"></div> */}
                                        {/* <Link className="dropdown-item" to="/units">Unités</Link>  */}
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="https://admin.clikeat.fr">Accès Admin.</a>
                                        {/* <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="/suppliers">Fournisseurs</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="/users">Utilisateurs</Link> */}
                                    </>
                                }

                            </div>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/cart" >
                                <span className="mr-1">Mon panier</span>
                                { cart.length === 0 ? "" : <span className="badge badge-pill badge-success cart-counter">{ cart.length }</span>}
                            </Link>
                        </li> */}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2 nav-search" type="text" placeholder="Search" value={ navSearch } onChange={ handleChange }/>
                        <a href="#" ><i className="far fa-times-circle mr-2" hidden={ navSearch.length === 0 } onClick={ onErase }></i></a>
                    </form>
                </>
             }
            </div>
        </nav>
    )
}
 
export default Navbar;