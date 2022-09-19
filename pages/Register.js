import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
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
      value="Register"
      className="py-3 px-20 bg-[#2e6edf] text-white sm:hover:bg-[#2C62C1]"
      disabled
    />
  );
  const no_sub = (
    <input
      type="submit"
      value="Register"
      className="py-3 px-20 bg-[#2e6edf] text-white sm:hover:bg-[#2C62C1]"
    />
  );
  const show = "bg-black/75 h-screen w-screen fixed";
  const hide = "hidden";
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(hide);
  const [error, setError] = useState(hide);
  const [submit, setSubmit] = useState(no_sub);
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  //? Regsiter utils

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmit(sub);
      await axios
        .post("/api/v1/auth/register", register)
        .then((response) => {
          if (
            response.data.message ===
            "Your account has been Registed successfully"
          ) {
            setMessage(response.data.message);
            setSubmit(no_sub);
            setAlert(show);
          } else if (
            response.data.message ===
            "the email is not valid or the password has less than 8 characters"
          ) {
            setMessage(response.data.message);
            setError(show);
          } else if (
            response.data.message ===
            "There is already an account with this email or with this user"
          ) {
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
      <div className="bg-[#2e6edf] h-[100vh] flex justify-center items-center">
        <form
          className="flex bg-white flex-col items-center h-[35vh] w-5/6 justify-around sm:h-[45vh] sm:w-2/6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold">REGISTER A NEW ACCOUNT</h2>
          <input
            className="px-3 py-2 bg-[#e5e8ed]"
            placeholder="User Name"
            name="username"
            type={"text"}
            onChange={handleChange}
          />
          <input
            className="px-3 py-2 bg-[#e5e8ed]"
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
          {submit}
        </form>
        <Alert
          message={message}
          alert={alert}
          error={error}
          redirect="/Login"
          holder="Login"
          alertHolder="Try Again"
          setFunction={router.reload}
        />
      </div>
    );
  } else if (session === true) {
    router.push("/DashBoard");
  } else {
    return (
      <div className="bg-white h-screen flex justify-center items-center">
        <p className="font-bold text-6xl">Loading...</p>
      </div>
    );
  }
};

export default Register;
