import { motion } from "framer-motion";
import IconButton from "./iconButton";

function CheckList() {
  return (
    <motion.div
      className="w-[400px] max-w-full sm:w-[800px] p-4 sm:p-6 min-h-[300px] bg-[#E9F7FF] rounded-xl border-[3px] border-black shadow-sm"
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <p className="text-2xl text-blue-950 font-bold">
        Essentials for your trip...
      </p>
      <div className="flex flex-row justify-evenly">
        <IconButton
          filledSymbol="bi-file-earmark-medical-fill"
          outlinedSymbol="bi-file-earmark-medical"
          caption="Medical documentation"
        />

        <IconButton
          filledSymbol="bi-bandaid-fill"
          outlinedSymbol="bi-bandaid"
          caption="A travel-sized first aid kit..."
        />

        <IconButton
          filledSymbol="bi-shield-plus"
          outlinedSymbol="bi-shield"
          caption="Travel Insurance"
        />

        <IconButton
          filledSymbol="bi-geo-alt-fill"
          outlinedSymbol="bi-geo-alt"
          caption="List of nearby hospitals, clinics"
        />
      </div>
    </motion.div>
  );
}

export default CheckList;
