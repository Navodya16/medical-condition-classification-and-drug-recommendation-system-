import React, { useState, useEffect } from "react";
//import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Validation from "./signupValidation";

/*const TealBackground = styled.div`
  padding: 10px;
`;*/

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/register", values)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  }, [errors, navigate, values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    /*if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/register", values)
        //.then((res) => console.log(res))
        .then((res) => {
          console.log(res);
          //window.location.href = "/login";
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }*/
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center bg-white">
      <div className="w-50 rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Register form</h2>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="enter email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
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

export default Register;
