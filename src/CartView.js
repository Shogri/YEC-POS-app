import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './App.css';

class CartView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: this.props.state.paymentMethods[0],
    }
  }
  onChange() {
    this.props.onChange('Main');
  }

  createCart(item, index) {
    index += 1;

    return (
      <div class="outerContainer2">
        <div class="internal2">
          <div class="spacer">
            {item.name}
          </div>
          <div class="spacer2">
            {`$${item.price}`}
          </div>
          <span class="close" onClick={this.removeFromCart.bind(this, item, index)}>&times;</span>
        </div>
      </div>
    );
  }

  removeFromCart(item, index) {
    this.props.addedItems.splice(index, 1);
  this.forceUpdate();
  }

  createPaymentMethod (type) {
  return (
    <option id={type} value={type}>{type}</option>
  );
}

  changeSelection() {
    const type = document.getElementById('mySelect').value;
    this.setState({ paymentMethod: type });
  }

  getPayPanel() {
    let i = 0;
    for (i = 0; i < this.props.state.paymentMethods.length; i++) {
        if (this.state.paymentMethod === this.props.state.paymentMethods[i]) {

          const fields = this.props.state.paymentInfo[i].split(",");
          const content = fields.map((field) => {
            const fieldLine = field.indexOf('Password') === -1 ?
              (
                <div class="textLine">
                <label for={field} class="label"><b>{`${field}:`}</b></label>
                <input id={field} class="inputPayInfo" type="text" placeholder={`Enter ${field}`} name={field} required/>
                </div>
              ) :
              (
                <div class="textLine">
                <label for={field} class="label"><b>{`${field}:`}</b></label>
                <input id={field} class="inputPayInfo" type="password" placeholder={`Enter ${field}`} name={field} required/>
                </div>
              );
              return fieldLine;
          });
            return content;
        }
    }
    return null;
  }

  render() {
    let index = -1;
    const cartItems =  this.props.addedItems.map((objects) => this.createCart(objects, index));
    let price = 0;
    for (let x = 0; x < this.props.addedItems.length; x++) {
      price += this.props.addedItems[x].price;
    }
    const paymentMethods = this.props.state.paymentMethods.map((type) => this.createPaymentMethod(type));
    const payPanel = this.getPayPanel();

    return (
      <div class="container">
      <div>
        <div>
          <div class="outerContainer2">
          <div style={{ backgroundColor: this.props.state.secondaryColor }} class="checkoutView">

            <h4> Select Payment Method </h4>

            <select id="mySelect" style={{ backgroundColor: this.props.state.accentColor }} onClick={this.changeSelection.bind(this)}>
            {paymentMethods}
          </select>
            {payPanel}
          </div>

          <div class="rightpane2" style={{ backgroundColor: this.props.state.accentColor }}>
            <h1>
              Cart
            </h1>
            <img
              class="cart"
              src="https://images.ecosia.org/UJ5r4gW663JODjpyJFdbtGRaPJ0=/0x390/smart/http%3A%2F%2Fwww.free-icons-download.net%2Fimages%2Fshopping-cart-logo-icon-70706.png"
              alt=''
            />
            <div class="secondaryCartScroll">
              {cartItems}
            </div>
            <div class="line"/>
            <div class="topOuter">
            <div> Total Price:  </div>
            <div class="styleRight2"> {`$ ${(Math.floor(price * 100) / 100 )}`} </div>
            </div>
          </div>
          </div>
          </div>
        </div>
            <button class="button3" type="submit" onClick={this.onChange.bind(this)}>Back</button>
        </div>
    );
  }
}

CartView.proptypes = {
  state: Proptypes.object.isRequired,
  onChange: Proptypes.func.isRequired,
};

export default CartView;
