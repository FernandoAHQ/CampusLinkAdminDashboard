import React from "react";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from '../assets/logo.svg'

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();



  const loginForm = () => {
    const schema = Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    });

    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values: FormikValues) => {
          login(values.username, values.password);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          
            
            <div className="overflow-hidden flex flex-row-reverse bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex flex-col flex-1 items-center justify-center px-3.5">
            <img src={logo} className="w-4/6" alt="" />
            <a
              href="#"
              className="flex items-center mb-6 text-4xl font-NexaHeavy font-semibold text-primary-700 dark:text-white">
                CampusLink
            </a>
            </div>
            <div className="bg-primary-600 flex-1 px-3.5">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center font-Nexa leading-tight tracking-tight text-white md:text-xl dark:text-white">
                  Sign in to continue
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-Nexa text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      className="bg-gray-50 border border-gray-300 font-Nexa text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@campuslink.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-Nexa text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    <p className="error text-red-700 text-xs mt-1">
                      {errors.password &&
                        touched.password &&
                        typeof errors.password === "string" &&
                        errors.password}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-primary-50 font-NexaThin"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    {/* <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a> */}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white font-Nexa bg-primary-800 hover:bg-primary-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p> */}
                </form>
              </div>
            </div>
            </div>
        )}
      </Formik>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {loginForm()}
    </div>
  );
}

export default LoginPage;
