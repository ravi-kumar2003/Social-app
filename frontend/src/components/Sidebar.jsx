const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        flexShrink: 0,   // ✅ prevents shrinking
      }}
    >
      <h4>Social App</h4>
      <hr />

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button
            className="btn btn-outline-light w-100"
            onClick={() => setSelectedTab("posts")}
          >
            Home
          </button>
        </li>

        <li className="nav-item">
          <button
            className="btn btn-outline-light w-100"
            onClick={() => setSelectedTab("create")}
          >
            Create Post
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
