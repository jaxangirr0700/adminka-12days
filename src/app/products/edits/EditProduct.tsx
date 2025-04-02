import useAuthStore from "@/store/MyAuthState";
import { Button, Drawer, Form, Input, InputNumber, Radio, Select } from "antd";
import axios from "axios";
import { ProductType } from "../page";

function EditProduct({
  product,
  onCloseEdit,
  open,
  categories,
}: {
  product: ProductType | null;
  onCloseEdit: () => void;
  open: boolean;
  categories: { id: number; name: string }[];
}) {
  const MyAuthState = useAuthStore();

  const initialValues = product
    ? { ...product, imageUrl: "" }
    : {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: undefined,
        imageUrl: "",
      };

  return (
    <Drawer
      title="Mahsulotni o'zgartirish"
      width={500}
      onClose={onCloseEdit}
      open={open}
      destroyOnClose
    >
      <Form
        initialValues={initialValues}
        onFinish={(values: ProductType) => {
          if (product) {
            axios
              .patch(
                `https://nt.softly.uz/api/products/${product.id}`,
                { ...values, categoryId: values.categoryId }, // Match API expected structure
                {
                  headers: {
                    Authorization: `Bearer ${MyAuthState.token}`,
                  },
                }
              )
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error updating product:", error);
              });
          }
          onCloseEdit();
        }}
      >
        <Form.Item
          label="Mahsulot nomi"
          name="name"
          rules={[{ required: true, message: "Mahsulot nomi kiritilmadi!!!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mahsulot ta'rifi"
          name="description"
          rules={[
            { required: true, message: "Mahsulot ta'rifi kiritilmadi!!!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mahsulot narxi"
          name="price"
          rules={[{ required: true, message: "Mahsulot narxi kiritilmadi!!!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Omborda mavjudlik"
          name="stock"
          rules={[
            {
              required: true,
              message: "Omborda mahsulot mavjudligini kiriting!!!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Kategoriyasining nomi"
          name="categoryId"
          rules={[{ required: true, message: "Kategoriyani tanlang!" }]}
        >
          <Select
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </Form.Item>

        <Form.Item label="Rasm URL" name="imageUrl">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditProduct;
