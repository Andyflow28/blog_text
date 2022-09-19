import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const CreateText = (props) => {
  const router = useRouter();

  const [text, setText] = useState({
    title: "",
    note: "",
  });

  const handleChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumit = async () => {
    await axios
      .post("/api/v1/text", text)
      .then((response) => {
        router.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={props.alert}>
      <div className="sm:w-[50vw] sm:h-[50vh] bg-white sm:rounded-xl mx-auto mt-[25vh] h-[50vh] w-full font-sans">
        <div
          className="pt-5 ml-5 fixed cursor-pointer"
          onClick={() => props.setFunction(props.value)}
        >
          <Image
            alt="icon x"
            width={"32px"}
            height="32px"
            src={"/img/close.png"}
          />
        </div>
        <div className="flex flex-col items-center justify-around h-full">
          <p className="text-5xl font-bold text-[#1f1f1f] text-center">
            Create a New Text
          </p>
          <div>
            <p className="text-gray-700 text-xl mb-3">title</p>
            <input
              type={"text"}
              name={"title"}
              className={
                "outline-none p-2 border-4 border-gray-300 text-[#1f1f1f]"
              }
              onChange={handleChange}
            />
          </div>
          <p
            onClick={() => handleSumit()}
            className="text-xl bg-[#2e6edf] font-medium text-white w-[90%] text-center rounded-lg my-2 py-5 sm:w-56 sm:hover:bg-[#2C62C1] sm:rounded-none sm:mb-5 cursor-pointer"
          >
            Create
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateText;
