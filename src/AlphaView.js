import React, { Component } from 'react';
import './App.css';
import CartView from './CartView.js';

class AlphaView extends Component {
  constructor(props) {
  super(props);
  this.state = {
    items: this.props.createItems(),
    view: 'Main',
    addedItems: [],
    selectedItem: {
      name: 'Mom Crew Neck',
      price: 34.95,
      src: 'https://www.bookstore.yorku.ca/outerweb/product_images/CREW_NECK_MOM_L.jpg',
      description: 'Comfy crew neck style sweatshirt, the perfect gift for Mom; 80% Cotton, 20% Polyester; Machine wash; Size and fit: Model is 5’4” wearing a Small',
      id: '#SWW3467',
      category: 'Womens'
    }
    }
  }

  //HELPER FUNCTIONS

  addToCart() {
    const addTo = this.state.selectedItem;
    const cart = this.state.addedItems;
    cart.push(addTo);
    this.setState({ addedItems: cart });
  }

  removeFromCart(item, index) {
    this.state.addedItems.splice(index, 1);
    this.forceUpdate();
  }

  resetCart() {
      this.setState({ view: 'Checkout' });
  }

  priceCalculation() {
    let price = 0;
    for (let x = 0; x < this.state.addedItems.length; x++) {
      price += this.state.addedItems[x].price;
    }
    return price;
  }

  createMiddle(item) {
    this.setState({ selectedItem:  item });
  }

  createItemObject(item) {
    return (
      <div className="outerContainer" key={`Middle Item ${item.name}`} onClick={this.createMiddle.bind(this, item)}>
        <img src={item.src} className="leftImage" alt=''/>
        <div className="internal">
          <div>
            {item.name}
          </div>
          <div>
            {`$${item.price}`}
          </div>
        </div>
      </div>
    );
  }

  createCart(item, index) {
    index += 1;
    return (
      <div className="outerContainer2" key={`Cart Item ${index}`}>
        <div className="internal2">
          <div className="spacer">
            {item.name}
          </div>
          <div className="spacer2">
            {`$${item.price}`}
          </div>
          <span className="close" onClick={this.removeFromCart.bind(this, item, index)}>&times;</span>
        </div>
      </div>
    );
  }

  createCategories(option) {
    return (
      <div key={`Category Option ${option}`}>
          <button className="unStyle" id={option} value={option} onClick={this.props.setCurrentCategory.bind(this, `${option}`)}>{option}</button>
      </div>
    );
  }

  onChange(newState) {
    this.setState({ view: newState });
  }

  rightPane(price, cartItems) {
    return (
      <div className="rightpane" style={{ backgroundColor: this.props.state.secondaryColor }}>
      <h1>
        Cart
      </h1>
      <img
        className="cart"
        alt=''
        src="https://images.ecosia.org/UJ5r4gW663JODjpyJFdbtGRaPJ0=/0x390/smart/http%3A%2F%2Fwww.free-icons-download.net%2Fimages%2Fshopping-cart-logo-icon-70706.png"/>
      <button type="button" className="styleRight" onClick={this.resetCart.bind(this)}> Check Out </button>
      <div className="cartScroll">
        {cartItems}
      </div>
      <div className="line"/>
      <div className="topOuter">
      <div> Total Price:  </div>
      <div className="styleRight2"> {`$ ${(Math.floor(price * 100) / 100 )}`} </div>
      </div>
      </div> );
  }

  leftPane(listItems) {
    const categoryOptions = this.props.state.categories.map((objects) => this.createCategories(objects));

    return(
      <div className="outer">
        <div id="mySelect" style={{ backgroundColor: this.props.state.accentColor }} className="topnav">
          {categoryOptions}
        </div>
        <div className="leftpane">
          <div className="leftItems">
              <select id="sortSelection" className="sortOptions" style={{ backgroundColor: this.props.state.accentColor }}
              onClick={this.props.changeSortSelection.bind(this)}>
                {this.props.sortMethods}
              </select>
            {listItems}
          </div>
          {this.props.adminButton}
        </div>
      </div>
    );
  }

  middlePane() {
    if (typeof(this.state.selectedItem) !== 'undefined') {
      return (
        <div className="middlepane" style={{ backgroundColor: this.props.state.primaryColor }}>
            <h4><center style={{ backgroundColor: this.props.state.accentColor }}>
              {this.state.selectedItem.name}
            </center></h4>
            <div className="imageOverlay">
              <img
                src={this.state.selectedItem.src}
                className="center"
                alt=''
                />
              <div id="div1" className="showMe" style={{ backgroundColor: this.props.state.accentColor }}>
                <div>
                  <center>
                    {`$${this.state.selectedItem.price}`}
                  </center>
                </div>
                <div>
                  <center>
                    {this.state.selectedItem.description}
                  </center>
                </div>
              </div>
            </div>
            <center><button className="button2" style={{marginTop: '10px'}} type="button" onClick={this.addToCart.bind(this)}> Add to Cart </button></center>
        </div>
      );
    }

    return <div/>
  }



  render() {
    if (typeof(this.state.selectedItem) !== 'undefined') {
      if (this.props.state.category !== this.state.selectedItem.category) {
        this.createMiddle(this.props.listItems[0]);
      }
    }
    let index = -1;
    const listItems = this.props.listItems.map((objects) => this.createItemObject(objects));
    const cartItems =  this.state.addedItems.map((objects) => this.createCart(objects, index));
    const price = this.priceCalculation();
    const rightPane = this.rightPane(price, cartItems);
    const leftPane = this.leftPane(listItems)
    const middlePane = this.middlePane();
    const  button = (<button className="button3" onClick={this.props.toggleAdmin.bind(this)}> Login </button>);

    if (this.state.view === 'Main') {
      return (
        <div className="container">
          {leftPane}
          {middlePane}
          {rightPane}
          {button}
          {this.props.modal}
          {this.props.adminPanel}
        </div>
      )
    } else {
      return (
        <CartView
        state={this.props.state}
        addedItems={this.state.addedItems}
        onChange = {this.onChange.bind(this)}
        />
      )
    }
  }

}
export default AlphaView;
