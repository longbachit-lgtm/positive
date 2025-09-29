import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, useAnimation } from "framer-motion";
import { AnimatePresence } from "framer-motion";
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
      quoteCtrl.set({ opacity: 0, x: -50 }),
      imgCtrl.set({ opacity: 0, x: -50 }),
    ]);
    // chạy vào (fade + slide lên)
    quoteCtrl.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    // imgCtrl.start({ opacity: 1, x: 0, transition: { duration: 1 } });
  };

  function getRandomOther(arr, current) {
    if (arr.length <= 1) return current; // nếu chỉ có 1 phần tử thì thôi
    let item;
    do {
      item = arr[Math.floor(Math.random() * arr.length)];
    } while (item === current);
    return item;
  }


  // Hàm random
  const showRandom = () => {
    setCurrent((prev) => {
      const randomCat = getRandomOther(cats, prev.cat);
      const randomQuote = getRandomOther(quotes, prev.quote);
      return { cat: randomCat, quote: randomQuote };
    });
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

      {/* <motion.p
        className="text-center text-brown-700 text-lg font-medium mt-6"
        style={{ fontSize: "45px", fontFamily: "AutumnInSeptember" }}
        animate={quoteCtrl}
        initial={false} // không auto chạy lúc mount, ta tự điều khiển
      >
        {current.quote}
      </motion.p> */}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${current.cat}-${current.quote}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: .7 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-center text-brown-700 text-lg font-medium mt-6" style={{ fontFamily: "AutumnInSeptember", fontSize: 45 }}>{current.quote}</p>
          <img id="img_cat" src={current.cat} alt="cat" className="object-contain" />
        </motion.div>
      </AnimatePresence>
      {/* Quote */}
      {/* <motion.p
        className="text-center text-brown-700 text-lg font-medium mt-6"
        style={{ fontSize: "45px", fontFamily: "AutumnInSeptember" }}
        animate={quoteCtrl}
        initial={false} // không auto chạy lúc mount, ta tự điều khiển
      >
        {current.quote}
      </motion.p> */}

      {/* Cat image */}
      {/* <motion.img
        src={current.cat}
        alt="cat"
        id="img_cat"
        className="  object-contain"
        animate={imgCtrl}
        initial={false}
        draggable={false}
      /> */}

      {/* Footer chân mèo */}
      <div id="foot" className="flex justify-center gap-4 mb-4 " >
        <img src="/images/CHAN.png" alt="paw" className="w-90" />
      </div>
    </div>
  );
}
