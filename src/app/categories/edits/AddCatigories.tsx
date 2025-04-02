import useGlobalStore from "@/store/my-store";
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
  Space,
} from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox/Group.js";
import FormItem from "antd/es/form/FormItem/index.js";

function AddCategories({ onClose, open, showDrawer }: any) {
  const state = useGlobalStore();
  const optionsActive: CheckboxGroupProps<boolean>["options"] = [
    { label: "Active", value: true },
    { label: "inactive", value: false },
  ];
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Kategoriya qo'shish
      </Button>
      <Drawer
        title="Yangi Kategoriya qo'shish"
        width={500}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={<Space>{/* <Button onClick={onClose}>X</Button> */}</Space>}
        destroyOnClose
      >
        <Form
          layout="horizontal"
          onFinish={(values) => {
            const new_students = state.categories.concat({
              ...values,
              id: getRandomID(),
            });
            useGlobalStore.setState({ categories: new_students });
            localStorage.setItem("categories", JSON.stringify(new_students));
            onClose(false);
          }}
        >
          <FormItem
            label="Nomi"
            name="name"
            rules={[{ required: true, message: "Nomi kiritilmadi!!!" }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Mahsulotlar soni"
            name="productCount"
            rules={[
              { required: true, message: "Mahsulotlar soni kiritilmadi!!!" },
            ]}
          >
            <InputNumber />
          </FormItem>

          <FormItem label="Active" name="active">
            <Radio.Group
              block
              options={optionsActive}
              defaultValue="Active"
              optionType="button"
              buttonStyle="solid"
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

export default AddCategories;
