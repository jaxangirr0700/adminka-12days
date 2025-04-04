"use client";
import useGlobalStore from "@/store/my-store";
import useAuthStore from "@/store/MyAuthState";
import {
  ExclamationCircleFilled,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const state = useGlobalStore();
  const MyAuthState = useAuthStore();
  const [user, setUser] = useState(MyAuthState.user);

  useEffect(() => {
    setUser(MyAuthState.user);
  }, [MyAuthState.user]);

  const items: MenuProps["items"] = [
    {
      label: user?.role,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: user?.email,
      key: "2",
      icon: <ExclamationCircleFilled />,
    },
    {
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("auth");
            useAuthStore.setState({ token: "", user: null });
          }}
        >
          Logout
        </span>
      ),
      key: "4",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <header
      className={`${
        state.theme
          ? "bg-black text-white border-0"
          : "bg-slate-100 text-slate-900 border-2"
      } p-4  sm:p-6 flex items-center justify-between   rounded-xl shadow-lg`}
    >
      <Link href={"/"} className="text-2xl sm:text-4xl font-bold italic ">
        Logo
      </Link>

      <div className="flex items-center gap-2">
        <Dropdown.Button menu={menuProps} className="w-full sm:w-auto">
          <UserOutlined />
          {user?.name || "User"}
        </Dropdown.Button>
      </div>
    </header>
  );
}
