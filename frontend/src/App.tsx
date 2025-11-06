import ChatPage from "./pages/Chat"
import EditProductPage from "./pages/EditSell"
import HomePage from "./pages/Home"
import OrdersPage from "./pages/ListOrder"
import LoginPage from "./pages/Login"
import MyProductsPage from "./pages/MyProducts"
import ProductsPage from "./pages/Products"
import ProfilePage from "./pages/Profile"
import RegisterPage from "./pages/Register"
import SellPage from "./pages/Sell"
import SingleProductPage from "./pages/SingleProduct"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage /> }/>
        <Route path='/products' element={<ProductsPage /> }/>
        <Route path='/singleProduct' element={<SingleProductPage />} />
        <Route path='/sell' element={<SellPage />} />
        <Route path='/editSell' element={<EditProductPage />} />
        <Route path='/myProduct' element={<MyProductsPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/orders' element={<OrdersPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
