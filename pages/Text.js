import NavDash from "../components/NavDash";
import Editor from "../components/Editor";
import Image from "next/image";

const Text = () => {
  return (
    <div className="bg-white h-screen">
      <NavDash />
      <div className="text-3xl font-bold text-[#1f1f1f] my-5 mx-5 flex justify-between">
        <div className="flex">
          <p>Title</p>
          <div className="ml-2 cursor-pointer">
            <Image
              alt={"icon pencil"}
              width={"24px"}
              height={"24px"}
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
              src={"/img/diskette.png"}
            />
          </div>
          <div className="ml-2 cursor-pointer mx-10">
            <Image
              alt={"icon pencil"}
              width={"24px"}
              height={"24px"}
              src={"/img/download.png"}
            />
          </div>
          <div className="ml-2 cursor-pointer mx-10">
            <Image
              alt={"icon pencil"}
              width={"24px"}
              height={"24px"}
              src={"/img/delete.png"}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#e5e8ed] h-5/6 w-full">
        <div className="flex flex-wrap">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Text;
