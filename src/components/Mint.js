import React, { Component } from "react";
import { Card, Divider } from "antd";
import { AlchemyProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { ImmutableXClient, MintableERC721TokenType } from "@imtbl/imx-sdk";
import { Input } from "antd";

const provider = new AlchemyProvider("ropsten", "");

class Mint extends Component {
  state = {
    collectionName: "",
    collectionDescription: "",
    collectionImageUrl: "",
  };

  waitForTransaction = async (txId) => {
    const receipt = await provider.waitForTransaction(txId);
    if (receipt.status === 0) {
      throw new Error("Transaction rejected");
    }
    return receipt;
  };

  mint = async (event) => {
    event.preventDefault();
    const mintToWallet = localStorage.getItem("WALLET_ADDRESS"); // eth wallet public address which will receive the token
    const signer = new Wallet(process.env.REACT_APP_SIGNER_PRIVATE_KEY).connect(provider);
    const minter = await ImmutableXClient.build({
      publicApiUrl: "https://api.ropsten.x.immutable.com/v1", //https://api.ropsten.x.immutable.com/v1, //  for ropsten, https://api.x.immutable.com/v1 for mainnet
      signer: signer,
      starkContractAddress: "0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef", // 0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef for ropsten, 0x5FDCCA53617f4d2b9134B29090C87D01058e27e9 for mainnet
      registrationContractAddress: "0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864", // 0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864 for ropsten, 0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c for mainnet
      gasLimit: process.env.REACT_APP_GAS_LIMIT,
      gasPrice: process.env.REACT_APP_GAS_PRICE,
    });

    const registerImxResult = await minter.registerImx({
      etherKey: minter.address.toLowerCase(),
      starkPublicKey: minter.starkPublicKey,
    });

    if (registerImxResult.tx_hash === "") {
    } else {
      await this.waitForTransaction(Promise.resolve(registerImxResult.tx_hash));
    }

    await minter.mint({
      mints: [
        {
          etherKey: mintToWallet.toLowerCase(),
          tokens: [
            {
              type: MintableERC721TokenType.MINTABLE_ERC721,
              data: {
                tokenAddress: process.env.REACT_APP_COLLECTION_CONTRACT_ADDRESS, // address of token
                id: "124", // must be a unique uint256 as a string
                blueprint: event.target.metadata.value, // metadata can be anything but your L1 contract must parse it on withdrawal from the blueprint format '{tokenId}:{metadata}'
              },
            },
          ],
          nonce: "1",
          authSignature: "", // Leave empty
        },
      ],
    });
  };

  caesarCipher(str) {
    let strAm = "0123456789abcdefghijklmnopqrstuvwxyz";
    let strNz = "ȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏȪȫȬȭȮȯȰȱȲȳȴȵȶ";
    let rot13 = "";

    for (let i = 0; i < str.length; i++) {
      if (strAm.includes(str.charAt(i))) {
        rot13 += str
          .charAt(i)
          .replace(str.charAt(i), strNz[strAm.indexOf(str.charAt(i))]);
      }
    }
    return rot13;
  }

  componentDidMount() {
    const options = { method: "GET", headers: { Accept: "application/json" } };
    fetch(
      "https://api.ropsten.x.immutable.com/v1/collections/" + process.env.REACT_APP_COLLECTION_CONTRACT_ADDRESS,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          collectionName: response.name,
          collectionDescription: response.description,
          collectionImageUrl: response.collection_image_url,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { Meta } = Card;
    const { TextArea } = Input;
    return (
      <div>
        <h1>Mint</h1>
        <Divider />
        <h2>Collection</h2>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={this.state.collectionImageUrl} />}
        >
          <Meta
            title={this.state.collectionName}
            description={this.state.collectionDescription}
          />
        </Card>
        <Divider />

        {localStorage.getItem("WALLET_ADDRESS") !== null && (
          <form onSubmit={this.mint}>    
            <Divider />
            <p>Asset</p>
            <TextArea
              style={{
                "fontSize": "30px",
                "width": "250px",
                "height": "200px"
              }}
              name="metadata"
              value={this.caesarCipher(
                localStorage.getItem("WALLET_ADDRESS").toLowerCase()
              )}
            />
            <button name="mint" type="submit" >
              Mint
            </button>
          </form>
        )}
        {localStorage.getItem("WALLET_ADDRESS") === null && (
          <p>Please connect your wallet first to Mint</p>
        )}
      </div>
    );
  }
}

export default Mint;
