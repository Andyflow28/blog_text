import Image from "next/image";
import { useRouter } from "next/router";

const Alert = (props) => {
    const router = useRouter()
  return (
    <>
    <div className={props.alert}>
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
              {props.message}
            </p>
            <p
              onClick={() => router.push(props.redirect)}
              className="text-xl bg-[#2e6edf] font-medium text-white w-[90%] text-center rounded-lg my-2 py-5 sm:w-56 sm:hover:bg-[#2C62C1] sm:rounded-none sm:mb-5 "
            >
              Go to {props.holder}
            </p>
          </div>
        </div>
      </div>
      <div className={props.error}>
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
              {props.message}
            </p>
            <p
              onClick={() => props.setFunction(props.value)}
              className="text-xl bg-red-600 font-medium text-white w-[90%] text-center rounded-lg my-2 py-5 sm:w-56 sm:hover:bg-red-700 sm:rounded-none sm:mb-5 cursor-pointer"
            >
              {props.alertHolder}
            </p>
          </div>
        </div>
      </div>
    </>
  )
};

export default Alert;
