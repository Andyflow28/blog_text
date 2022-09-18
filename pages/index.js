import Head from "next/head";
import Nav from "../components/Nav";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
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

  if (session === false) {
    return (
      <div>
        <Head>
          <title>NoteBlogs</title>
        </Head>

        <div>
          <Nav />
          <div className="flex mt-20 sm:justify-between">
            <div className="mt-20 mx-5">
              <h2 className="text-2xl font-medium w-48 mb-5 sm:text-6xl sm:w-4/6 sm:mb-20">
                lorem ipsu <br /> lorem and more lorem lorem lorem
              </h2>
              <p className="w-48 text-[#444444] font-medium sm:text-xl sm:w-3/6">
                Lorem ipsum dolor{" "}
                <span className="text-[#2e6edf] font-medium sm:text-xl sm:w-3/6">
                  sit amet, consectetur adipiscing elit. Nullam{" "}
                </span>
                semper porttitor suscipit. Integer ac tincidunt velit. Sed
                ultricies.
              </p>
            </div>
            <div className="w-5/6 mt-20 mr-2 sm:w-2/6 sm:mr-40">
              <Image
                alt={"plum"}
                width={"1068px"}
                height={"1151px"}
                src={"/img/writing_.png"}
              />
            </div>
          </div>
          <div className="my-20 flex flex-col items-center sm:items-start sm:ml-10">
            <a
              href="/Login"
              className="text-xl bg-[#2e6edf] font-medium text-white w-[90%] text-center rounded-lg my-2 py-5 sm:w-56 sm:hover:bg-[#2C62C1] sm:rounded-none sm:mb-5 "
            >
              Login
            </a>
            <div className="text-center sm:flex">
              <p className="text-[#444444]">Do you not have a account?</p>
              <a href="/Register" className="text-[#2e6edf] sm:ml-2">
                Resgister Now
              </a>
            </div>
          </div>
        </div>
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
}
