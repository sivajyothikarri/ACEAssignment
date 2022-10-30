import React, { useState } from "react";
import { fetchService } from "../api";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [error, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    const err = handleValidation();
    if (Object.keys(err).length === 0) {
      // call api here
      login({ url: "/login", data: fields });
    } else {
      setErrors(err);
    }
  };

  const login = ({ url, data }: any) => {
    fetchService({ method: "POST", url, data })
      .then((res) => {
        if (res.status === 200) {
          notification.success({ message: "You are Logged In successfully" });
          sessionStorage.setItem("user", JSON.stringify(res.data.data[0]));
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        if (err) {
          notification.error({ message: err?.response?.data?.message });
        }
      });
  };

  const handleValidation = () => {
    const err: any = {};
    if (!isValidEmail(fields.email)) {
      err.email = "Enter valid email";
    }
    if (fields.password.length < 4) {
      err.password = "Password should contain at least 4 characters";
    }

    return err;
  };

  const isValidEmail = (email = "") => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const handleChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    let data = { ...fields };
    data = {
      ...data,
      [key]: value,
    };
    setFields(data);

    const dataError: any = { ...error };

    if (dataError[key]) {
      setErrors({
        ...dataError,
        [key]: "",
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="login">
      <div className="wrapper">
        <div className="text">
          <div className="body">
            <h6 className="font-old title fs20"><strong>USER LOGIN</strong></h6>

            <form>
              <div className="form-in icon">
                <label><strong>Email</strong></label>
                <div className="f-in">
                  <span className="icon-left">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    value={fields.email}
                  />
                </div>
                <span>{error.email}</span>
              </div>

              <div className="form-in icon">
                <label><strong>Password</strong></label>
                <div className="f-in">
                  <span className="icon-left">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={fields.password}
                  />
                  <div className="icon-right">
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      type="button"
                    >
                      {showPassword ? (
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      )}
                    </button>
                  </div>
                  <span>{error.password}</span>
                </div>
              </div>
            </form>

            <div className="foot">
              <div>
                <button
                  type="button"
                  className="btn single"
                  onClick={handleSubmit}
                  style={{ cursor: "pointer" }}
                ><strong>
                  SIGN IN</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
