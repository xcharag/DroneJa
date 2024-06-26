import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/HomePage.jsx";
import ShopPage from "./pages/shop/ShopPage.jsx";
import DefaultLayOut from "./components/DefaultLayOut.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import AccountPage from "./pages/Account/AccountPage.jsx";
import SignUpPage from "./pages/signup/SignUpPage.jsx";
import AdminLayOut from "./components/AdminLayOut.jsx";
import AdministracionPage from "./pages/Administracion/AdministracionPage.jsx";
import ClientsPage from "./pages/clients/ClientsPage.jsx";
import StockPage from "./pages/DroneStock/StockPage.jsx";
import OrderPage from "./pages/Orders/OrdersPage.jsx";
import { ApolloProvider } from "@apollo/client";
import { createApolloContext } from "./utility/ApolloClient.js";

function App() {
    const apolloClient = createApolloContext();

  return (
      <ApolloProvider client={apolloClient}>
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <DefaultLayOut children={<HomePage />} />
                    }
                />
                <Route
                    path="/Productos"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <DefaultLayOut children={<ShopPage />} />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <DefaultLayOut children={<CartPage />} />
                    }
                />
                <Route
                    path="/account"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <DefaultLayOut children={<AccountPage />} />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <DefaultLayOut children={<SignUpPage />} />
                    }
                />
                <Route
                    path="/Administracion"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <AdminLayOut children={<AdministracionPage />} />
                    }
                />
                <Route
                    path="/Clientes"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <AdminLayOut children={<ClientsPage />} />
                    }
                />
                <Route
                    path="/Stock"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <AdminLayOut children={<StockPage />} />
                    }
                />
                <Route
                    path="/order"
                    element={
                        // eslint-disable-next-line react/no-children-prop
                        <AdminLayOut children={<OrderPage />} />
                    }
                />
            </Routes>
        </Router>
      </ApolloProvider>
  )
}

export default App
