import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, useAnimation  } from "framer-motion";

// List ảnh mèo (bạn thay link thật vào nhé)
const cats = [
  "/images/meo-01.png",
  "/images/meo-02.png",
  "/images/meo-03.png",
  "/images/meo-04.png",
];

// List quotes
const quotes = [
  "Every day is purr-fect when you believe in yourself.",
  "Be as curious as a cat, and life will surprise you.",
  "Stay pawsitive and good things will come.",
  "Happiness is a warm kitty and a grateful heart.",
];

export default function CatQuotesApp() {
  const [current, setCurrent] = useState({
    cat: cats[0],
    quote: quotes[0],
  });

  // Controls cho framer-motion
  const quoteCtrl = useAnimation();
  const imgCtrl = useAnimation();

  const playAnim = async () => {
    // reset về trạng thái đầu (ẩn + lệch xuống)
    await Promise.all([
      quoteCtrl.set({ opacity: 0, y: 50 }),
      imgCtrl.set({ opacity: 0, y: 50 }),
    ]);
    // chạy vào (fade + slide lên)
    quoteCtrl.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
    imgCtrl.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
  };

  // Hàm random
  const showRandom = () => {
    const randomCat = cats[Math.floor(Math.random() * cats.length)];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrent({ cat: randomCat, quote: randomQuote });
    playAnim();

  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => showRandom(),
    onSwipedRight: () => showRandom(),
    trackMouse: true, // Vuốt bằng chuột cũng được
  });

  return (
      <div
      {...handlers}
      onClick={showRandom}
      id="box-cat"
      className="flex flex-col items-center justify-between  bg-[#fce8d5] px-5 w-screen h-screen overflow-hidden"
    >
      {/* Quote */}
      <motion.p
        className="text-center text-brown-700 text-lg font-medium mt-6"
        style={{ fontSize: "45px", fontFamily: "AutumnInSeptember" }}
        animate={quoteCtrl}
        initial={false} // không auto chạy lúc mount, ta tự điều khiển
      >
        {current.quote}
      </motion.p>

      {/* Cat image */}
      <motion.img
        src={current.cat}
        alt="cat"
        className="w-60  object-contain"
        animate={imgCtrl}
        initial={false}
        draggable={false}
      />

      {/* Footer chân mèo */}
      <div id="foot" className="flex justify-center gap-4 mb-4 " >
        <img src="/images/CHAN.png" alt="paw" className="w-80" />
      </div>
    </div>
  );
}
