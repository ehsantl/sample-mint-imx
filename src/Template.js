import React from "react";
import logo from './logo.jpeg'; 

//components
import Wallet from "./components/Wallet";
import Deposit from "./components/Deposit";

//design
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  WalletOutlined,
  DollarOutlined,
  BuildOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

class Template extends React.Component {
  state = {
    //collapsed: false,
    page: "wallet",
  };

  changePage = (e) => {
    this.setState({
      page: e.key,
    });
  };

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

  render() {
    return (
      <Layout>
        <Sider trigger={null}>
          <div className="logo"><img src={logo} alt="ET Code" /></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["wallet"]}>
            <Menu.Item
              key="wallet"
              icon={<WalletOutlined />}
              onClick={this.changePage}
            >
              Wallet
            </Menu.Item>
            <Menu.Item
              key="deposit"
              icon={<DollarOutlined />}
              onClick={this.changePage}
            >
              Deposit
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<BuildOutlined />}
              onClick={this.changePage}
            >
              Mint
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {(() => {
              switch (this.state.page) {
                case "wallet":
                  return <Wallet />;
                case "deposit":
                  return <Deposit />;
                default:
                  return null;
              }
            })()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Template;
