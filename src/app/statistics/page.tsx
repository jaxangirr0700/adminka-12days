"use client";

import { useFetchData } from "@/utils/axiosData/getData";
import {
  AppstoreOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";
import { UserDatatype, UserType } from "../users/page";

type DashboardType = {
  recentOrders: RentsOrderstype[];
  topProducts: {}[];
  totalOrders: string;
  totalProducts: string;
  totalRevenue: string;
  totalUsers: string;
};

type RentsOrderstype = {
  createdAt: string;
  customerId: number;
  id: number;
  status: string;
  totalPrice: number;
};

type TopProductsType = { id: number; name: string; totalSold: string };

function Statistics() {
  const { data: DashboardData } = useFetchData<DashboardType>(
    `/statistics/dashboard`
  );
  const { data: OrdersData } = useFetchData(`/statistics/orders`);
  const { data: UsersData } = useFetchData<UserDatatype>(`/users`);

  const topProducts = DashboardData?.topProducts;
  const users: UserType[] = UsersData?.items ?? [];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ backgroundColor: "#e6f7ff" }}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm sm:text-base">
                  Total Users
                </p>
                <p className="text-lg sm:text-xl font-bold">
                  {DashboardData?.totalUsers}
                </p>
              </div>
              <div>
                <UserOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              </div>
            </div>
          </Card>
        </Col>{" "}
        <Col xs={24} sm={12} md={6}>
          <Card style={{ backgroundColor: "#f6ffed" }}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm sm:text-base">
                  Total Products
                </p>
                <p className="text-lg sm:text-xl font-bold">
                  {DashboardData?.totalProducts}
                </p>
              </div>
              <div>
                <AppstoreOutlined style={{ fontSize: 24, color: "#52c41a" }} />
              </div>
            </div>
          </Card>
        </Col>{" "}
        <Col xs={24} sm={12} md={6}>
          <Card style={{ backgroundColor: "#f9f0ff" }}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm sm:text-base">
                  Total Orders
                </p>
                <p className="text-lg sm:text-xl font-bold">
                  {DashboardData?.totalOrders}
                </p>
              </div>
              <div>
                <ShoppingCartOutlined
                  style={{ fontSize: 24, color: "#9254de" }}
                />
              </div>
            </div>
          </Card>
        </Col>{" "}
        <Col xs={24} sm={12} md={6}>
          <Card style={{ backgroundColor: "#fffbe6" }}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm sm:text-base">
                  Total Revenue
                </p>
                <p className="text-lg sm:text-xl font-bold">
                  $ {Number(DashboardData?.totalRevenue) * 2}
                </p>
              </div>
              <div>
                <DollarOutlined style={{ fontSize: 24, color: "#faad14" }} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={16}>
          <Card title="Recent Orders">
            <div className="overflow-x-auto">
              <Table
                dataSource={DashboardData?.recentOrders}
                rowKey="id"
                pagination={false}
                scroll={{ x: 500 }}
                columns={[
                  {
                    title: "Order ID",
                    dataIndex: "id",
                    key: "id",
                  },
                  {
                    title: "Customer ID",
                    dataIndex: "customerId",
                    key: "customerId",
                    render: (userId, order) => {
                      const user = users.find((f) => {
                        return f.id === userId;
                      });
                      return <>{user?.name}</>;
                    },
                  },
                  {
                    title: "Total Price",
                    dataIndex: "totalPrice",
                    key: "totalPrice",
                    render: (totalPrice: number) =>
                      `$${totalPrice.toLocaleString()}`,
                  },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (status: string) => <span>{status}</span>,
                  },
                  {
                    title: "Date",
                    dataIndex: "createdAt",
                    key: "createdAt",
                    render: (date: string) =>
                      new Date(date).toLocaleDateString(),
                  },
                ]}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={10}>
          <Card title="Top Products">
            <div className="overflow-x-auto">
              <Table
                dataSource={topProducts}
                rowKey="name"
                pagination={false}
                scroll={{ x: 300 }}
                columns={[
                  {
                    title: "Product Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Total Sold",
                    dataIndex: "totalSold",
                    key: "totalSold",
                  },
                ]}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Statistics;
