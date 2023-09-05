import { useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNote } from "../REDUX/Slices/noteSlice";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    title: "",
    content: "",
    date: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    const date = Date().toString();
    setData({ ...data, date: date, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(addNote(data));
    setData({ title: "", content: "", date: "" });
    alert("Note created Successfully...!");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Create Notes</h2>
        <form onSubmit={handleSubmit}>
          <div className="m-4">
            <label htmlFor="title">Title:</label>
            <input
              className="form-control w-50 mx-auto border-4"
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="m-4">
            <label htmlFor="content">Content:</label>
            <input
              className="form-control w-50 mx-auto border-4"
              type="text"
              id="content"
              name="content"
              value={data.content}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <b>Submit</b>
          </button>
        </form>
        <Button className="p-2 px-4 mt-4" onClick={() => navigate("/view")}>
          <b>View all notes</b>
        </Button>
      </div>
    </>
  );
};

export default Create;
