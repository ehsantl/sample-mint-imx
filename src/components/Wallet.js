import React, { Component } from "react";
import { ImmutableXClient, Link } from "@imtbl/imx-sdk";

// const linkAddress = 'https://link.x.immutable.com';
// const apiAddress = 'https://api.x.immutable.com/v1';

// Ropsten Testnet
const linkAddress = "https://link.ropsten.x.immutable.com";
const apiAddress = "https://api.ropsten.x.immutable.com/v1";

// Link SDK
const link = new Link(linkAddress);

class Wallet extends Component {
  state = {
    walletConnected: false,
  };

  constructor(props) {
    super(props);
  }

  //   async function getWalletInfo() {
  //   const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
  //   const link = new Link(linkAddress);

  //   const address = localStorage.getItem("WALLET_ADDRESS");
  //   const balances = await client.getBalances({ user: address });

  //   let ammountInEth = ethers.utils.formatEther(balances.imx._hex);
  // }

  setupAccount = async () => {
    const { address, starkPublicKey } = await link.setup({});
    localStorage.setItem("WALLET_ADDRESS", address);
    localStorage.setItem("STARK_PUBLIC_KEY", starkPublicKey);

    this.setState({
      walletConnected: true,
    });
  };

  disconnectAccount = () => {
    localStorage.removeItem("WALLET_ADDRESS");
    this.setState({
      walletConnected: false,
    });
  };

  render() {
    return (
      <div>
        <h1>Wallet</h1>
        {this.state.walletConnected === false && (
          <button onClick={this.setupAccount}>Connect</button>
        )}
        {this.state.walletConnected === true && (
          <div>
            <p>Address: {localStorage.getItem("WALLET_ADDRESS")}</p>
            <p>Network: {localStorage.getItem("ETH_NETWORK")}</p>

            <button onClick={this.disconnectAccount}>Disconnect</button>
          </div>
        )}
      </div>
    );
  }
}

export default Wallet;
