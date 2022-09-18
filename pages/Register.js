import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

const Register = () => {
  const router = useRouter();

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
  const [message, setMessage] = useState("")
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
          if(response.data.message === "Your account has been Registed successfully") {
            setMessage(response.data.message)
            setSubmit(no_sub);
            setAlert(show)
          } else if(response.data.message === "the email is not valid or the password has less than 8 characters") {
            setMessage(response.data.message)
            setError(show)
          } else if(response.data.message === "There is already an account with this email or with this user") {
            setMessage(response.data.message)
            setError(show)
          }
        })
        .catch((error) => {
          setMessage(error.message)
          setError(show)
          console.log(error);
        });
    } catch (error) {
      setMessage(error.message)
      setError(show)
      console.log(error);
    }
  };

  //? End Register utils

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
      <div className={alert}>
        <div className="sm:w-[50vw] sm:h-[50vh] bg-white sm:rounded-xl mx-auto mt-[25vh] h-[50vh] w-full">
          <div className="w-full h-full flex flex-col items-center text-center justify-around">
            <div className="w-40">
              <Image
                alt="checked"
                width="220px"
                height="220px"
                src="/img/garrapata.png"
              />
            </div>
            <p className="font-bold text-2xl">
              {message}
            </p>
            <p
              onClick={() => router.push("/Login")}
              className="text-xl bg-[#2e6edf] font-medium text-white w-[90%] text-center rounded-lg my-2 py-5 sm:w-56 sm:hover:bg-[#2C62C1] sm:rounded-none sm:mb-5 "
            >
              Go to Login
            </p>
          </div>
        </div>
      </div>
      <div className={error}>
        <div className="sm:w-[50vw] sm:h-[50vh] bg-white sm:rounded-xl mx-auto mt-[25vh] h-[50vh] w-full">
          <div className="w-full h-full flex flex-col items-center text-center justify-around">
            <div className="w-40">
              <Image
                alt="checked"
                width="220px"
                height="220px"
                src="/img/g.png"
              />
            </div>
            <p className="font-bold text-2xl">
              {message}
            </p>
            <p
              onClick={() => router.reload()}
              className="text-xl bg-red-600 font-medium text-white w-[90%] text-center rounded-lg my-2 py-5 sm:w-56 sm:hover:bg-red-700 sm:rounded-none sm:mb-5 "
            >
              Try again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
