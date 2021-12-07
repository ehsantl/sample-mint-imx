import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';


import { ImmutableXClient, Link } from '@imtbl/imx-sdk';
import { ERC721TokenType, ETHTokenType } from '@imtbl/imx-sdk';
import { ethers } from 'ethers';


const linkAddress = 'https://link.x.immutable.com';
const apiAddress = 'https://api.x.immutable.com/v1';

// Ropsten Testnet
//const linkAddress = 'https://link.ropsten.x.immutable.com';
//const apiAddress = 'https://api.ropsten.x.immutable.com/v1';

// Link SDK
const link = new Link(linkAddress);


async function setupAccount(){
    const {address, starkPublicKey } = await link.setup({});
    localStorage.setItem('WALLET_ADDRESS', address);
    localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);
}

async function getWalletInfo() {
  const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
  const link = new Link(linkAddress);  
  
  const address = localStorage.getItem('WALLET_ADDRESS');
  const balances = await client.getBalances({ user: address });  

console.log(balances)

  let ammountInEth = ethers.utils.formatEther(balances.imx._hex);



  console.log(ammountInEth)
}



class App extends Component {
    constructor(props) {
      super(props);

    }

  async componentDidMount() {  
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const link = new Link(linkAddress);
  }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <button onClick={setupAccount}>Connect</button>
              <button onClick={getWalletInfo}>Wallet</button>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>            
        );
    }
}

export default App;