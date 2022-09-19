const Editor = (props) => {
  return (
    <div className="w-[95%] bg-white h-[45rem] mx-auto my-5 flex justify-center">
      <textarea name={props.name} rows="10" cols="50" className="w-11/12 resize-none my-5 sm:w-[97%] outline-none" value={props.value} onChange={props.handle}/>
    </div>
  );
};

export default Editor;
