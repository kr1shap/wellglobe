type props = {
  warnings?: string;
};

function WarnCard(prop: props) {
  return (
    <div className="bg-[#4B7399] rounded-xl p-6 w-[600px] h-[100px] shadow-sm flex items-center text-white">
      {/* Left icon */}
      <div className="text-white text-4xl mr-4">
        <i className="bi bi-exclamation-circle"></i>
      </div>

      {/* Right text content */}
      <div className="flex flex-col">
        <p className="font-extrabold text-lg leading-tight">WARNING</p>
        <p className="italic text-base font-medium">{prop.warnings ?? "*Emergency type, what to do/avoid*"}</p>
      </div>
    </div>
  );
}

export default WarnCard;
