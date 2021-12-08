import React, { Component } from "react";
import { ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { ethers } from "ethers";

import { Alert, Divider } from "antd";
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
    balance: 0,
  };

  setupAccount = async () => {
    const { address, starkPublicKey } = await link.setup({});
    localStorage.setItem("WALLET_ADDRESS", address);
    localStorage.setItem("STARK_PUBLIC_KEY", starkPublicKey);

    this.setState({
      walletConnected: true,
    });

    this.getBalances();
  };

  disconnectAccount = () => {
    localStorage.removeItem("WALLET_ADDRESS");
    this.setState({
      walletConnected: false,
    });
  };

  getBalances = async () => {
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const balances = await client.getBalances({
      user: localStorage.getItem("WALLET_ADDRESS"),
    });
    this.setState({
      balance: ethers.utils.formatEther(balances.imx._hex),
    });
  };

  componentDidMount() {
    if (localStorage.getItem("WALLET_ADDRESS") !== null) {
      this.setState({
        walletConnected: true,
      });
      //set blanace in state
      this.getBalances();
    }
  }

  render() {
    return (
      <div style={{ maxWidth: "50%" }}>
        <h1>Wallet</h1>
        <Divider />
        <Alert
          message="Warning"
          description="Use Ropsten Test Network"
          type="warning"
          showIcon
          closable
        />

        <Divider />

        {this.state.walletConnected === false && (
          <button onClick={this.setupAccount}>Connect</button>
        )}
        {this.state.walletConnected === true && (
          <div>
            <p>Address: {localStorage.getItem("WALLET_ADDRESS")}</p>
            <p>Network: {localStorage.getItem("ETH_NETWORK")}</p>
            <p>Balance: {this.state.balance} ETH</p>
            <button onClick={this.disconnectAccount}>Disconnect</button>
          </div>
        )}
      </div>
    );
  }
}

export default Wallet;
