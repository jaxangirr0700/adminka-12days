import useGlobalStore from "@/store/my-store";
import { getRandomID } from "@/utils/number";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, InputNumber, Radio, Select } from "antd";

function AddOrders({ onClose, open, showDrawer }: any) {
  const state = useGlobalStore();

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
          onFinish={(values) => {
            const new_orders = state.orders.concat({
              ...values,
              id: getRandomID(),
            });
            useGlobalStore.setState({ orders: new_orders });
            localStorage.setItem("orders", JSON.stringify(new_orders));
            onClose();
          }}
        >
          <Form.Item label="Status" name="status">
            <Radio.Group
              options={[
                { label: "Qabul qilindi", value: "qabul_qilindi" },
                { label: "Yetkazilmoqda", value: "yetkazib_berilmoqda" },
                { label: "Tugallandi", value: "tugallandi" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item
            label="Manzil"
            name="address"
            rules={[{ required: true, message: "Manzil kiritilmadi!!!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nechta"
            name="count"
            rules={[{ required: true, message: "Nechaligi kiritilmadi!!!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Mijoz"
            name="studentID"
            rules={[{ required: true, message: "Mijozni tanlang!" }]}
          >
            <Select
              options={state.students.map((g) => ({
                label: g.firstName,
                value: g.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Mahsulot"
            name="productID"
            rules={[{ required: true, message: "Mahsulotni tanlang!" }]}
          >
            <Select
              options={state.products.map((g) => ({
                label: g.name,
                value: g.id,
              }))}
            />
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
