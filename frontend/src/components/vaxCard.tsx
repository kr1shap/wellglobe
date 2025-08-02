type props = {
  vaxName?: String;
  description?: String;
};

function VaxCard(prop: props) {
  return (
    <div className="bg-blue-200/80 rounded-3xl border-2 border-blue-950 p-3 flex flex-row items-center max-w-[350px] h-[80px] w-full overflow-hidden">
      {/* image div */}
      <div className="mr-2">
        <i className="bi bi-capsule"></i>
      </div>

      {/* description div */}
      <div className="overflow-hidden">
        <p className="text-[15px] font-bold transition-colors duration-300 hover:text-blue-700 truncate">
          {prop.vaxName ?? "No vax name"}
        </p>
        <p className="text-xs font-medium transition-colors duration-300 hover:text-blue-900 line-clamp-2">
          {prop.description ?? "No description"}
        </p>
      </div>
    </div>
  );
}

export default VaxCard;
