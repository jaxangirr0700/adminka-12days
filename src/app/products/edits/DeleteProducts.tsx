import useGlobalStore from "@/store/my-store";
import { ProductTypes, StudentTypes } from "@/types";
import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";

function DeleteProducts({ setDeleteStudent, deleteStudent, studentt }: any) {
  const state = useGlobalStore();
  function DeleteStudentFn() {
    const localStudent: ProductTypes[] | null = JSON.parse(
      localStorage.getItem("products") || "null"
    );
    const newStudents = localStudent?.filter((i) => {
      if (i.id !== studentt.id) {
        return i;
      }
    });
    localStorage.setItem("products", JSON.stringify(newStudents));
    useGlobalStore.setState({ products: newStudents });
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

export default DeleteProducts;
