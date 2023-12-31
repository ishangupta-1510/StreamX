import { Formik, Field, Form } from "formik";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  EmailOrPhone: Yup.string()
    .email("Invalid email address")
    .required("Email or phone is required"),
  Password: Yup.string().required("Password is required"),
});

const Login = () => {
  return (
    <div className="bg-[url('Home_Back.jpeg')] h-screen relative">
      <div className="bg-black h-full w-full md:opacity-10 absolute"></div>
      <div className="bg-[url('StreamX.svg')] bg-no-repeat h-full w-full fixed mt-5 ml-10"></div>
      <div className="flex items-center h-screen justify-center">
        <div className="h-full w-full md:h-[600px] md:w-[450px] absolute">
          <div className="md:bg-black h-full md:opacity-70 absolute w-full rounded-md"></div>
          <div className="text-white flex flex-col justify-center relative h-full px-16 py-16 top-0">
            <h1 className="text-4xl font-bold relative">Sign In</h1>
            <div className="pt-10">
              <Formik
                initialValues={{
                  EmailOrPhone: "",
                  Password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, action) => {
                  console.log(values);
                  action.setSubmitting(false);
                }}
              >
                <Form className="flex flex-col gap-4">
                  <div className="relative">
                    <Field
                      id="EmailOrPhone"
                      name="EmailOrPhone"
                      placeholder=" "
                      type="email"
                      className="bg-slate-500 rounded-md h-14 w-full peer pl-6 pt-4 focus:outline-none focus:border-b-2 border-yellow-500"
                    />
                    <label
                      className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      htmlFor="EmailOrPhone"
                    >
                      Email Or Phone
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
                      Sign In
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="flex gap-2 mt-12">
              <p className="text-zinc-400">New to StreamX?</p>
              <Link className="no-underline text-white" to="/SignUp">
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
