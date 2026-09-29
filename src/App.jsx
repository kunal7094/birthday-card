import { useState, useRef } from "react";

function App() {
  const friendName = "Hiral";
  const friendAge = 21;

  const [started, setStarted] = useState(false);
  const [popped, setPopped] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const musicRef = useRef(null);

  const colors = [
    "#ff6b9d",
    "#ff8a65",
    "#ffd54f",
    "#66bb6a",
    "#42a5f5",
    "#ab47bc",
    "#26c6da",
  ];

  // Balloons
  const balloons = Array.from(
    { length: friendAge },
    (_, index) => {
      const left = 5 + ((index * 17) % 90);
      const top = 15 + ((index * 23) % 65);

      return {
        id: index,
        number: index + 1,
        left: `${left}%`,
        top: `${top}%`,
        color: colors[index % colors.length],
        delay: `${(index % 5) * 0.2}s`,
      };
    }
  );

  // Start Birthday
  const startBirthday = () => {
    setStarted(true);

    if (musicRef.current) {
      musicRef.current.volume = 0.5;

      musicRef.current.play().catch((error) => {
        console.log("Music could not autoplay:", error);
      });
    }
  };

  // Pop Balloon
  const popBalloon = (id) => {
    if (popped.includes(id)) return;

    const newPopped = [...popped, id];

    setPopped(newPopped);

    // All balloons popped
    if (newPopped.length === friendAge) {
      setTimeout(() => {
        setShowCard(true);
        createConfetti();
      }, 500);
    }
  };

  // Confetti
  const createConfetti = () => {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");

      confetti.className = "confetti";

      confetti.style.left = Math.random() * 100 + "vw";

      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      confetti.style.animationDuration =
        2 + Math.random() * 3 + "s";

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };

  return (
    <div className="birthday-page relative min-h-screen overflow-x-hidden">

      {/* Music */}
      <audio ref={musicRef} loop>
        <source
          src="/birthday-song.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* ================= START SCREEN ================= */}

      {!started && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm">

          <div className="bg-white rounded-3xl p-8 mx-5 text-center shadow-2xl max-w-sm w-full">

            <div className="text-6xl mb-4">
              🎂
            </div>

            <h1 className="text-3xl font-bold text-pink-500 mb-3">
              A Birthday Surprise!
            </h1>

            <p className="text-gray-600 mb-6">
              Tap the button to start 🎈
            </p>

            <button
              onClick={startBirthday}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-7 py-3 rounded-full shadow-lg transition"
            >
              Start Birthday 🎉
            </button>

          </div>
        </div>
      )}

      {/* ================= BALLOON TITLE ================= */}

      {!showCard && started && (
        <div className="absolute top-8 left-0 right-0 text-center z-30 px-4">

          <h2 className="text-3xl md:text-5xl font-extrabold text-pink-600">
            Pop the balloons! 🎈
          </h2>

          <p className="mt-2 text-gray-700">
            Tap every balloon to reveal the surprise ❤️
          </p>

        </div>
      )}

      {/* ================= BALLOONS ================= */}

      {started && !showCard && (
        <div>
          {balloons.map(
            (balloon) =>
              !popped.includes(balloon.id) && (
                <div
                  key={balloon.id}
                  onClick={() => popBalloon(balloon.id)}
                  className="balloon flex items-center justify-center font-bold text-white text-xl cursor-pointer select-none"
                  style={{
                    left: balloon.left,
                    top: balloon.top,
                    background: balloon.color,
                    color: "white",
                    animationDelay: balloon.delay,
                  }}
                >
                  {balloon.number}
                </div>
              )
          )}
        </div>
      )}

      {/* ================= ANIMALS ================= */}

      {started && !showCard && (
        <>
          <div className="animal absolute bottom-5 left-5 text-7xl z-10">
            🐻
          </div>

          <div className="animal absolute bottom-5 right-5 text-7xl z-10">
            🐰
          </div>

          <div className="animal absolute top-24 left-5 text-5xl z-10">
            🐼
          </div>

          <div className="animal absolute top-28 right-5 text-5xl z-10">
            🦊
          </div>
        </>
      )}

      {/* ================= BIRTHDAY CARD ================= */}

      <div
        className={`birthday-card z-[80] ${
          showCard ? "show" : ""
        }`}
      >

        <div className="birthday-card-inner bg-white/95 backdrop-blur-md rounded-[35px] shadow-2xl p-7 md:p-10 text-center max-w-lg w-full border-4 border-pink-200">

          {/* Background Decorations */}

          <div className="card-decorations">

            {/* Books */}

            <span className="decor book book-1">
              📚
            </span>

            <span className="decor book book-2">
              📖
            </span>

            <span className="decor book book-3">
              📕
            </span>

            <span className="decor book book-4">
              📗
            </span>

            {/* Food */}

            <span className="decor food food-1">
              🌶️
            </span>

            <span className="decor food food-2">
              🥤
            </span>

            <span className="decor food food-3">
              🥞
            </span>

            <span className="decor food food-4">
              🍕
            </span>

            <span className="decor food food-5">
              🍟
            </span>

            <span className="decor food food-6">
              🍰
            </span>

          </div>

          {/* Card Content */}

          <div className="card-content">

            {/* Cake */}

            <div className="text-6xl heart mb-4">
              🎂
            </div>

            {/* Small Heading */}

            <p className="text-pink-500 font-bold text-lg">
              TODAY IS YOUR SPECIAL DAY
            </p>

            {/* Main Heading */}

            <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 mt-3">
              Happy Birthday
            </h1>

            {/* Name */}

            <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mt-3">
              {friendName} 🍰
            </h2>

            {/* Wish */}

            <p className="text-gray-600 text-lg leading-relaxed mt-6">
              Wishing you a beautiful birthday filled with
              happiness, laughter, love and lots of amazing
              memories. 💕
            </p>

            {/* Animals */}

            <div className="mt-7">

              <div className="text-5xl flex justify-center gap-3">

                <span className="cute-animal">
                  🐻
                </span>

                <span className="cute-animal">
                  🐰
                </span>

                <span className="cute-animal">
                  🐼
                </span>

                <span className="cute-animal">
                  🦊
                </span>

              </div>

              <p className="text-gray-500 text-sm mt-3">
                We all came here to wish you! 🎉❤️
              </p>

            </div>

            {/* Personal Message */}

            <div className="mt-7 bg-pink-50 rounded-2xl p-4">

              <p className="text-pink-600 font-semibold text-lg">
                A little surprise from my side ❤️
              </p>

              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                This birthday card is specially made for you.
                I hope this little surprise makes your special
                day even more memorable. 🎀✨
              </p>

              <p className="mt-3 text-purple-600 font-bold">
                — Kunal ❤️
              </p>

            </div>

            {/* Final Message */}

            <p className="mt-6 text-pink-500 font-semibold">
              Stay happy. Stay awesome. ❤️
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}

export default App;