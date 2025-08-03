import type { EmergencyNumbers } from "../schema/emergency";
import { motion } from "framer-motion";

type props = {
  emerg?: EmergencyNumbers;
};

function EmerMedCard(prop: props) {
  if (!prop.emerg) {
    return <p>No emergency info available</p>;
  }

  return (
    <motion.div
      className="w-[400px] max-w-full sm:w-[800px] p-4 sm:p-6 min-h-[300px] bg-[#E9F7FF] rounded-xl border-[3px] border-black shadow-sm"
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {/* Title */}
      <p className="text-s font-bold text-[#000055] mb-6 text-center">
        Emergency Medical Services
      </p>

      {/* Icon section */}
      <div className="flex flex-wrap justify-evenly gap-8 items-center">
        {/* fire */}
        <motion.div
          className="flex flex-col items-center text-center cursor-pointer"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <i className="bi bi-fire text-[60px] sm:text-[80px] text-[#27005D] mb-1 transition-all"></i>
          <p className="text-xs font-semibold text-black mb-1">Fire</p>
          <p className="text-3xl font-extrabold text-black">
            {prop.emerg.fire[0] ?? "911"}
          </p>
        </motion.div>

        {/* ambulance */}
        <motion.div
          className="flex flex-col items-center text-center cursor-pointer"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <i className="bi bi-hospital text-[60px] sm:text-[80px] text-[#27005D] mb-1 transition-all"></i>
          <p className="text-xs font-semibold text-black mb-1">Ambulance</p>
          <p className="text-3xl font-extrabold text-black">
            {prop.emerg.ambulance[0] ?? "911"}
          </p>
        </motion.div>

        {/* police */}
        <motion.div
          className="flex flex-col items-center text-center cursor-pointer"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <i className="bi bi-shield-shaded text-[60px] sm:text-[80px] text-[#27005D] mb-1 transition-all"></i>
          <p className="text-xs font-semibold text-black mb-1">Police</p>
          <p className="text-3xl font-extrabold text-black">
            {prop.emerg.police[0] ?? "911"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default EmerMedCard;
