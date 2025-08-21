import React, { useState, useEffect } from "react";
import { cardDescriptions } from "@/lib/carouselData";

const CarouselAnimate = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % cardDescriptions.length);

  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + cardDescriptions.length) % cardDescriptions.length
    );

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // change every 3s
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-10">
      <div className="flex items-center justify-center overflow-hidden relative h-[400px]">
        {cardDescriptions.map((card, index) => {
         const position = (index - current + cardDescriptions.length) % cardDescriptions.length;


          let style =
            "absolute transition-all duration-700 ease-in-out";

          if (position === 0) {
            // Active card
            style +=
              " z-20 scale-120 opacity-100 translate-x-0";
          } else if (position === 1) {
            // Next card
            style +=
              " z-10 scale-90 opacity-70 translate-x-[60%]";
          } else if (position === cardDescriptions.length - 1) {
            // Prev card
            style +=
              " z-10 scale-90 opacity-70 -translate-x-[60%]";
          } else {
            // Others (hidden)
            style += " opacity-0 scale-90";
          }

          return (
            <div key={card.id} className={style + " w-80 h-[400px]"}>
              <div className="border border-gray-200 bg-white shadow-lg rounded-xl overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <button className="w-full py-2 px-4 bg-indigo-500 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ▶
      </button>
    </div>
  );
};

export default CarouselAnimate;
