import useGlobalStore from "@/store/my-store";
import { CategoriesTypes, OrdersTypes, StudentTypes } from "@/types";
import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";

function DeleteOrders({ setDeleteStudent, deleteStudent, studentt }: any) {
  const state = useGlobalStore();

  function DeleteStudentFn() {
    const localStudent: OrdersTypes[] | null = JSON.parse(
      localStorage.getItem("orders") || "null"
    );
    const newStudents = localStudent?.filter((i) => {
      if (i.id !== studentt.id) {
        return i;
      }
    });
    localStorage.setItem("orders", JSON.stringify(newStudents));
    useGlobalStore.setState({ orders: newStudents });
  }
  return (
    <div>
      <Button
        type="text"
        color="danger"
        variant="outlined"
        icon={<DeleteFilled />}
        onClick={() => {
          DeleteStudentFn();
        }}
      ></Button>
    </div>
  );
}

export default DeleteOrders;
