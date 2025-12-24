import './Error.css';

const Error = ({ message }) => {
  return (
    <div className="error">
      <span className="error-icon">⚠️</span>
      <p>{message}</p>
    </div>
  );
};

export default Error;
