import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import { useRouter } from "next/router";
import favicon from "../public/favicon.ico";
import Head from "next/head";

const Login = () => {
  const router = useRouter();

  //! Session utils

  const [session, setSession] = useState(undefined);

  const consultSession = async () => {
    const response = await axios.get("/api/v1/auth/login");
    setSession(response.data.status);
  };

  useEffect(() => {
    consultSession();
  }, []);

  //! End Session utils

  const sub = (
    <input
      type="submit"
      value="Login"
      className="py-3 px-20 bg-[#2e6edf] text-white sm:hover:bg-[#2C62C1]"
      disabled
    />
  );
  const no_sub = (
    <input
      type="submit"
      value="Login"
      className="py-3 px-20 bg-[#2e6edf] text-white sm:hover:bg-[#2C62C1]"
    />
  );
  const show = "bg-black/75 h-screen w-screen fixed";
  const hide = "hidden";
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(hide);
  const [error, setError] = useState(hide);
  const [submit, setSubmit] = useState(no_sub);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  //? Regsiter utils

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmit(sub);
      await axios
        .post("/api/v1/auth/login", login)
        .then((response) => {
          if (response.data.message === "login succesfully") {
            setMessage(response.data.message);
            setSubmit(no_sub);
            setAlert(show);
          } else if (response.data.message === "invalid email or password") {
            setMessage(response.data.message);
            setError(show);
          }
        })
        .catch((error) => {
          setMessage(error.message);
          setError(show);
          console.log(error);
        });
    } catch (error) {
      setMessage(error.message);
      setError(show);
      console.log(error);
    }
  };

  //? End Register utils

  if (session === false) {
    return (
      <div className="bg-[#2e6edf] h-[100vh] flex justify-center items-center font-sans">
        <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Home" />
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </Head>
        <form
          className="flex bg-white flex-col items-center h-[40vh] w-5/6 justify-around sm:h-[50vh] sm:w-2/6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold">LOGIN TO YOUR ACCOUNT</h2>
          <div className="flex flex-col">
            <input
              className="px-3 py-2 bg-[#e5e8ed] mb-5"
              placeholder="Email"
              name="email"
              type={"email"}
              onChange={handleChange}
            />
            <input
              className="px-3 py-2 bg-[#e5e8ed]"
              placeholder="Password"
              name="password"
              type={"password"}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="flexCheckChecked"
                className="w-5 h-5"
              />
              <label htmlFor="flexCheckChecked" className="ml-3">
                Remmenber me
              </label>
            </div>
            <p
              className="underline text-[#2e6edf] mt-1"
              onClick={() => router.push("/Register")}
            >
              Do you not have account?, click here
            </p>
          </div>
          {submit}
        </form>
        <Alert
          message={message}
          alert={alert}
          error={error}
          holder="Dashboard"
          redirect="/DashBoard"
          alertHolder="Try Again"
          setFunction={router.reload}
        />
      </div>
    );
  } else if (session === true) {
    router.push("DashBoard");
  } else {
    return (
      <div className="bg-white h-screen flex justify-center items-center font-sans">
        <p className="font-bold text-6xl">Loading...</p>
      </div>
    );
  }
};

export default Login;
