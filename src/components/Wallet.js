import React, { Component } from 'react';
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

// const linkAddress = 'https://link.x.immutable.com';
// const apiAddress = 'https://api.x.immutable.com/v1';

// Ropsten Testnet
const linkAddress = 'https://link.ropsten.x.immutable.com';
const apiAddress = 'https://api.ropsten.x.immutable.com/v1';

// Link SDK
const link = new Link(linkAddress);

const setupAccount = async () => {
    const {address, starkPublicKey } = await link.setup({});
    localStorage.setItem('WALLET_ADDRESS', address);
    localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);
}


class Wallet extends Component {

    state = {
        walletConnected: false
    }

    constructor(props) {
        super(props);
    }

    setupAccount = async () => {
        const {address, starkPublicKey } = await link.setup({});
        localStorage.setItem('WALLET_ADDRESS', address);
        localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);
        
        this.setState({
            walletConnected: true
        })
    }

    disconnectAccount = () => {
        localStorage.removeItem('WALLET_ADDRESS');
        this.setState({
            walletConnected: false
        })
    }

    render() {
        return (
            <div>
                <h1>Wallet</h1>
                {localStorage.getItem('WALLET_ADDRESS') === null && (
                    <button onClick={this.setupAccount}>Connect</button>)}
                {localStorage.getItem('WALLET_ADDRESS') !== null && (
                    <div>
                        <p>Address: {localStorage.getItem('WALLET_ADDRESS')}</p>
                        <p>Network: {localStorage.getItem('ETH_NETWORK')}</p>

                        <button onClick={this.disconnectAccount}>Disconnect</button>
                    </div>)}                
            </div>

        );
    }
}

export default Wallet;