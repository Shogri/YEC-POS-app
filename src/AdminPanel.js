import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './App.css';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminOptions: [
        'Top Bar Style',
        'Change Color Palette',
        'Add Payment Option',
        'Remove Pay Option',
        'Add Shop Item',
        'Remove Shop Item',
        'Add Shop Category',
        'Remove Shop Category',
        'New'
      ],
      adminOption: 'Top Bar Style'
    }
  }
  changeSelection() {
    const type = document.getElementById('mySelect2').value;
    this.setState({ adminOption: type });
  }

  createAdminOption(type) {
    return (
      <option id={type} value={type}>{type}</option>
    );
  }
  createAdminObject() {
    if (this.state.adminOption === 'Top Bar Style') {
        return (
          <form>
            <fieldset>
            <legend>Web Style</legend>
            <p>
              <label>Set New Website Logo</label>
              <input type = "text"
                  id = "logoURL"
                  placeholder = "Logo URL" />
            </p>
                <button class="button2"  type="button" onClick={this.props.setLogo}> Set Logo </button>
            <p>
              <label>Set New Website Title</label>
              <input type = "text"
                  id = "titleText"
                  placeholder = "Website Title" />
            </p>
            <button class="button2"  type="button" onClick={this.props.setTitle}> Set Title </button>
          </fieldset>
        </form>
      );
    } else if (this.state.adminOption === 'Change Color Palette') {
      return (
        <form>
        <fieldset>
          <legend>Colour Palette </legend>
          <p  class="column">
            <label>Set Primary Color</label>
            <input type = "text"
                id = "color1"
                placeholder = "Primary Color (#ffffff)" />
          </p>
          <p  class="column">
            <label>Set Secondary Color</label>
            <input type = "text"
                id = "color2"
                placeholder = "Secondary Color (#ffffff)" />
          </p>
          <p class="column">
            <label>Set Accent Color </label>
            <input type = "text"
                id = "color3"
                placeholder = "Accent Color (#ffffff)" />
          </p>
              <button class="button2"  type="button" onClick={this.props.setColors}> Set Palette </button>
        </fieldset>
        </form>
      );
    } else if (this.state.adminOption === 'Add Payment Option') {
      return (
        <form>
          <fieldset>
            <legend>Add Payment Option</legend>
            <p>
              <label>Set Payment Type </label>
              <input type = "text"
                id = "Payment Type"
                placeholder = "Payment Type"
                />
              </p>
              <p>
              <label>Set Payment Information </label>
                <div   class="tooltip">
                <input type = "text"
                  id = "Payment Info"
                  placeholder = "Seperate fields by commas"
                  style={{ width: '300px'}}
                  />
                    <span class="tooltiptext">All Password Fields must contain the word Password</span>
                  </div>
            </p>
              <button  class="button2" type="button" onClick={this.props.addPayOption}> Add Option </button>
          </fieldset>
        </form>
      );
    } else if (this.state.adminOption === 'Remove Pay Option') {
      return (
        <form>
          <fieldset>
            <legend>Remove Payment Option</legend>
            <p>
              <input type = "text"
                id = "Payment Type Removed"
                placeholder = "Payment Type"
                />
              </p>
              <button  class="button2" type="button" onClick={this.props.removePayOption}> Remove Option </button>
          </fieldset>
        </form>
      );
    } else if (this.state.adminOption === 'Add Shop Item') {
      return (
        <form>
        <fieldset>
          <legend>Add item</legend>
          <p>
            <input type = "text"
                id = "myText"
                placeholder = "Item name" />
          </p>
          <p>
            <input type = "text"
                id = "price"
                placeholder = "Price"
            />
          </p>
          <p>
            <input type = "myTextArea"
              id = "myImageUrl"
              placeholder = "URL"/>
          </p>
          <p>
            <input type = "myTextArea"
              id = "description"
              placeholder = "Description"/>
          </p>
          <p>
            <input type = "myTextArea"
              id = "id"
              placeholder = "Item ID"/>
          </p>
          <p>
            <input type = "myTextArea"
              id = "category"
              placeholder = "Item Category"/>
          </p>
            <button class="button2"  type="button" onClick={this.props.addNewItem}> Add Item </button>
        </fieldset>
      </form>
    );
  } else if (this.state.adminOption === 'Remove Shop Item') {
    return (
      <form>
      <fieldset>
        <legend>Remove item</legend>
        <p>
          <input type = "text"
            id = "idRemove"
            placeholder = "ID" />
        </p>
          <button  class="button2" type="button" onClick={this.props.removeItem}> Remove Item </button>
        </fieldset>
      </form>
    );
  } else if (this.state.adminOption === 'Add Shop Category') {
    return (
      <form>
      <fieldset>
        <legend>Add Shop Category</legend>
        <p>
          <input type = "text"
          id = "CategoryAdd"
          placeholder = "Category" />
        </p>
        <button  class="button2" type="button" onClick={this.props.addCategory}> Add Category </button>
      </fieldset>
      </form>
    );
  } else if (this.state.adminOption === 'Remove Shop Category') {
    return (
      <form>
      <fieldset>
        <legend>Remove Shop Category</legend>
        <p>
          <input type = "text"
          id = "CategoryRemove"
          placeholder = "Category" />
        </p>
        <button  class="button2" type="button" onClick={this.props.removeCategory}> Remove Category </button>
      </fieldset>
      </form>
    );
  } else if (this.state.adminOption === 'New') {
    document.getElementById('topPane').addEventListener("mouseenter", this.display.bind(this));
    console.log(  document.getElementById('topPane'));

    return (
      <form>
      <fieldset>
        <legend>Remove Shop Category</legend>
        <p>
          <input type = "text"
          id = "CategoryRemove"
          placeholder = "New" />
        </p>
      </fieldset>
      </form>
    );
  }

    return <div/>;
  }

  display() {
    console.log('hit');
  }

  render() {
    const adminOutput = this.state.adminOptions.map((type) => this.createAdminOption(type));
    const adminObj = this.createAdminObject();

    return (
      <div class="modalAdmin">
      <div class="modalAdminContent">
        <h1>  Admin Panel  </h1>
        <span class="closeAdmin"  onClick={this.props.hideAdmin}>&times;</span>

        <div class="adminDD">
          <h4> Select Admin Option </h4>
          <select id="mySelect2" class="dropDown" style={{ backgroundColor: this.props.state.accentColor}} onClick={this.changeSelection.bind(this)}>
          {adminOutput}
        </select>
        </div>
          {adminObj}
      </div>
      </div>
    );
  }
}

AdminPanel.proptypes = {
  state: Proptypes.object.isRequired,
  setLogo: Proptypes.func.isRequired,
  setTitle: Proptypes.func.isRequired,
  setColors: Proptypes.func.isRequired,
  addPayOption: Proptypes.func.isRequired,
  removePayOption: Proptypes.func.isRequired,
  addNewItem: Proptypes.func.isRequired,
  removeItem: Proptypes.func.isRequired,
  hideAdmin: Proptypes.func.isRequired,
  addCategory: Proptypes.func.isRequired,
  removeCategory: Proptypes.func.isRequired,
};

export default AdminPanel;
