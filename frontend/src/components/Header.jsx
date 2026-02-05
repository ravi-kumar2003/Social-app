import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/signup";

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Social App
        </Link>

        <div className="d-flex align-items-center gap-3 position-relative">
          {isAuthPage ? (
            <>
              <Link to="/" className="btn btn-outline-light me-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-warning">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Profile toggle */}
              <div
                className="d-flex align-items-center text-light cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => setShowProfile(!showProfile)}
              >
                <FaUserCircle size={28} className="me-2" />
                <span className="fw-semibold">Profile</span>
              </div>

              {/* Profile details */}
              {showProfile && (
                <div
                  className="position-absolute bg-light text-dark p-3 rounded shadow"
                  style={{
                    top: "50px",
                    right: "10px",
                    minWidth: "210px",
                    zIndex: 1000,
                  }}
                >
                  <div>
                    <strong>{user?.username}</strong>
                  </div>
                  <div> {user?.email}</div>
                </div>
              )}

              <Link to="/" className="btn btn-danger">
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
