import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Register.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = (props) => {
  return (
    <div className="register field">
      <label className="register label">{props.label}</label>
      <input
        type={props.type || "text"} // Allows specifying input type (e.g., for passwords)
        className="register input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      await api.post("/users/register", requestBody);

      // Registration successfully worked --> navigate to the login page
      navigate("/login");
    } catch (error) {
      alert(
        `Something went wrong during the registration: \n${handleError(error)}`
      );
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <BaseContainer>
      <div className="register container">

        <div className="register form">

          <Button onClick={() => navigate("/login")} style={{ marginBottom: '20px' }}>Back to Login</Button>


          <FormField
            label="Username"
            placeholder="Enter username..."
            value={username}
            onChange={setUsername}
          />
          
          <FormField
            label="Password"
            type="password" // Specify the input type as password
            placeholder="Enter password..."
            value={password}
            onChange={setPassword}
          />
          <div className="register button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={doRegister}
            >
              Register
            </Button>
          </div>

        </div>
      </div>
    </BaseContainer>
  );
};

export default Register;
