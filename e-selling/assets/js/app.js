import '../css/app.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import AdminRoute from './components/layout/route/AdminRoute';
import PrivateRoute from './components/layout/route/PrivateRoute';
import Homepage from './pages/Homepage';
import Navbar from './components/layout/Navbar';
import ProductActions from './services/ProductActions';
import ProductsContext from './contexts/ProductsContext';
import Footer from './components/layout/Footer';
import ProductsPage from './pages/Product/ProductsPage';
import ProductPage from './pages/Product/ProductPage';
import MercureHub from './components/Mercure/MercureHub';
import AuthActions from './services/AuthActions';
import AuthContext from './contexts/AuthContext';
import UsersPage from './pages/User/UsersPage';
import ProfilePage from './pages/User/ProfilePage';
import UserPage from './pages/User/UserPage';

const App = () => {

    const [products, setProducts] = useState([]);
    const [navSearch, setNavSearch] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
    const [eventSource, setEventSource] = useState({});

    useEffect(() => {
        AuthActions.setErrorHandler(setCurrentUser, setIsAuthenticated);
        ProductActions.findAll()
                      .then(data => {
                          setProducts(data);
                        //   setCart(CartActions.get(data).map(item => { return {...item, stock: 0}}));
                      })
                      .catch(error => console.log(error.response));
    }, []);

    useEffect(() => {
        setCurrentUser(AuthActions.getCurrentUser());
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser, eventSource, setEventSource} }>
        <ProductsContext.Provider value={ {products, setProducts, navSearch, setNavSearch} }>
            <MercureHub>
                <HashRouter>
                    <Navbar />
                    <main className="container pt-5">
                        <Switch>
                            <AdminRoute path="/products/:id" component={ ProductPage } />
                            <AdminRoute path="/products" component={ ProductsPage } />
                            <AdminRoute path="/users/:id" component={ UserPage } />
                            <AdminRoute path="/users" component={ UsersPage } />
                            <PrivateRoute path="/profile" component={ ProfilePage } />
                            <Route path="/" component={ Homepage } />
                        </Switch>
                    </main>
                    <Footer />
                </HashRouter>
            </MercureHub>
        </ProductsContext.Provider>
        </AuthContext.Provider>
    );
}
 
const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);