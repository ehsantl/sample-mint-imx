import React from "react";
import ReactDOM from "react-dom";

//components
import Wallet from "./components/Wallet";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

class Template extends React.Component {
  state = {
    collapsed: false,
    page: "wallet",
  };

  changePage = (e) => {
    this.setState({
      page: e.key,
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["wallet"]}>
            <Menu.Item
              key="wallet"
              icon={<UserOutlined />}
              onClick={this.changePage}
            >
              Wallet
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<VideoCameraOutlined />}
              onClick={this.changePage}
            >
              nav 2
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<UploadOutlined />}
              onClick={this.changePage}
            >
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <p>Page: {this.state.page}</p>
            {(() => {
              switch (this.state.page) {
                case "wallet":
                  return <Wallet />;
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
