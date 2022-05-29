import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

// Components
//HOME
import Navigation from './components/navigation/nav';

//KAVISHA
// import Navbar from "./components/shopping-cart/Navbar";
import SideDrawer from "./components/shopping-cart/SideDrawer";
import Backdrop from "./components/shopping-cart/Backdrop";
import Footer from './components/footer/footer';
import Header from './components/header/header';

//DULAJ
import orderdetails from './components/orderDetails/orderdetails'
import checkout from './components/checkout/checkout'
import placed from './components/placed/placed'
import admin from './components/admin/details'
import visa from './components/admin/visa'
import editdetails from './components/admin/editdetails'

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Header/>
      <Navigation/>
      {/* <Navbar click={() => setSideToggle(true)}/> */}
      <SideDrawer show={sideToggle}/>
      <Backdrop show={sideToggle} click={() => setSideToggle(false)}/>
      <main>
        <Switch>
          {/* KAVISHA */}
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/search/:keyword" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />

          {/* DULAJ - CLIENT */}
          <Route exact path="/orderdetails" component={orderdetails} />
          <Route exact path="/checkout" component={checkout} />
          <Route exact path="/placed" component={placed} />
          {/* DULAJ - ADMIN */}
          <Route exact path="/admin/details" component={admin} />
          <Route exact path="/admin/visa" component={visa} />
          <Route exact path="/admin/editdetails/:id" component={editdetails} />

        </Switch>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
