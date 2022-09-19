import NavDash from "../components/NavDash";
import Editor from "../components/Editor";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchAlltext } from "../slice/text";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Router from "next/router";
import { saveAs } from "file-saver";
import Alert from "../components/Alert";

const Text = () => {
  const router = useRouter();

  //* Redux utils

  const { listText: text } = useSelector((state) => state.text);

  const dispatch = useDispatch();

  const textNum = text;
  //* End Redux utils

  console.log(textNum);
  //? Consult utils

  const [num, setNum] = useState({
    id: textNum,
  });
  const [textContent, setTextContent] = useState({});

  const handleChange = (e) => {
    setTextContent({
      ...textContent,
      [e.target.name]: e.target.value,
    });
  };

  const consultText = async () => {
    const response = await axios.post("/api/v1/getText", num);
    setTextContent(response.data);
  };

  useEffect(() => {
    consultText();
  }, []);

  //? End Consult utils

  //! edit, delete, download text utils

  const update = async () => {
    await axios.put("/api/v1/getText", textContent).then(() => {
      dispatch(fetchAlltext(textNum));
      router.push("/Text");
    });
  };

  const deleteText = async () => {
    await axios.post("/api/v1/deleteText", textContent).then(() => {
      router.push("/DashBoard");
    });
  };

  const downLoadFile = () => {
    const blob = new Blob([textContent.note], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${textContent.title}.txt`);
  };

  //! End edit, delete, download text utils
  if (text !== null) {
    return (
      <div className="bg-white h-screen">
        <NavDash
          destiny={"Dashboard"}
          func={router.push}
          value={"/DashBoard"}
        />
        <div className="text-3xl font-bold text-[#1f1f1f] my-5 mx-5 flex justify-between">
          <div className="flex">
            <input
              type={"text"}
              value={textContent.title}
              className={"w-32 outline-none"}
              name={"title"}
              onChange={handleChange}
            />
            <div className="ml-2 cursor-pointer">
              <Image
                alt={"icon pencil"}
                width={"24px"}
                height={"24px"}
                onClick={() => update()}
                src={"/img/draw.png"}
              />
            </div>
          </div>
          <div className="flex">
            <div className="ml-2 cursor-pointer mx-10">
              <Image
                alt={"icon pencil"}
                width={"24px"}
                height={"24px"}
                onClick={() => update()}
                src={"/img/diskette.png"}
              />
            </div>
            <div className="ml-2 cursor-pointer mx-10">
              <Image
                alt={"icon pencil"}
                width={"24px"}
                height={"24px"}
                src={"/img/download.png"}
                onClick={() => downLoadFile()}
              />
            </div>
            <div className="ml-2 cursor-pointer mx-10">
              <Image
                alt={"icon pencil"}
                width={"24px"}
                height={"24px"}
                onClick={() => deleteText()}
                src={"/img/delete.png"}
              />
            </div>
          </div>
        </div>
        <div className="bg-[#e5e8ed] h-5/6 w-full">
          <div className="flex flex-wrap">
            <Editor
              value={textContent.note}
              handle={handleChange}
              name={"note"}
            />
          </div>
        </div>
      </div>
    );
  } else if (text === null) {
    return (
      <Alert
        message={"Error: you need to return to the Dashboard"}
        alert={"hidden"}
        error={"bg-black/75 h-screen w-screen fixed"}
        redirect="/DashBoard"
        alertHolder="Go to Dashboard"
        setFunction={router.push}
        value={"/DashBoard"}
      />
    );
  } else {
    return (
      <div className="bg-white h-screen flex justify-center items-center">
        <p className="font-bold text-6xl">Loading...</p>
      </div>
    );
  }
};

export default Text;
