import NavDash from "../components/NavDash";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateText from "../components/CreateText";
import { useRouter } from "next/router";
import Image from "next/image";

const DashBoard = () => {
  const router = useRouter();
  const show = "bg-black/75 h-screen w-screen fixed";
  const hide = "hidden";
  const [create, setCreate] = useState(hide);

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

  //todo Titles

  const [notes, setNotes] = useState({});

  const consultNotes = async (req, res) => {
    const response = await axios.get("/api/v1/text");
    setNotes(response.data);
  };

  useEffect(() => {
    consultNotes()
  }, [])

  //todo end Titles

  if (session === true) {
    return (
      <div className="flex">
        <div className="bg-white h-screen">
          <NavDash />
          <div className="flex items-center">
            <h2 className="text-3xl font-bold text-[#1f1f1f] my-5 mx-5">
              Memo Pads
            </h2>
            <div
              className="flex cursor-pointer"
              onClick={() => setCreate(show)}
            >
              <Image
                alt="icon plus"
                width="32px"
                height={"32px"}
                src={"/img/add.png"}
              />
            </div>
          </div>
          <div className="bg-[#e5e8ed] h-5/6 w-screen">
            <div className="flex flex-wrap">
              {notes[0] !== undefined ? (
                notes.map((item) => (
                  <div
                    className="w-[194px] h-[162px] bg-white sm:m-5 my-2 mx-1 cursor-pointer"
                    key={item.notes_id}
                  >
                    <div className="p-5">
                      <p className="text-4xl font-bold mb-1">{item.title}</p>
                      <div className="w-4/6 h-5 bg-[#e5e8ed] rounded-full mb-2"></div>
                      <div className="w-2/6 h-5 bg-[#e5e8ed] rounded-full mb-2"></div>
                      <div className="w-5/6 h-5 bg-[#e5e8ed] rounded-full"></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 font-bold text-5xl text-center w-full my-[25%]">You dont have Texts</div>
              )}
            </div>
          </div>
        </div>
        <CreateText alert={create} value={hide} setFunction={setCreate} />
      </div>
    );
  } else if (session === false) {
    router.push("/");
  } else {
    return (
      <div className="bg-white h-screen flex justify-center items-center">
        <p className="font-bold text-6xl">Loading...</p>
      </div>
    );
  }
};

export default DashBoard;
