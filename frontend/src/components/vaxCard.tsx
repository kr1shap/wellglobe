import { motion } from "framer-motion";

type props = {
  avoidName?: string;
  description?: string;
  url?: string;
};

function VaxCard(prop: props) {
  return (
    <motion.div
      className="bg-[#E9F7FF] rounded-3xl border-2 border-[#000000] p-5 flex flex-row items-center max-w-[350px] h-[80px] w-full overflow-hidden gap-2 shadow-sm"
      whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
    >
      {/* bootstrap icon */}
      <motion.div
        className="mr-2 text-2xl text-[#4B7399] flex items-center justify-center"
        whileHover={{ rotate: -5 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <i className="bi bi-capsule-pill"></i>
      </motion.div>

      {/* content */}
      <div className="overflow-hidden">
        <a
          href={
            prop.url ?? "https://www.cdc.gov/vaccines/by-disease/index.html"
          }
        >
          <p className="text-[15px] font-bold text-black transition-colors duration-300 hover:text-[#223c54] truncate">
            {prop.avoidName ?? "No Vaccine Name"}
          </p>
        </a>
        <p className="text-xs font-medium text-black transition-colors duration-300 hover:text-[#5b85b9] line-clamp-2">
          {prop.description ?? "No description"}
        </p>
      </div>
    </motion.div>
  );
}

export default VaxCard;
