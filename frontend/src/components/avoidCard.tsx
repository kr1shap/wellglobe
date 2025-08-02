type props = {
  avoidName?: string;
  description?: string;
  symbol?: string;
};

function AvoidCard(prop: props) {
  return (
    <div className="bg-[#E9F7FF] rounded-3xl border-2 border-[#000000] p-3 flex flex-row items-center max-w-[350px] h-[80px] w-full overflow-hidden">
      {/* image div */}
      <div className="mr-2">
        <i className={`text-2xl text-[#4B7399] ${prop.symbol ?? "bi bi-question-circle-fill"}`}></i>
      </div>

      {/* description div */}
      <div className="overflow-hidden">
        <p className="text-[15px] font-bold text-black transition-colors duration-300 hover:text-[#4B7399] truncate">
          {prop.avoidName ?? "N/A"}
        </p>
        <p className="text-xs font-medium text-black transition-colors duration-300 hover:text-[#4B7399] line-clamp-2">
          {prop.description ?? "No description"}
        </p>
      </div>
    </div>
  );
}

export default AvoidCard;
