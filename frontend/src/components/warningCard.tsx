import type { advisory } from "../schema/advisory";

type props = {
  advisory?: advisory | null;
};

function WarnCard(prop: props) {
  //based on level, use a specfic symbol
  const getSymbol = (level: number) => {
    if (level == 0) {
      return "bi bi-check-circle";
    }
    if (level == 2 || level == 1) {
      return "bi bi-exclamation-circle";
    }
    return "bi bi-dash-circle";
  };

  return (
    <div className="bg-[#1a67af] rounded-xl p-6 w-full max-w-[700px] shadow-sm flex flex-row items-start text-white mb-10">
      <div className="text-white text-4xl mr-4">
        <i className={getSymbol(prop.advisory?.danger_number ?? 0)}></i>
      </div>

      <div className="flex flex-col">
        <p className="font-extrabold text-lg leading-tight">
          {prop.advisory?.danger_level ?? "No warning to display."}
        </p>
        <p className="italic text-base font-medium break-words whitespace-pre-line">
          {prop.advisory?.summary ?? "No advisory to display."}
        </p>
      </div>
    </div>
  );
}

export default WarnCard;
