import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const success = await dispatch(login(values.email, values.password));
      if (success) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    },
  });

  return (
    <section className="vh-100">
    <div className="container-fluid">
      <div className="row">
      <div className="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="./images/1.jpeg"
            alt="Login image"
            className="w-100 vh-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>
        <div className="col-sm-6 text-black">
          <div className="px-5 ms-xl-4">
            <i
              className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
              style={{ color: "#709085" }}
            ></i>
            <span className="h1 fw-bold mb-0">Real TIme Note Manager</span>
          </div>

          <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
            <div className="container">
             
            <form onSubmit={formik.handleSubmit}>
                  <div className="form-group mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-lg btn-block mb-4"
                  >
                    Login
                  </button>
                  <div className="text-center">
                    <p>sign up with:</p>
                   <a href="/register"> Register</a>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Login;

