const Login = () => {
  return (
    <div className="bg-[#2e6edf] h-[100vh] flex justify-center items-center">
      <form className="flex bg-white flex-col items-center h-[40vh] w-5/6 justify-around sm:h-[50vh] sm:w-2/6">
        <h2 className="text-xl font-bold">LOGIN TO YOUR ACCOUNT</h2>
        <div className="flex flex-col">
          <input className="px-3 py-2 bg-[#e5e8ed] mb-5" placeholder="Email" />
          <input className="px-3 py-2 bg-[#e5e8ed]" placeholder="Password" />
        </div>
        <div>
          <div className="flex items-center">
            <input type="checkbox" id="flexCheckChecked" className="w-5 h-5" />
            <label htmlFor="flexCheckChecked" className="ml-3">
              Remmenber me
            </label>
          </div>
          <p className="underline text-[#2e6edf] mt-1">
            Do you not have account?, click here
          </p>
        </div>
        <input
          type="submit"
          value="Register"
          className="py-3 px-20 bg-[#2e6edf] text-white cursor-pointer sm:hover:bg-[#2C62C1]"
        />
      </form>
    </div>
  );
};

export default Login;
