import useAuthStore from "@/store/MyAuthState";
import { PatchtData } from "@/utils/axiosData/PatchData";
import { Button, Drawer, Form, Input, Select } from "antd";

function EditBanners({ onCloseEdit, open, banner, fetchData }: any) {
  const MyAuthState = useAuthStore();

  return (
    <Drawer
      title="Kategoriyani o'zgartirish"
      width={500}
      onClose={onCloseEdit}
      open={open}
      destroyOnClose
    >
      <Form
        initialValues={banner}
        onFinish={(values) => {
          const newValues = {
            title: values.title,
            imageUrl: values.imageUrl,
            isActive: values.isActive,
          };
          PatchtData(`banners/${banner.id}`, newValues, MyAuthState.token);
          fetchData();
          onCloseEdit();
        }}
      >
        <Form.Item
          label="Nomi"
          name="title"
          rules={[{ required: true, message: "Nomi kiritilmadi!!!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[{ required: true, message: "Image URL kiritilmadi!!!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Faol?"
          name="isActive"
          rules={[{ required: true, message: "Holat kiritilmadi!!!" }]}
        >
          <Select>
            <Select.Option value={true}>Faol</Select.Option>
            <Select.Option value={false}>Nofaol</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Jo'natish
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditBanners;
