import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import AdminCategory from "./AdminCategory";
import AdminProduct from "./AdminProduct";
import AdminUser from "./AdminUser";
const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <Link to={"/"}>
                  <UserOutlined />
                </Link>
              ),
              label: "Category",
            },
            {
              key: "2",
              icon: (
                <Link to={"/product"}>
                  <VideoCameraOutlined />
                </Link>
              ),
              label: "Product",
            },
            {
              key: "3",
              icon: (
                <Link to={"/user"}>
                  <UploadOutlined />
                </Link>
              ),
              label: "User",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<AdminCategory />} />
            <Route path="/product" element={<AdminProduct />} />
            <Route path="/user" element={<AdminUser />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
