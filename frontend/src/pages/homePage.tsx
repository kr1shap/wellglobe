import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [dest, setDest] = useState("");

  const goToResult = (to: string, from: string) => {
    navigate("/result", {
      state: {
        to: to,
        from: from,
      },
    });
  };

  //Validate the country -> i.e. check if the country exists using simple API
  const validateCountry = async (name: string) => {
    try {
      const trimName = name.trim().toLowerCase();
      if (trimName === "") {
        console.warn("Empty country name");
        return false;
      }

      const res = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(
          trimName.toLowerCase()
        )}?fullText=true`
      );

      console.log(res);
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSubmit = async () => {
    const fromValid = await validateCountry(from);
    const destValid = await validateCountry(dest);

    if (!fromValid || !destValid) {
      alert("One or both countries are invalid.");
      return;
    }

    console.log("Countries are valid:", { from, dest }); //for denugging
    goToResult(dest.trim().toLowerCase(), from.trim().toLowerCase());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col sm:flex-row gap-40"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col gap-3 items-center justify-center"
      >
        <motion.img
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 80, damping: 25 }}
          className="
        w-43 h-40
        sm:w-[230px] sm:h-[200px] 
        transition-all duration-300 cursor-pointer
        object-cover
      "
          src="/wellglobeLogo.png"
          alt="WellGlobe Logo"
        />
        <p className="text-xl sm:text-5xl font-black text-center mt-3 text-blue-950">
          WellGlobe
        </p>
      </motion.div>
      {/* sign up */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="pt-10 pb-10 sm:p-[50px] flex flex-col gap-5 w-full h-full rounded-4xl
      bg-white/20  shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/30 min-w-xl"
      >
        <div className=" flex flex-col gap-10">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              I'm going to...
            </label>
            <input
              type="text"
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              placeholder="e.g. France"
              className="bg-white/50 text-blue-950 border border-gray-300 rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
            />
          </div>

          {/* Origin Input */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              I'm from...
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="e.g. Canada"
              className="bg-white/50 text-blue-950 border border-gray-300 rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center align-middle mt-4">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#365d7d" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-[50%] bg-[#4B7399] hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-3xl transition"
          >
            Submit
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HomePage;
