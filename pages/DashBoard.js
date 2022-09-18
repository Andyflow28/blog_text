import NavDash from "../components/NavDash";

const DashBoard = () => {
  let card = [];
  for (let i = 1; i <= 6; i++) {
    card.push(
      <div className="w-[194px] h-[162px] bg-white sm:m-5 my-2 mx-1 cursor-pointer" key={i}>
        <div className="p-5">
          <p className="text-4xl font-bold mb-1">Title</p>
          <div className="w-4/6 h-5 bg-[#e5e8ed] rounded-full mb-2"></div>
          <div className="w-2/6 h-5 bg-[#e5e8ed] rounded-full mb-2"></div>
          <div className="w-5/6 h-5 bg-[#e5e8ed] rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-screen">
      <NavDash />
      <h2 className="text-3xl font-bold text-[#1f1f1f] my-5 mx-5">Memo Pads</h2>
      <div className="bg-[#e5e8ed] h-5/6 w-full">
        <div className="flex flex-wrap">{card}</div>
      </div>
    </div>
  );
};

export default DashBoard;
