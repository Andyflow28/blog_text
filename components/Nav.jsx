import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Nav.module.css";
import Link from "next/link";

const Nav = () => {
  const close =
    "hidden sm:flex sm:w-[20rem] sm:items-center sm:my-5 sm:flex-row-reverse sm:mr-5";
  const open =
    "flex w-full flex-col items-center mt-8 sm:my-5 sm:flex-row-reverse sm:w-[20rem] sm:mr-5 transition-all duration-1000";
  const x = "/img/x.png";
  const list = "/img/lista.png";
  const [menu, setMenu] = useState(list);
  const [bar, setBar] = useState(close);

  return (
    <div
      className={
        "bg-white sm:flex sm:justify-between pb-5 shadow shadow-slate-300 sm:pb-0 sm:shadow-none font-sans " +
        styles.menu_fixed
      }
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center mt-5 ml-5 sm:my-5">
          <div className="flex">
            <Image
              alt={"logo"}
              width={"48px"}
              height={"48px"}
              src={"/img/writing.png"}
            />
          </div>
          <h1 className="text-xl font-bold text-[#1f1f1f] sm:text-2xl">
            NoteBlogs
          </h1>
        </div>
        <div className="mt-5">
          <div
            className="flex mr-5 cursor-pointer sm:hidden"
            onClick={() => {
              if (menu === list && bar === close) {
                setMenu(x);
                setBar(open);
              } else if (menu === x && bar === open) {
                setMenu(list);
                setBar(close);
              }
            }}
          >
            <Image alt="menu" width={"28px"} height={"28px"} src={menu} />
          </div>
        </div>
      </div>
      <div className={bar}>
        <Link href="/Login">
          <a className="text-xl bg-[#2e6edf] font-medium text-white w-[90%] text-center rounded-lg my-2 py-5 sm:w-56 sm:hover:bg-[#2C62C1]">
            Login
          </a>
        </Link>
        <Link href="/Register">
          <a className="border-[#2e6edf] border rounded-lg text-xl font-medium w-[90%] text-center my-2 py-5 text-[#2e6edf] sm:w-56 sm:text-[#444444] sm:font-normal sm:mr-10 sm:rounded-none sm:border-0 sm:hover:border-b-4 transition-all duration-100 ease-linear sm:hover:py-[12px]">
            Register
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
