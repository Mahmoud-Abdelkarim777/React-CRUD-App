/* eslint-disable react/prop-types */

import { useRef, useState } from "react";

export default function List(props) {
  const course = props.course;
  const [state, setState] = useState({
    isEditing: false,
  });
  const inputRef = useRef(null);

  // delete
  function renderDelete() {
    return (
      <li className="flex items-center justify-between">
        <span className="font-semibold">{course.title}</span>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => {
              toggleEdit();
            }}
          >
            <i className="fa-solid fa-pen-to-square transition-all duration-300 ease-in-out transform hover:text-green-600 hover:scale-125 "></i>
          </button>
          <button onClick={() => props.deleteCourse(props.id)}>
            <i className="fa-solid fa-trash hover:text-red-500 transform hover:scale-125 transition-all duration-300 ease-in-out"></i>
          </button>
        </div>
      </li>
    );
  }

  // toggle state
  function toggleEdit() {
    setState({ ...state, isEditing: !state.isEditing });
  }

  // edit
  const updateCourseItem = (e) => {
    e.preventDefault();
    props.editCourse(course.id, inputRef.current.value);
    toggleEdit();
  };
  function renderEdit() {
    return (
      <form onSubmit={updateCourseItem} className="mb-2">
        <input type="text" ref={inputRef} defaultValue={course.title} className="py-1 rounded-lg focus:outline-none px-2"/>
        <button className="ms-2 transition-all duration-300 ease-in-out transform bg-green-500 hover:scale-125 hover:text-white font-semibold px-3 py-1 rounded-lg">
          Update
        </button>
      </form>
    );
  }

  return <>{state.isEditing ? renderEdit() : renderDelete()}</>;
}
