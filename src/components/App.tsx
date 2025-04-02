"use client";
import useAuthStore from "@/store/MyAuthState";
import useGlobalStore from "@/store/my-store";
import { ConfigProvider, theme } from "antd";
import Header from "./Header";
import LoginPage from "./LoginPage";
import Sidebar from "./Sidebar";

const App = ({ children }: { children: React.ReactNode }) => {
  const MyAuthState = useAuthStore();
  const state = useGlobalStore();

  return (
    <ConfigProvider
      theme={{
        algorithm: state.theme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div
        className={`${
          state.theme ? "bg-gray-900 text-white" : "bg-white text-black"
        } min-h-screen p-2`}
      >
        {MyAuthState.token ? (
          <>
            <Header />
            <main className="h-[84vh] my-2 flex gap-4">
              <Sidebar />
              {children}
            </main>
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    </ConfigProvider>
  );
};

export default App;
