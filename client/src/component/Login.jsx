import { Formik, Field, Form } from "formik";
import Button from "react-bootstrap/Button";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  EmailOrMobile: Yup.string()
    .email("Invalid email address")
    .required("Email or phone is required"),
  Password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const [process, setProcess] = useState("Login");
  const [cred, setCred] = useState(false);
  const alter = () => {
    if (process === "Login") {
      setProcess("Sign Up");
    } else {
      setProcess("Login");
    }
  };
  const handleSubmit = async (values) => {
    if (process === "Login") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/login",
          values,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setRedirect(true);
        } else {
          setCred(true);
        }
        console.log("response=", response.status === 200);
      } catch (error) {
        console.log(error);
        setCred(true);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/signIn",
          values,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (redirect) {
    return <Navigate to={"/catalog"} />;
  }
  return (
    <div className="bg-[url('Home_Back.jpeg')] h-screen relative">
      <div className="bg-black h-full w-full md:opacity-10 absolute"></div>
      <div className="bg-[url('StreamX.svg')] bg-no-repeat h-full w-full fixed mt-5 ml-10"></div>
      <div className="flex items-center h-screen justify-center">
        <div className="h-full w-full md:h-[600px] md:w-[450px] absolute">
          <div className="md:bg-black h-full md:opacity-70 absolute w-full rounded-md"></div>
          <div className="text-white flex flex-col justify-center relative h-full px-16 py-16 top-0">
            <h1 className="text-4xl font-bold relative">{process}</h1>
            <div className="pt-10">
              <Formik
                initialValues={{
                  EmailOrMobile: "",
                  Password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, action) => {
                  console.log(values);
                  handleSubmit(values);
                  action.setSubmitting(false);
                }}
              >
                <Form className="flex flex-col gap-4">
                  <div className="relative">
                    <Field
                      id="EmailOrMobile"
                      name="EmailOrMobile"
                      placeholder=" "
                      type="email"
                      className="bg-slate-500 rounded-md h-14 w-full peer pl-6 pt-4 focus:outline-none focus:border-b-2 border-yellow-500"
                    />
                    <label
                      className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      htmlFor="EmailOrMobile"
                    >
                      Email Or Mobile
                    </label>
                  </div>
                  <div className="relative">
                    <Field
                      id="Password"
                      name="Password"
                      placeholder=" "
                      type="password"
                      className="bg-slate-500 rounded-md h-14 w-full peer pl-6 pt-4 focus:outline-none focus:border-b-2 border-yellow-500"
                    />
                    <label
                      className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      htmlFor="Password"
                    >
                      Password
                    </label>
                  </div>
                  <div>
                    <Button
                      className="w-full h-14 mt-6 bg-red"
                      variant="danger"
                      type="submit"
                    >
                      {process}
                    </Button>
                    {cred && (
                      <p className="text-red-500 mt-5">wrong credentials</p>
                    )}
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="flex gap-2 mt-12">
              <p className="text-zinc-400">New to StreamX?</p>
              <Link onClick={alter} className="no-underline text-white">
                {process === "Sign Up" ? "Login" : "Sign Up"} now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
