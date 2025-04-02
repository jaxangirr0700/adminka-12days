"use client";
import { texts } from "@/constants/data";
import useGlobalStore from "@/store/my-store";
import { Button, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AddOrders from "./edits/Addorders";
import DeleteOrders from "./edits/Deleteorders";
import EditOrders from "./edits/EditOrders";

type Language = "uzbek" | "english" | "russian";

function OrdersPage() {
  const state = useGlobalStore();

  const [AddOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [EditOrder, setEditOrder] = useState({});
  const [deleteOrder, setDeleteOrder] = useState({});

  const showDrawer = () => {
    setAddOpen(true);
  };

  const showDrawerEdit = () => {
    setEditOpen(true);
  };

  const onClose = () => {
    setAddOpen(false);
  };

  const onCloseEdit = () => {
    setEditOpen(false);
  };

  const changeLanguage = (value: Language) => {
    useGlobalStore.setState({ language: value });
  };
  console.log(state.language);

  const language: Language = (state.language as Language) || "uzbek";

  return (
    <div className="flex flex-col items-center">
      <Select
        defaultValue={language}
        style={{ width: 120, marginBottom: 16 }}
        onChange={changeLanguage}
      >
        <Select.Option value="uzbek">O'zbekcha</Select.Option>
        <Select.Option value="english">English</Select.Option>
        <Select.Option value="russian">Русский</Select.Option>
      </Select>

      <div className="flex gap-2 items-center justify-center">
        <Button>Umumiy son: {state.orders.length}</Button>
        <Button>
          Faollar: {state.orders.filter((item: any) => item.active).length}
        </Button>
        <Button>
          Nofaollar: {state.orders.filter((item: any) => !item.active).length}
        </Button>
      </div>

      <div className="flex flex-col my-5">
        <AddOrders onClose={onClose} open={AddOpen} showDrawer={showDrawer} />
        <EditOrders
          editOpen={editOpen}
          showDrawerEdit={showDrawerEdit}
          onCloseEdit={onCloseEdit}
          EditStudent={EditOrder}
          setEditStudent={setEditOrder}
        />
        <Table
          columns={[
            {
              title: texts[language].id,
              dataIndex: "id",
              render: (id, order) => (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setEditOpen(true);
                    setEditOrder(order);
                  }}
                >
                  {id}
                </span>
              ),
            },
            {
              title: texts[language].name,
              dataIndex: "name",
              render: (name, order) => {
                const product = state.products.find(
                  (i) => i.id === order.productID
                );
                return product ? product.name : "Noma'lum";
              },
            },
            {
              title: texts[language].price,
              render: (order) => {
                const product = state.products.find(
                  (s) => s.id === order.productID
                );
                return product ? product.price * order.count : 0;
              },
            },

            {
              title: texts[language].count,
              dataIndex: "count",
            },
            {
              title: texts[language].address,
              dataIndex: "address",
            },
            {
              title: texts[language].status,
              dataIndex: "status",
            },
            {
              title: texts[language].customer,
              dataIndex: "studentID",
              render: (studentID) => {
                const student = state.students.find((s) => s.id === studentID);
                return student ? student.firstName : "Noma'lum";
              },
            },
            {
              title: texts[language].delete,
              dataIndex: "productID",
              render: (productID, order) => {
                return (
                  <DeleteOrders
                    studentt={order}
                    setDeleteStudent={setDeleteOrder}
                    deleteStudent={deleteOrder}
                  />
                );
              },
            },
          ]}
          dataSource={state.orders.map((order) => ({
            ...order,
            key: order.id,
          }))}
        />
        <Button
          color="danger"
          type="text"
          variant="text"
          onClick={() => {
            if (window.confirm(texts[language].confirmDelete)) {
              localStorage.removeItem("orders");
              alert("Hammasi o'chirildi!");
            }
          }}
        >
          {texts[language].deleteAll}
        </Button>
      </div>
    </div>
  );
}

export default OrdersPage;
