/* eslint-disable react/prop-types */
// import { useState } from "react";

export default function Form(props) {
  
  // const [value, setValue] = useState("");
  // const handleChange = (e) => {

  // };
  return (
    <>
    <div className="mb-4">
      <form onSubmit={props.addCourse}>
        <input className="rounded-lg me-2 focus:outline-none py-1 px-2" type="text" value={props.current} onChange={props.updateCourse} id="name" name="name" />
        <button type="submit" className="bg-green-500 px-3 py-1 rounded-lg hover:text-white font-bold transition-all duration-300 ease-in-out"> Add Course</button>
      </form>
    </div>
    </>
  )
}
