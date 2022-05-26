import React, { useState } from 'react';
import SvgComponent from "./SvgComponent";
import axios from "axios";
import Cleave from 'cleave.js/react';


import './checkout.css';
function App() {

  const [name, setName] = useState();
  const [cardNumber, setCardnumber] = useState('#### #### #### ####');
  const [cvvNumber, setCvvNumber] = useState();
  const [expDate, setExpDate] = useState();


  function sendData(e) {
    e.preventDefault();

    const newVisa = {

      name,
      cardNumber,
      cvvNumber,
      expDate

    }

    //  console.log(newVisa);
    console.log(newVisa, "data data");
    axios.post('http://localhost:5000/visa/add', newVisa).then(res => {
      alert("Visa Card Checked 💯");

      console.log(newVisa, "data");
      window.location = "/placed"

      //test

    }).catch((err) => {
      console.log(err);
    })

  }

  return (
    <div>

      <div className="App mb-5 mt-5 mh-80">

        <div className="grid-container">

          <div className="grid-child purple">
            <div className="svg d-flex justify-content-center">
              <SvgComponent
                height={500}
                width={500}
              />
            </div>
          </div>

          <div className="grid-child green text-left">
            <div className="mb-3 purple">

              {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" /> */}


              <div className="hrdivider mr-3">

                <span>Payment Gateway</span>
                <br />
              </div>

              <form onSubmit={sendData}>
                Name<br />
                <input id="name" label="Name" className="form-control form-control-lg" variant="outlined" placeholder="Juliana Anderson" value={name} onChange={e => setName(e.target.value)} multiline style={{ width: '80%' }} /><br />
                Card Number<br />


                {/* <input id="cardNumber" 
                className="form-control form-control-lg" 
                  label="Card Number" variant="outlined"
                  placeholder="112 3265 2345 6854"
                  onChange={e => setCardnumber(e.target.value)}
                  style={{ width: '80%' }} /> */}

                <div className="input-container mt">
                  <Cleave
                    
                    options={{
                      delimiter: "-",
                      creditCard: true,
                      
                    }}
                    onChange={e => setCardnumber(e.target.value)}
                    className="form-control form-control-lg"
                    variant="outlined"
                    style={{ width: '80%' }}
                    placeholder="1234-1234-1234-1234"
                  />
                </div>

                <br />
                CVV Number<br />
                <input className="form-control form-control-lg" id="cvvNumber" label="CVV number" maxLength={3} onChange={e => setCvvNumber(e.target.value)} variant="outlined" placeholder="112" multiline style={{ width: '80%' }} /><br />
                Expiry Date<br />
                <input type="month" id="expDate" className="form-control form-control-lg" label="Expiry Date" onChange={e => setExpDate(e.target.value)} variant="outlined" style={{ width: '80%' }} /><br />
                <button type="submit" className="btn btn-primary">SUBMIT</button>
              </form>
          

          </div>
          </div>
        </div>

      </div>

    </div>

  );
}

export default App;

