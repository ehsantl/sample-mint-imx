import React, { Component } from "react";
import { Link } from "@imtbl/imx-sdk";
import { ETHTokenType } from "@imtbl/imx-sdk";

import { Form, Input, Button, Divider } from "antd";

// const linkAddress = 'https://link.x.immutable.com';
// const apiAddress = 'https://api.x.immutable.com/v1';

// Ropsten Testnet
const linkAddress = "https://link.ropsten.x.immutable.com";
//const apiAddress = "https://api.ropsten.x.immutable.com/v1";

// Link SDK
const link = new Link(linkAddress);

class Deposit extends Component {
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
        <Divider />
        {localStorage.getItem("WALLET_ADDRESS") !== null && (
          <Form
            name="basic"
            //labelCol={{ span: 4 }}
            //wrapperCol={{ span: 8 }}
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Deposit
              </Button>
            </Form.Item>
          </Form>
        )}
        {localStorage.getItem("WALLET_ADDRESS") === null && (
          <p>Please connect your wallet first to Deposit</p>
        )}
      </div>
    );
  }
}

export default Deposit;
