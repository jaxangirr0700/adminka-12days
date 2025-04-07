import { ProductDataType } from "@/app/products/page";
import { UserDatatype } from "@/app/users/page";
import useGlobalStore from "@/store/my-store";
import useAuthStore from "@/store/MyAuthState";
import { useFetchData } from "@/utils/axiosData/getData";
import { Postdata } from "@/utils/axiosData/postdata";
import { getRandomID } from "@/utils/number";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  message,
} from "antd";

function AddOrders({ onClose, open, showDrawer, getOrders }: any) {
  const state = useGlobalStore();
  const MyAuthState = useAuthStore();
  const { data: productData } = useFetchData<ProductDataType>(`/products`);
  const { data: usersData } = useFetchData<UserDatatype>(`/users`);

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Buyurtma qo'shish
      </Button>
      <Drawer
        title="Yangi buyurtma qo'shish"
        width={500}
        onClose={onClose}
        open={open}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            const newOrders = {
              customerId: values.customerId,
              items: [
                {
                  productId: values.productID,
                  quantity: values.quantity,
                },
              ],
            };
            Postdata(`orders/`, newOrders, MyAuthState.token);
            getOrders();
            onClose();
          }}
        >
          <Form.Item
            label="Foydalanuvchi"
            name="customerId"
            rules={[{ required: true, message: "Manzil kiritilmadi!!!" }]}
          >
            <Select
              options={usersData?.items.map((g) => ({
                label: g.name,
                value: g.id,
              }))}
              placeholder="Mahsulotni tanlang"
            />
          </Form.Item>
          <Form.Item
            label="Mahsulot"
            name="productID"
            rules={[{ required: true, message: "Mahsulotni tanlang!" }]}
          >
            <Select
              options={productData?.items.map((g) => ({
                label: g.name,
                value: g.id,
              }))}
              placeholder="Mahsulotni tanlang"
            />
          </Form.Item>{" "}
          <Form.Item
            label="Soni"
            name="quantity"
            rules={[{ required: true, message: "Mahsulotni tanlang!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddOrders;
