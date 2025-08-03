import type { avoidance } from "../schema/avoidance";
import { motion } from "framer-motion";

type props = {
  title?: string | null;
  desc?: string | null;
  symbol?: string | null;
};

function AvoidCard(prop: props) {
  return (
    <motion.div
      className="bg-[#E9F7FF] rounded-3xl border-2 border-[#000000] p-4 flex flex-row items-start max-w-[350px] w-full overflow-hidden space-x-3 shadow-sm"
      whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
    >
      {/* icon */}
      <motion.div
        className="text-2xl text-[#4B7399] flex items-center justify-center h-full"
        style={{ minHeight: "64px" }} 
        whileHover={{ rotate: -5 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <i className={prop.symbol ?? "bi bi-question-circle-fill"}></i>
      </motion.div>

      {/* content */}
      <div className="flex flex-col overflow-hidden">
        <p className="text-[15px] font-bold text-black transition-colors duration-300 hover:text-[#4B7399] break-words">
          {prop.title ?? "N/A"}
        </p>
        <p className="text-xs font-medium text-black transition-colors duration-300 hover:text-[#4B7399] whitespace-pre-line break-words">
          {prop.desc ?? "No description"}
        </p>
      </div>
    </motion.div>
  );
}

export default AvoidCard;
