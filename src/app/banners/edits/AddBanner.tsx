import useAuthStore from "@/store/MyAuthState";
import { Postdata } from "@/utils/axiosData/postdata";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Switch } from "antd";

function AddBanners({ onCloseAdd, addOpen, showAddDrawer }: any) {
  const MyAuthState = useAuthStore();

  return (
    <>
      <Button type="primary" onClick={showAddDrawer} icon={<PlusOutlined />}>
        Banner qo'shish
      </Button>
      <Drawer
        title="Yangi Banner qo'shish"
        width={500}
        onClose={onCloseAdd}
        open={addOpen}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            Postdata(`banners`, values, MyAuthState.token).then(() => {
              onCloseAdd();
            });
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

          <Form.Item label="Faol" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddBanners;
