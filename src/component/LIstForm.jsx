/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
export default function LIstForm({ tasks, deleteTask, updateTask }) {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // تفعيل وضع التعديل
  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditValue(task.task);
  };

  // تنفيذ التعديل
  const handleUpdate = () => {
    if (editValue === "") {
      Swal.fire({
        title: 'انتباه !',
        text: 'من فضلك ادخل اسم المهمة',
        icon: 'warning',
        confirmButtonText: 'حسنا'
      })
      return;
    }
    toast.success("تم تحديث المهمة بنجاح")
    updateTask(editTaskId, editValue); // تأكد من أن الاسم متطابق
    setEditTaskId(null);
    setEditValue("");
  };

  return (
    <div>
    <ToastContainer  autoClose={1500} />
      <ul>
        {tasks.map((task) => (
          <li className="flex flex-row-reverse justify-between items-center mb-2 py-1 px-2" key={task.id}>
            {editTaskId === task.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="py-1 px-2 rounded-lg me-2 focus:outline-none w-full"
                dir='rtl'
              />
            ) : (
              task.task
            )}
            <div className="flex flex-row-reverse items-center gap-4">
              {editTaskId === task.id ? (
                <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded">
                  تحديث
                </button>
              ) : (
                <span onClick={() => handleEdit(task)} className="cursor-pointer">
                  <i className="fa-solid fa-pen-to-square hover:text-blue-500  hover:scale-125 transform transition-all duration-300 ease-in-out"></i>
                </span>
              )}
              {editTaskId !== task.id && (
                <span onClick={() => deleteTask(task.id)} className="cursor-pointer">
                  <i className="fa-solid fa-trash hover:text-red-400 hover:scale-125 transform transition-all duration-300 ease-in-out"></i>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
