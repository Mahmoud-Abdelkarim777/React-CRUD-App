import "./App.css";
import Form from "../src/component/Form";
import List from "../src/component/List";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [courses, setCourses] = useState({
    courses: [
      { id: 1, title: "HTML" },
      { id: 2, title: "CSS" },
      { id: 3, title: "JavaScript" },
    ],
    current: "",
  });
  // delete course
  const deleteCourse = (id) => {
    const updatedCourses = courses.courses.filter((course) => course.id !== id);
    toast.success("Course deleted successfully");
    setCourses({ ...courses, courses: updatedCourses });
  };
  // edit course
  const editCourse = (id, value) => {
    const updatedCourses = courses.courses.map((course) =>
      course.id === id ? { ...course, title: value } : course
    );
    toast.success("Course updated successfully");
    setCourses({ ...courses, courses: updatedCourses });
  };

  const courselist = courses.courses.map((course) => {
    return (
      <List
        key={course.id}
        id={course.id}
        course={course}
        deleteCourse={deleteCourse}
        editCourse={editCourse}
      />
    );
  });

  // update courses
  const updateCourse = (e) => {
    setCourses({ ...courses, current: e.target.value });
  };

  // add new course
  const addCourse = (e) => {
    e.preventDefault();
    if (courses.current.trim() === "")
      return toast.error("Please enter a course name"), false;

    const newCourse = {
      id: courses.courses.length + 1,

      title: courses.current,
    };

    toast.success("Added successfully 😊");
    setCourses({
      courses: [...courses.courses, newCourse],
      current: "",
    });
  };

  return (
    <>
      <div className="container px-3 mx-auto bg-gray-300 text-center py-4">
        <ToastContainer position="top-left" autoClose={1500} closeOnClick />
        <h2 className="text-2xl md:text-4xl font-semibold mb-2">Add Course</h2>
        <Form
          updateCourse={updateCourse}
          addCourse={addCourse}
          current={courses.current}
        />
        {courses.courses.length > 0 ? (
          <ul>{courselist}</ul>
        ) : (
          <p className="text-gray-500 text-center mt-4">No items available</p>
        )}
        {/* <ul>{courselist}</ul> */}
      </div>
    </>
  );
}

export default App;
