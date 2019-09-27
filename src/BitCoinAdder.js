import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './App.css';

class BitCoinAdder extends Component {
  constructor(props) {
  super(props);
  this.state = {
    time: props.time
    }
  }
  componentDidMount() {
    const oldTime = this.clone(this.state.time);
    setTimeout(() => {
      this.setState({ time: oldTime });
    }, 450);
  }

  componentWillUpdate() {
    let oldTime = this.clone(this.state.time);
    setTimeout(() => {
      this.setState({ time: (457/1.023) + 121.345 + oldTime });
    }, 457);
  }

  clone(src) {
  return JSON.parse(JSON.stringify(src));
  }

  topPane() {
    let time = (this.state.time)/1000000000000000;
    time = time.toFixed(15);

    return (
      <div className="toppane">
        <li>
          <p align="right" className="bitcoin">
            {time}
              <img
                alt=''
                src="https://cdn4.iconfinder.com/data/icons/proglyphs-shopping-and-finance/512/Coin_-_Bitcoin-512.png"
                width="30"
                height="30"
                className="bitcoin"/>
              </p>
          </li>
      </div>
    );
  }

  render() {
    const topPane = this.topPane();

    return(
      <div>
        {topPane}
      </div>
    )
  }
}
BitCoinAdder.proptypes = {
  time: Proptypes.number.isRequired
};
export default BitCoinAdder;
