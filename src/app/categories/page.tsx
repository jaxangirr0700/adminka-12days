"use client";
import useAuthStore from "@/store/MyAuthState";
import { useFetchData } from "@/utils/axiosData/getData";
import { Table } from "antd";
import { useState } from "react";

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
  const pageSize = 10;

  const { data: categoryData } = useFetchData<CategoryDataType>(
    `/categories?limit=${pageSize}&page=${currentPage}&order=ASC`
  );

  const categories = categoryData?.items || [];
  const total = categoryData?.total || 0;

  return (
    <div className="flex flex-col p-4">
      <h1 className="mb-4">Kategoriya Ro'yxati</h1>
      <Table
        className="rounded-lg shadow-lg"
        columns={[
          {
            title: "ID",
            dataIndex: "id",
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
