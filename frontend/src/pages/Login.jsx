import React, { useState, useEffect } from "react";
//import styled from "styled-components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Validation from "./loginValidation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

/*const TealBackground = styled.div`
  padding: 10px;
`;*/

const Login = () => {
  const { login } = useAuth();

  /*const handleLogin = () => {
    // Your login logic
    login();
  };*/

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [errors, navigate, values]);

  /*const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    login();
    /*if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }*/
  };

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
      <div className="w-50 rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Login form</h2>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="enter email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              //onChange={handleInput} className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="enter password"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              //onChange={handleInput} className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
