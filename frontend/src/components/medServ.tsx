type props = {
  number?: string;
};

function EmerMedCard(prop: props) {
  return (
    <div className="bg-[#E9F7FF] rounded-xl border-[3px] border-[#000000] p-6 w-[800px] h-[300px] shadow-sm">
      {/* Title aligned top-left */}
      <p className="text-s font-bold text-[#000055] mb-4">
        Emergency Medical Services
      </p>

      {/* All 3 icons side-by-side */}
      <div className="flex flex-row justify-around items-center">
        {/* Fire */}
        <div className="flex flex-col items-center text-center">
          <i className="bi bi-fire text-[80px] text-[#27005D] mb-1"></i>
          <p className="text-xs font-semibold text-black mb-1">Fire</p>
          <p className="text-3xl font-extrabold text-black">{prop.number ?? "911"}</p>
        </div>

        {/* Ambulance */}
        <div className="flex flex-col items-center text-center">
          <i className="bi bi-hospital text-[80px] text-[#27005D] mb-1"></i>
          <p className="text-xs font-semibold text-black mb-1">Ambulance</p>
          <p className="text-3xl font-extrabold text-black">{prop.number ?? "911"}</p>
        </div>

        {/* Police */}
        <div className="flex flex-col items-center text-center">
          <i className="bi bi-shield-shaded text-[80px] text-[#27005D] mb-1"></i>
          <p className="text-xs font-semibold text-black mb-1">Police</p>
          <p className="text-3xl font-extrabold text-black">{prop.number ?? "911"}</p>
        </div>
      </div>
    </div>
  );
}

export default EmerMedCard;
