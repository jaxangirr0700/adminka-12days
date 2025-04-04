"use client";
import useAuthStore from "@/store/MyAuthState";
import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useEffect } from "react";

function LoginPage() {
  const MyAuthState = useAuthStore();
  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const res = await axios.post("https://nt.softly.uz/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      useAuthStore.setState({
        user: res.data.user,
        token: res.data.accessToken,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(res.data));
      } 
    } catch (e) {}
  };

  useEffect(() => {
    const values = {
      email: "",
      password: "",
    };
    onFinish(values);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form
        onFinish={onFinish}
        className="bg-slate-100 border border-slate-300 rounded shadow-md w-80 hover:scale-105 transition-all duration-500"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
