"use client";
import useAuthStore from "@/store/MyAuthState";
import { useFetchData } from "@/utils/axiosData/getData";
import { PatchtData } from "@/utils/axiosData/PatchData";
import { Button, Switch, Table } from "antd";
import Image from "next/image";
import { useState } from "react";
import AddBanners from "./edits/AddBanner";
import EditBanners from "./edits/EditBanner";
import { useDeleteData } from "@/utils/axiosData/deleteData";

export type BannerType = {
  id: number;
  createdAt: string;
  imageUrl: string;
  isActive: boolean;
  title: string;
};

type BannersDataType = {
  items: BannerType[];
  message: string;
  page: number;
  total: number;
};

const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

function BannersPage() {
  const MyAuthState = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<BannerType | null>(null);

  const pageSize = 10;

  const { data: bannersData, fetchData } = useFetchData<BannersDataType>(
    `/banners?limit=${pageSize}&page=${currentPage}&order=ASC`
  );
  const { deleteData, loading } = useDeleteData();

  const banners = bannersData?.items || [];
  const total = bannersData?.total || 0;

  const showAddDrawer = () => setAddOpen(true);
  const onCloseAdd = () => setAddOpen(false);
  const onCloseEdit = () => setEditOpen(false);

  return (
    <div className="flex flex-col p-4">
      <h1 className="mb-4">Bannerlar Ro'yxati</h1>
      <AddBanners
        onCloseAdd={onCloseAdd}
        addOpen={addOpen}
        showAddDrawer={showAddDrawer}
      />
      <EditBanners
        open={editOpen}
        onCloseEdit={onCloseEdit}
        banner={editBanner}
        fetchData={fetchData}
      />
      <Table
        className="rounded-lg shadow-lg"
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (id: number, banner: BannerType) => (
              <span
                className="cursor-pointer"
                onClick={() => {
                  setEditOpen(true);
                  setEditBanner(banner);
                }}
              >
                {id}
              </span>
            ),
          },
          {
            title: "Nomi",
            dataIndex: "title",
          },
          {
            title: "Image",
            dataIndex: "imageUrl",
            render: (img: string) =>
              img && isValidUrl(img) ? (
                <Image
                  width={70}
                  height={70}
                  style={{
                    borderRadius: "10px",
                    width: "auto",
                    height: "auto",
                  }}
                  src={img}
                  alt="Banner Image"
                />
              ) : (
                <span className="w-[70px] h-[70px]">No Image</span>
              ),
          },
          {
            title: "Tavsif",
            dataIndex: "isActive",
            render: (isActive: boolean, banner: BannerType) => (
              <Switch
                onChange={() => {
                  const newBanner = {
                    title: banner.title,
                    imageUrl: banner.imageUrl,
                    isActive: !banner.isActive,
                  };
                  PatchtData(
                    `banners/${banner.id}`,
                    newBanner,
                    MyAuthState.token,
                    fetchData
                  );
                  fetchData();
                }}
                checked={isActive}
              />
            ),
          },
          {
            title: "Hosil qilingan",
            dataIndex: "createdAt",
            render: (date: string) => new Date(date).toLocaleString("ru"),
          },
          {
            title: "Delete",
            dataIndex: "id",
            render: (id: number) => (
              <Button
                danger
                onClick={async () => {
                  await deleteData(`banners/${id}`, MyAuthState.token);
                  fetchData();
                }}
              >
                Delete
              </Button>
            ),
          },
        ]}
        dataSource={banners.map((banner) => ({
          ...banner,
          key: banner.id,
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

export default BannersPage;
