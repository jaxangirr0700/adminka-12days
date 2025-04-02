import useGlobalStore from "@/store/my-store";
import { OrdersTypes, StudentTypes } from "@/types";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from "antd";
import FormItem from "antd/es/form/FormItem/index.js";

function EditOrders({
  onCloseEdit,
  editOpen,
  EditStudent,
  setEditStudent,
}: any) {
  const state = useGlobalStore();
  return (
    <>
      <Drawer
        title="Buyurtmani  o'zgartirish"
        width={500}
        onClose={onCloseEdit}
        open={editOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={<Space>{/* <Button onClick={onClose}>X</Button> */}</Space>}
        destroyOnClose
      >
        <Form
          initialValues={EditStudent}
          onFinish={(values) => {
            const localStudent = localStorage.getItem("orders");
            const realStudents = localStudent ? JSON.parse(localStudent) : [];

            const updatedStudents = realStudents.map((student: OrdersTypes) => {
              if (student.id === EditStudent.id) {
                return {
                  ...student,
                  ...values,
                };
              }
              return student;
            });
            useGlobalStore.setState({ orders: updatedStudents });
            localStorage.setItem("orders", JSON.stringify(updatedStudents));
            onCloseEdit();
          }}
        >
          <FormItem label="Status" name="status">
            <Radio.Group
              block
              options={[
                {
                  label: "Qabul qiindi",
                  value: "qabul_qilindi",
                },
                {
                  label: "Yetkazilmoqda",
                  value: "yetkazib_berilmoqda",
                },
                {
                  label: "Tugallandi",
                  value: "tugallandi",
                },
              ]}
              defaultValue="Apple"
              optionType="button"
              buttonStyle="solid"
            />
          </FormItem>
          <FormItem
            label="Manzil"
            name="address"
            rules={[{ required: true, message: "Manzil kiritilmadi!!!" }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Nechta"
            name="count"
            rules={[{ required: true, message: "Nechaligi kiritilmadi!!!" }]}
          >
            <InputNumber />
          </FormItem>
          <FormItem
            label="Mijoz"
            name="studentID"
            rules={[{ required: true, message: "Mijozni tanlang!" }]}
          >
            <Select
              options={state.students.map((g) => {
                return {
                  label: g.firstName,
                  value: g.id,
                };
              })}
            />
          </FormItem>
          <FormItem
            label="Mahsulot"
            name="productID"
            rules={[{ required: true, message: "Mahsulotni tanlang!" }]}
          >
            <Select
              options={state.products.map((g) => {
                return {
                  label: g.name,
                  value: g.id,
                };
              })}
            />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}

export default EditOrders;
