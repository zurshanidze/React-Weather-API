import "./toggle-mode.css";

const ToggleMode = ({ onChange, darkMode }) => {
  return (
    <div
      className={`${darkMode ? "toggle-wrapper" : "toggle-wrapper dark"}`}
      onClick={onChange}
    >
      <div
        className={`${darkMode ? "toggle-circle" : "toggle-circle dark"}`}
      ></div>
    </div>
  );
};

export default ToggleMode;
