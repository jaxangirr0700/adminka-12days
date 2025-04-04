import useAuthStore from "@/store/MyAuthState";
import { PatchtData } from "@/utils/axiosData/PatchData";
import { Button, Drawer, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem/index.js";

function EditCategories({ onCloseEdit, open, category }: any) {
  const MyAuthState = useAuthStore();

  return (
    <>
      <Drawer
        title=" Kategoriyani o'zgartirish "
        width={500}
        onClose={onCloseEdit}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        destroyOnClose
      >
        <Form
          initialValues={category}
          onFinish={(values) => {
            const newValues = {
              name: values.name,
              description: values.description,
            };
            PatchtData(
              `categories/${category.id}`,
              newValues,
              MyAuthState.token
            );
          }}
        >
          <FormItem
            label="Kategoriya nomi"
            name="name"
            rules={[
              { required: true, message: "Kategoriya nomi kiritilmadi!!!" },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Tarifi"
            name="description"
            rules={[{ required: true, message: "Tarifi  kiritilmadi!!!" }]}
          >
            <Input />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">
              Submits
            </Button>
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}

export default EditCategories;
