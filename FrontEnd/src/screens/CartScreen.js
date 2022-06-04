import "./CartScreen.css";
import "../Images/logo.jpg"
import jspdf from 'jspdf';
import "jspdf-autotable";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import CartItem from "../components/shopping-cart/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

toast.configure()

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Remove Item From Your Cart',{position:toast.POSITION.TOP_RIGHT, autoClose: 2000})
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((productPrice, item) => productPrice + item.productPrice * item.qty, 0)
      .toFixed(2);
  };

  // genarate pdf
  const generatePDF = tickets => {

    const doc = new jspdf(); 
    var imgData = "https://upload.wikimedia.org/wikipedia/commons/2/25/Citymedicalslogo.png";   
    const tableColumn = ["Name", "Quantity", "Per Item Price"];   
    const tableRows = [];        
    const date = Date().split(" ");        
    const dateStr = date[1] + " " + date[2] + ", " + date[3];
    const total = getCartSubTotal();


    tickets.map(ticket => {

      const ticketData = [
          
          ticket.productName,     
          ticket.qty,
          ticket.productPrice,
          ticket.total    

      ];  
      tableRows.push(ticketData);  
    })

    tickets.map(ticket => {

      const total = [ 

          ticket.total,     

      ];
      tableRows.push(total);
    })

    doc.addImage(imgData, 'JPEG', 77, 11, 60, 40);
    doc.text("Cart Item List", 14, 75).setFontSize(12);
    doc.text(`Report Generated Date - ${dateStr}`, 14, 80).setFontSize(13);
    doc.text(`Total Amount - ${total}`, 14, 89).setFontSize(10);
    doc.text("© 2022 Copyright @CityMedicals", 79, 278).setFontSize(10);
    doc.text("All Right Reserved", 90, 284).setFontSize(10);
    doc.text("citymedicals@gmail.com | www.citymedicals.netlify.app | +94119 119 119", 47, 290);
    // right down width height

    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 9, }, startY:97});
    doc.save("Cart Report.pdf");

    toast.success('Your Cart Print 🗎 Generated Sucessfully',{position:toast.POSITION.TOP_RIGHT, autoClose: 2000})

  };

  //clear local storage
  const clearLocalStorage = () =>{
    localStorage.removeItem('cart')
    localStorage.removeItem('Authorization')
    toast.success('Local Storage Clearing Completed',{position:toast.POSITION.TOP_RIGHT, autoClose: 2000})
    // window.location = "/login"
  }

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>My Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Sub Total ({getCartCount()}):   Rs.{getCartSubTotal()}</p>
            <p style={{ fontSize: 15, color: '#ff8605' }}>Discount:  Rs.0.00</p>
            <br/>
            <p style={{ fontSize: 22, color: '#00da7e', fontWeight:"bold" }}>Total Price:  Rs.{getCartSubTotal()}</p>
          </div>
          <div>
            <Link to="/orderdetails">
              <button className="button1" disabled={cartItems.length === 0} onClick={() => clearLocalStorage()}>Checkout&nbsp;<i className="fa-solid fa-credit-card fa-lg"></i></button>
            </Link>
          </div>
          {/* pdf generate */}
          <div>
            <button className="button2" type="button" disabled={cartItems.length === 0} onClick={() => generatePDF(cartItems)}>Cart To Print&nbsp;<i className="fa-solid fa-print fa-lg"></i></button>
          </div>
        </div>
        <ToastContainer autoClose={2000}/>
      </div>
    </>
  );
};

export default CartScreen;
