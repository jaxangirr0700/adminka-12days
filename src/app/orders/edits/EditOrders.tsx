import useAuthStore from "@/store/MyAuthState";
import { PatchtData } from "@/utils/axiosData/PatchData";
import { Button, Drawer, Form, Radio } from "antd";
import FormItem from "antd/es/form/FormItem/index.js";

function EditOrders({ item, setItem, getOrders, fetchData }: any) {
  const MyAuthState = useAuthStore();

  return (
    <>
      <Drawer
        title="Buyurtmani  o'zgartirish"
        width={500}
        onClose={() => {
          setItem();
        }}
        open={item ? true : false}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={item}
          onFinish={(values) => {
            console.log(values);

            PatchtData(
              `orders/${item.id}`,
              values,
              MyAuthState.token,
              fetchData
            );
            setItem();
          }}
        >
          <FormItem label="Status" name="status">
            <Radio.Group
              block
              options={[
                {
                  label: "Qabul qilindi",
                  value: "pending",
                },
                {
                  label: "Yetkazilmoqda",
                  value: "processing",
                },
                {
                  label: "Yetkazib berildi",
                  value: "delivered",
                },
                {
                  label: "Bekor qilindi",
                  value: "cancelled",
                },
              ]}
              defaultValue="pending"
              optionType="button"
              buttonStyle="solid"
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
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
