import { useState } from "react";
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
  const [currentFilter, setCurrentFilter] = useState("All"); // Added state for filter

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter notes based on the current filter
  const filteredNotesByFilter = filteredNotes.filter((note) => {
    if (currentFilter === "All") {
      return true;
    } else if (currentFilter === "Normal") {
      return !note.isImportant;
    } else {
      return note.isImportant;
    }
  });

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotesByFilter.slice(
    indexOfFirstNote,
    indexOfLastNote
  );

  const handleDelete = (note: any) => {
    const date = note?.date;
    const alert = window.confirm("Are you sure...?");
    if (alert) dispatch(deleteNote(date));
  };

  const handleEdit = (note: any) => {
    const dataToPass = encodeURIComponent(JSON.stringify(note));
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
        <div className="row mb-3">
          <div className="col-12 col-md-4 order-md-last mb-3">
            <button
              className={`category mx-2 px-3 p-1 ${
                currentFilter === "All" ? "active" : ""
              }`}
              onClick={() => setCurrentFilter("All")}
            >
              All
            </button>
            <button
              className={`category mx-2 px-3 p-1 ${
                currentFilter === "Normal" ? "active" : ""
              }`}
              onClick={() => setCurrentFilter("Normal")}
            >
              Normal
            </button>
            <button
              className={`category mx-2 px-3 p-1 ${
                currentFilter === "Important" ? "active" : ""
              }`}
              onClick={() => setCurrentFilter("Important")}
            >
              Important
            </button>
          </div>
          <div className="col-12 col-md-8 mb-3">
            <input
              type="text"
              placeholder="Search notes..."
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="row text-start">
          {currentNotes && currentNotes.length > 0 ? (
            currentNotes.map((note) => (
              <div className="col" key={note?.date}>
                <div className="card m-3 p-4 pb-2 border-4">
                  <h2 className="title">{note?.title}</h2>
                  <h4 className="content">{note?.content}</h4>
                  <footer className="bg-light px-3 p-2 d-flex justify-content-between">
                    {note.isImportant ? (
                      <h6 className="text-danger">Important</h6>
                    ) : (
                      <h6> </h6>
                    )}
                    {note.date}
                  </footer>
                  <div className="mx-auto mt-2">
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
                length: Math.ceil(filteredNotesByFilter.length / notesPerPage),
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
      <Footer />
    </>
  );
};

export default View;
