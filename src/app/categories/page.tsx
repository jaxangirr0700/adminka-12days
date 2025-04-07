"use client";
import useAuthStore from "@/store/MyAuthState";

import { useFetchData } from "@/utils/axiosData/getData";
import { Button, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import AddCategories from "./edits/AddCatigories";
import EditCategories from "./edits/EditCategories";
import { useDeleteData } from "@/utils/axiosData/deleteData";

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

type CategoryDataType = {
  items: CategoryType[];
  message: string;
  total: number;
};

function CategoriesPage() {
  const MyAuthState = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);

  const pageSize = 10;

  const { data: categoryData } = useFetchData<CategoryDataType>(
    `/categories?limit=${pageSize}&page=${currentPage}&order=ASC`
  );
  const { deleteData, loading } = useDeleteData();

  const showAddDrawer = () => setAddOpen(true);
  const onCloseAdd = () => setAddOpen(false);
  const onCloseEdit = () => setEditOpen(false);

  const categories = categoryData?.items || [];
  const total = categoryData?.total || 0;

  return (
    <div className="flex flex-col p-4">
      <h1 className="mb-4">Kategoriya Ro'yxati</h1>
      <AddCategories
        addOpen={addOpen}
        showAddDrawer={showAddDrawer}
        onCloseAdd={onCloseAdd}
      />
      <EditCategories
        onCloseEdit={onCloseEdit}
        open={editOpen}
        category={editCategory}
      />
      <Table
        className="rounded-lg shadow-lg"
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (id, category) => {
              return (
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    setEditOpen(true);
                    setEditCategory(category);
                  }}
                >
                  {id}
                </span>
              );
            },
          },
          {
            title: "Nomi",
            dataIndex: "name",
          },
          {
            title: "Tavsif",
            dataIndex: "description",
          },
          {
            title: "Yaratilgan",
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
                  deleteData(`categories/${id}`, MyAuthState.token);
                }}
              >
                Delete
              </Button>
            ),
          },
        ]}
        dataSource={categories.map((category) => ({
          ...category,
          key: category.id,
        }))}
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
