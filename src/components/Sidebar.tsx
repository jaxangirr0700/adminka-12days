"use client";
import useGlobalStore from "@/store/my-store";
import { DarkLight } from "@/utils/DarkLight";
import {
  BankOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  ProductFilled,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, Switch } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [theme, setTheme] = useState<boolean>(true);
  const state = useGlobalStore();
  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: <Link href="/users">Users</Link>,
    },
    {
      key: "/products",
      icon: <ProductOutlined />,
      label: <Link href="/products">Products</Link>,
    },
    {
      key: "/categories",
      icon: <ProductFilled />,
      label: <Link href="/categories">Categories</Link>,
    },
    {
      key: "/banners",
      icon: <BankOutlined />,
      label: <Link href="/banners">Bannerlar</Link>,
    },
    {
      key: "/orders",
      icon: <OrderedListOutlined />,
      label: <Link href="/orders">Buyurtmalar</Link>,
    },
  ];
  const toggleTheme = () => {
    const newTheme = !state.theme;
    useGlobalStore.setState({ theme: newTheme });
  };

  return (
    <div className="flex flex-col">
      <div className="flex  flex-col mb-2">
        <Button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="mb-2 bg-green-500 rounded-xl "
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Switch
          onChange={() => {
            DarkLight();
          }}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          checked={state.theme}
        />
      </div>
      <Menu
        className="h-full rounded-xl"
        inlineCollapsed={collapsed}
        style={{
          padding: 0,
          maxWidth: 150,
          height: "100%",
        }}
        selectedKeys={[pathname]}
        mode="inline"
        items={menuItems}
      />
    </div>
  );
}
