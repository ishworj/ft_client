import { useState } from "react";
import { Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const CustomInput = ({ label, type, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group className="mb-3 position-relative">
      <Form.Label>{label}</Form.Label>
      <div className="d-flex align-items-center position-relative">
        <Form.Control
          {...rest}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
        />
        {type === "password" && (
          <span
            className="position-absolute end-0 me-2 cursor-pointer"
            onClick={togglePassword}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? (
              <FaEyeSlash className="text-dark" />
            ) : (
              <FaEye className="text-dark" />
            )}
          </span>
        )}
      </div>
    </Form.Group>
  );
};

export default CustomInput;
