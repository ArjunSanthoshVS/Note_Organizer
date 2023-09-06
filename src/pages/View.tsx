import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../REDUX/store/store";
import { deleteNote } from "../REDUX/Slices/noteSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const View = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notesPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const handleDelete = (note: any) => {
    const date = note?.date;
    const alert = window.confirm("Are you sure...?");
    if (alert) dispatch(deleteNote(date));
  };

  const handleEdit = (note: any) => {
    const dataToPass = JSON.stringify(note);
    navigate(`/edit/${dataToPass}`);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className="container content-container">
        <h1 className="m-5">
          Your <span className="home-note">Notes</span>...!
        </h1>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Search notes..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="row text-start">
          {currentNotes && currentNotes.length > 0 ? (
            currentNotes.map((note) => (
              <div className="col" key={note?.date}>
                <div className="card m-3 p-4 pb-2 border-4">
                  <h2 className="title">{note?.title}</h2>
                  <h4 className="content">{note?.content}</h4>
                  <div className="mx-auto mt-3">
                    <button
                      className="btn btn-primary m-2 px-3"
                      onClick={() => handleEdit(note)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger m-2 px-3"
                      onClick={() => handleDelete(note)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <h2 className="text-center">There are no notes...!</h2>
              <button
                className="create p-2 px-4 mx-auto m-3 w-auto"
                onClick={() => navigate("/create")}
              >
                <b>Create a new one</b>
              </button>
            </>
          )}
        </div>
        <div className="d-flex justify-content-center mt-5">
          {notes.length > notesPerPage && (
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(filteredNotes.length / notesPerPage),
              }).map((item, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default View;
