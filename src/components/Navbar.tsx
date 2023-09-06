import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar d-flex px-5 p-3 mb-4">
      <div className="left my-auto">
        <h1 className="notify-logo1">
          Not<span className="notify-logo2">i</span>fy
        </h1>
      </div>
      <div className="right my-auto">
        Made by <span className="notify-logo2">Arjun</span> Santhosh
      </div>
    </div>
  );
};

export default Navbar;
