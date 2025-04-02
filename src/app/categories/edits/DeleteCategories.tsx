import useGlobalStore from "@/store/my-store";
import { CategoriesTypes, StudentTypes } from "@/types";
import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";

function DeleteCategories({ setDeleteStudent, deleteStudent, studentt }: any) {
  const state = useGlobalStore();

  function DeleteStudentFn() {
    const localStudent: CategoriesTypes[] | null = JSON.parse(
      localStorage.getItem("categories") || "null"
    );
    const newStudents = localStudent?.filter((i) => {
      if (i.id !== studentt.id) {
        return i;
      }
    });
    localStorage.setItem("categories", JSON.stringify(newStudents));
    useGlobalStore.setState({ categories: newStudents });
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

export default DeleteCategories;
