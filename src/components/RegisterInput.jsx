import React, { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function RegisterInput({ register }) {
  const { value: email, handleValueChange: handleEmailChange } = useInput("");
  const { value: password, handleValueChange: handlePasswordChange } =
    useInput("");
  const {
    value: confirmPassword,
    handleValueChange: handleConfirmPasswordChange,
  } = useInput("");
  const { value: name, handleValueChange: handleNameChange } = useInput("");
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    register({ name, email, password, confirmPassword });
  };

  return (
    <form className="register-input" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        type="password"
        placeholder="Konfirmasi Password"
        autoComplete="current-password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
