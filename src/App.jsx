import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/HomePage.jsx";
import ShopPage from "./pages/shop/ShopPage.jsx";
import DefaultLayOut from "./components/DefaultLayOut.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import AccountPage from "./pages/Account/AccountPage.jsx";
import SignUpPage from "./pages/signup/SignUpPage.jsx";
function App() {


  return (
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
                path="/shop"
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
        </Routes>
    </Router>
  )
}

export default App
