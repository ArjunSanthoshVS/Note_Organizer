import "./Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../REDUX/store/store";

const Home = () => {
  const navigate = useNavigate();
  const fullNotes = useSelector((state: RootState) => state.notes.notes);
  const notes = fullNotes.slice(0, 4);

  return (
    <>
      <Navbar />
      <div className="container d-flex align-items-center justify-content-center mt-5">
        <div>
          <h1 className="mb-4">
            <b>
              Welcome to your <span className="home-note">Note</span>{" "}
              Organiser...!
            </b>
          </h1>
          <Button className="p-2 px-4 me-2" onClick={() => navigate("/create")}>
            <b>Create a new one</b>
          </Button>
          <Button className="p-2 px-4 ms-2" onClick={() => navigate("/view")}>
            <b>View all notes</b>
          </Button>
          <b>
            <hr />
          </b>
          <h1 className="mt-5">
            <b>Here Some of your Notes.....Please do check it out....!</b>
          </h1>
          <div className="row mt-5">
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <div className="col mb-2" key={note.date}>
                  <div className="card border-3 h-100 text-start p-3">
                    <h3>{note.title}</h3>
                    <h5>{note.content}</h5>
                  </div>
                </div>
              ))
            ) : (
              <>
                <h2>There is no notes...!</h2>
                <Button
                  className="p-2 px-4 mx-auto m-3 w-auto"
                  onClick={() => navigate("/create")}
                >
                  <b>Create a new one</b>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
