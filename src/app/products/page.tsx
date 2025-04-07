"use client";
import useAuthStore from "@/store/MyAuthState";
import { useFetchData } from "@/utils/axiosData/getData";
import { Button, Pagination, Table } from "antd";
import Image from "next/image";
import { useState } from "react";
import AddProduct, { CategoryDataType } from "./edits/AddProduct";
import EditProduct from "./edits/EditProduct";
import { useDeleteData } from "@/utils/axiosData/deleteData";

export type ProductType = {
  categoryId: number;
  createdAt: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
};

export type ProductDataType = {
  items: ProductType[];
  message: string;
  total: number;
};

function ProductPage() {
  const MyAuthState = useAuthStore();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { data: productData } = useFetchData<ProductDataType>(
    `/products?page=${currentPage}&limit=${pageSize}`
  );
  const products = productData?.items || [];
  const { data: categoryData } = useFetchData<CategoryDataType>(`/categories`);
  const categories = categoryData?.items || [];
  const total = productData?.total || 0;
  const { deleteData, loading } = useDeleteData();

  const showAddDrawer = () => setAddOpen(true);
  const onCloseAdd = () => setAddOpen(false);
  const onCloseEdit = () => setEditOpen(false);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="flex flex-col  p-4">
      <div className="flex gap-2 items-center justify-center mb-4">
        <Button>Umumiy Mahsulotlar: {total}</Button>
      </div>
      <AddProduct
        onClose={onCloseAdd}
        open={addOpen}
        showDrawer={showAddDrawer}
      />
      <EditProduct
        categories={[]}
        onCloseEdit={onCloseEdit}
        open={editOpen}
        product={editProduct}
      />
      <div style={{ overflowX: "auto" }}>
        <Table
          className="rounded-lg shadow-lg"
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              render: (id, product) => (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setEditOpen(true);
                    setEditProduct(product);
                  }}
                >
                  {id}
                </span>
              ),
            },
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Description",
              dataIndex: "description",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (price: number) => `$${price.toFixed(2)}`,
            },
            {
              title: "Stock",
              dataIndex: "stock",
            },
            {
              title: "Image",
              dataIndex: "imageUrl",
              render: (img: string) =>
                img && isValidUrl(img) ? (
                  <Image
                    width={70}
                    height={70}
                    style={{ borderRadius: "10px" }}
                    src={img}
                    alt="Product Image"
                  />
                ) : (
                  <span className="w-[70px] h-[70px]">No Image</span>
                ),
            },
            {
              title: "Created At",
              dataIndex: "createdAt",
              render: (date) => new Date(date).toLocaleString("ru"),
            },

            {
              title: "Categorie",
              dataIndex: "categoryId",
              render: (categoryId) => {
                const category = categories.find((f) => categoryId === f.id);
                return category ? category.name : "Topilmadi";
              },
            },

            {
              title: "Delete",
              dataIndex: "id",
              render: (id) => (
                <Button
                  danger
                  onClick={() =>
                    deleteData(`products/${id}`, MyAuthState.token)
                  }
                >
                  Delete
                </Button>
              ),
            },
          ]}
          dataSource={products.map((product) => ({
            ...product,
            key: product.id,
          }))}
          pagination={false}
          scroll={{ x: true }}
        />
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 20, textAlign: "right" }}
      />
    </div>
  );
}

export default ProductPage;
