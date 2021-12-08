import React, { Component } from "react";
import { ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { ERC721TokenType, ETHTokenType } from "@imtbl/imx-sdk";

import { Form, Input, Button, Checkbox } from "antd";

// const linkAddress = 'https://link.x.immutable.com';
// const apiAddress = 'https://api.x.immutable.com/v1';

// Ropsten Testnet
const linkAddress = "https://link.ropsten.x.immutable.com";
const apiAddress = "https://api.ropsten.x.immutable.com/v1";

// Link SDK
const link = new Link(linkAddress);

const setupAccount = async () => {
  const { address, starkPublicKey } = await link.setup({});
  localStorage.setItem("WALLET_ADDRESS", address);
  localStorage.setItem("STARK_PUBLIC_KEY", starkPublicKey);
};

class Deposit extends Component {
  constructor(props) {
    super(props);
  }

  deposit(e) {
    link.deposit({
      type: ETHTokenType.ETH,
      amount: e.amount,
    });
  }

  render() {
    return (
      <div>
        <h1>Deposit</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={this.deposit}
          autoComplete="off"
        >
          <Form.Item
            label="Amount"
            name="amount"
            type="number"
            rules={[{ required: true, message: "Please input the amount ETH" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Deposit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Deposit;
