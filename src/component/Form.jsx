import { useState, useEffect } from "react";
import LIstForm from "../component/LIstForm";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const [valueInput, setValueInput] = useState("");
  const [tasks, setTasks] = useState([]);

  // تحميل البيانات من localStorage عند فتح الصفحة
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // تحديث localStorage عند تغيير المهام
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // إضافة مهمة جديدة
  const addTask = (e) => {
    e.preventDefault();
    if (valueInput.trim() === "") {
      Swal.fire({
        title: "! انتباه",
        text: "من فضلك ادخل اسم المهمة",
        icon: "warning",
        confirmButtonText: "حسنا",
      });
      return;
    }

    const newTask = {
      id: Date.now(), // استخدام وقت الإنشاء كمعرف فريد
      task: valueInput,
      isCompleted: false,
    };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // تحديث localStorage فورًا
      return updatedTasks;
    });

    toast.success("تم إضافة المهمة بنجاح");
    setValueInput("");
  };

  // حذف مهمة
  const deleteTask = (taskID) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskID);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    toast.success("تم حذف المهمة بنجاح");
  };

  // تعديل مهمة
  const updateTask = (taskID, newTaskValue) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskID ? { ...task, task: newTaskValue } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // تحديث قيمة الإدخال
  const handleChange = (e) => {
    setValueInput(e.target.value);
  };
  <ToastContainer  autoClose={1500}/>;
  return (
    <>
      <div className="bg-gray-500 py-8">
        <div className="container px-3 mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            اضف مهمة
          </h1>
          <div className="flex items-center justify-center my-4">
            <form onSubmit={addTask}>
              <input
                className="py-1 px-2 rounded-lg ms-2 focus:outline-none"
                type="text"
                name="taskName"
                onChange={handleChange}
                value={valueInput}
                placeholder="ادخل اسم المهمة"
                dir='rtl'
              />
              <button
                className="bg-[#04AA6D] py-1 px-2 rounded-lg hover:bg-[#059862] text-white"
                type="submit"
              >
                اضف مهمة <i className="fa-solid fa-plus"></i>
              </button>
            </form>
          </div>
          <LIstForm
            tasks={tasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        </div>
      </div>
    </>
  );
}
