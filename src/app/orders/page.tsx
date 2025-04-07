"use client";
import useAuthStore from "@/store/MyAuthState";
import { useDeleteData } from "@/utils/axiosData/deleteData";
import { useFetchData } from "@/utils/axiosData/getData";
import { Button, Table } from "antd";
import { useState } from "react";
import { UserDatatype, UserType } from "../users/page";
import AddOrders from "./edits/Addorders";
import EditOrders from "./edits/EditOrders";

export type OrdersItemType = {
  id: number;
  orderId: number;
  price: number;
  productId: number;
  quantity: number;
};

export type OrsderType = {
  createdAt: string;
  customerId: number;
  id: number;
  items: OrdersItemType;
  status: string;
  totalPrice: number;
};

type OrderDataType = {
  items: OrsderType[];
  message: string;
  total: number;
  page: number;
};

function CategoriesPage() {
  const MyAuthState = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editOrder, setEditOrder] = useState<OrsderType | null>(null);
  const pageSize = 10;
  const { data: orderData, fetchData } = useFetchData<OrderDataType>(
    `/orders?limit=${pageSize}&page=${currentPage}&order=ASC`
  );
  const { data: usersData } = useFetchData<UserDatatype>(`/users`);
  const { deleteData, loading } = useDeleteData();

  const showAddDrawer = () => setAddOpen(true);
  const onCloseAdd = () => setAddOpen(false);

  const orders = orderData?.items || [];
  const total = orderData?.total || 0;
  const users: UserType[] = usersData?.items || [];

  return (
    <div className="flex flex-col p-4">
      <h1 className="mb-4">Buyurtmalar Ro'yxati</h1>
      <AddOrders
        open={addOpen}
        showDrawer={showAddDrawer}
        onClose={onCloseAdd}
        getOrders={fetchData}
      />
      <EditOrders
        item={editOrder}
        setItem={setEditOrder}
        fetchData={fetchData}
      />
      <Table
        className="rounded-lg shadow-lg"
        rowKey={"id"}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (id, order) => {
              return (
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    setEditOpen(true);
                    setEditOrder(order);
                  }}
                >
                  {id}
                </span>
              );
            },
          },
          {
            title: "Foydalanuvchi",
            dataIndex: "customerId",
            render: (userID) => {
              const user = users.find((f) => f.id === userID);

              return <>{user ? user.name : "Noma'lum"}</>;
            },
          },

          {
            title: "Narxi",
            dataIndex: "totalPrice",
          },
          {
            title: "Status",
            dataIndex: "status",
          },
          // {
          //   title: "items",
          //   dataIndex: "items",
          // },
          {
            title: "Xosil qilingan",
            dataIndex: "createdAt",
            render: (date) => new Date(date).toLocaleString("ru"),
          },
          {
            title: "Delete",
            dataIndex: "id",
            render: (id) => (
              <Button
                danger
                onClick={() => {
                  deleteData(`orders/${id}`, MyAuthState.token);
                }}
              >
                Delete
              </Button>
            ),
          },
        ]}
        dataSource={orders}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
}

export default CategoriesPage;
