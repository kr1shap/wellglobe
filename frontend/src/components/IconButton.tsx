import { useState } from "react";

type Props = {
  filledSymbol: string;
  outlinedSymbol: string;
  caption?: string;
};

function IconButton(prop: Props) {
  const [isFilled, setIsFilled] = useState(false);

  const toggleIcon = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center w-[150px]">
      <div className="relative w-full h-[150px] flex items-center justify-center">
        <i
          className={`${prop.outlinedSymbol} absolute text-blue-400 cursor-pointer
                  text-6xl md:text-7xl lg:text-8xl transition-opacity duration-300`}
          style={{ opacity: isFilled ? 0 : 1 }}
          onClick={toggleIcon}
        ></i>
        <i
          className={`${prop.filledSymbol} absolute  text-blue-800 cursor-pointer
                  text-6xl md:text-7xl lg:text-8xl transition-opacity duration-300`}
          style={{ opacity: isFilled ? 1 : 0 }}
          onClick={toggleIcon}
        ></i>
      </div>
      <p className="mt-2 text-xs font-bold text-blue-950 leading-snug">
        {prop?.caption ?? "No caption"}
      </p>
    </div>
  );
}

export default IconButton;
