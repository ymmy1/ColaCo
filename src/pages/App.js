import React, { useEffect, useState } from 'react'
import axios from 'axios';

import '../styles/App.css';

import ShopPage from "../components/ShopPage";
import AdminPage from "../components/AdminPage";

function App() {
  const [step, setStep] = useState("home")
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [cash, setCash] = useState(0);
  const [total, setTotal] = useState(0);

  const switchStep = clickedPage => {
    setStep(clickedPage)
  }


  const url = 'http://localhost:8000/soda'

  useEffect(() => {
    getAllSoda();
  }, [])

  const getAllSoda = () => {
    axios.get(url)
      .then((res) => {
        setItems(res.data)
      })
      .catch(error => console.log(`Error: ${error}`));
  }

  // Functions for Admin Page
  const handleCostUpdate = (e) => {
    e.preventDefault()
    if (parseFloat(e.target[0].value).toFixed(2) !== 'NaN') {
      let updatedSoda = items[e.target[0].dataset.sodaindex]
      updatedSoda.Cost = parseFloat(e.target[0].value).toFixed(2)

      axios.put(`${url}/${e.target[0].dataset.sodaid}`, updatedSoda)
        .then(res => {
          getAllSoda()
        });
      e.target[0].value = updatedSoda.Cost
    }
  }
  const handleRestockUpdate = (e) => {
    e.preventDefault()
    if (parseFloat(e.target[0].value).toFixed(2) !== 'NaN') {
      let updatedSoda = items[e.target[0].dataset.sodaindex]
      updatedSoda.Available_qty = parseFloat(updatedSoda.Available_qty) + parseFloat(e.target[0].value)

      axios.put(`${url}/${e.target[0].dataset.sodaid}`, updatedSoda)
        .then(res => {
          getAllSoda()
        });
      e.target[0].value = 0
    }
  }
  // Functions for Admin End

  // Functions for Customer Page
  const handleSelect = e => {
    const audioEl = document.getElementById("audio-element")
    audioEl.load()
    audioEl.play()

    let isSodaFound = false
    let isExceeding = false

    let max_qty = items[e].Max_vend_qty
    if (max_qty > items[e].Available_qty) {
      max_qty = items[e].Available_qty
    }
    if (max_qty === 0) {
      isExceeding = true
    }

    let selection = {
      "Name": items[e].Name,
      "Cost": items[e].Cost,
      "Src": items[e].Src,
      "Qty": 1
    }
    if (!isExceeding) {
      if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].Name === selection.Name) {
            isSodaFound = true
            if (max_qty > cart[i].Qty) {
              cart[i].Qty++
            }
            else isExceeding = true
          }
        }
        if (!isSodaFound) cart.unshift(selection)
      }
      else cart.unshift(selection)
      if (!isExceeding) {
        setTotal(parseFloat(total) + parseFloat(selection.Cost))
        setCart(cart)
      }
      else alert("Exceeding the Maximum number of purchases for " + selection.Name)
    }
    else alert("Exceeding the Maximum number of purchases for " + selection.Name)
  }

  const deposit = () => {
    const audioCn = document.getElementById("coinAudio-element")
    audioCn.load()
    audioCn.play()
    setCash(parseFloat(cash) + parseFloat(5.00))
  }

  const buy = () => {
    if (parseFloat(total) > parseFloat(cash)) {
      alert("Deposit more Cash")
    }
    else {
      const audioCo = document.getElementById("completeAudio-element")
      audioCo.load()
      audioCo.play()

      const fileName = "receipt";
      const json = JSON.stringify(cart);
      const blob = new Blob([json], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (cart[i].Name === items[j].Name) {
            const soda = {

              Name: items[j].Name,
              Description: items[j].Description,
              Cost: items[j].Cost,
              Max_vend_qty: items[j].Max_vend_qty,

              Available_qty: parseInt(items[j].Available_qty) - parseInt(cart[i].Qty),

              Src: items[j].Src,
              Bg: items[j].Bg
            }

            axios.put(`http://localhost:8000/soda/${items[j].id}`, soda)
              .then(res => {
                getAllSoda()
              });
          }
        }
      }

      setCash(parseFloat(cash) - parseFloat(total))
      setTotal(0)
      setCart([])
    }
  }


  switch (step) {
    case "customer":
      return (
        <div className="App">
          <ShopPage
            switchStep={switchStep}
            handleSelect={handleSelect}
            buy={buy}
            deposit={deposit}
            items={items}
            cash={cash}
            total={total}
            cart={cart}
          />
        </div>
      );
    case "admin":
      return (
        <div className="App">
          <AdminPage
            switchStep={switchStep}
            items={items}
            handleCostUpdate={handleCostUpdate}
            handleRestockUpdate={handleRestockUpdate}
          />
        </div>
      );
    default:
      return (
        <div className="App">
          <header>
            <h1>CocaCo</h1>
            <h3>Vending Machines</h3>
            <h5>Log in</h5>
            <div className="login">
              <div className="button" onClick={() => switchStep('admin')}>
                Admin
              </div>
              <div className="button" onClick={() => switchStep('customer')}>
                Customer
              </div>
            </div>
          </header>
        </div>
      );
  }
}

export default App