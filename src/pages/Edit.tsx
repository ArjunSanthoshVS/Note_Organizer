import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { editNote } from "../REDUX/Slices/noteSlice";
import Footer from "../components/Footer";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: noteData } = useParams<{ data?: string }>(); 
  
  const [data, setData] = useState({
    title: "",
    content: "",
    date: "",
    isImportant:false
  });
  
  useEffect(() => {
   if (noteData) {
     const decodedNoteData = decodeURIComponent(noteData);
     const note = JSON.parse(decodedNoteData);
     setData(note);
   }
  }, [noteData]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setData({ ...data, [name]: newValue });
  };
  
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(editNote(data));
    setData({ title: "", content: "", date: "" ,isImportant:false});
    alert("Updated Successfully...!");
  };
  
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>
          Edit <span className="home-note">Notes</span>
        </h2>
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
          <div className="m-4">
            <label>
              <input className="me-1"
                type="checkbox"
                name="isImportant"
                checked={data.isImportant}
                onChange={handleChange}
              />
              Mark as Important
            </label>
          </div>
          <button type="submit" className="submit p-2 px-4">
            <b>Submit</b>
          </button>
        </form>
        <button
          className="view p-2 px-4 mt-4"
          onClick={() => navigate("/view")}
        >
          <b>View all notes</b>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Edit;
