import Confetti from "react-confetti";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const Result = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="flex flex-col ml-auto mr-auto mt-8 pt-4 pb-4 pl-2 pr-2 justify-center items-center border rounded-lg bg-gray-100 w-full sm:w-3/4 h-auto">
        <h2 className="text-3xl font-itim text-center">
          Take a quiz to view your result!
        </h2>
        <Link
          to="/preferences"
          className="bg-[#4E062E] hover:bg-[#85044b] hover:text-[#ffffff] px-4 py-2 rounded-md font-itim font-normal text-[#ffffff] text-xl sm:text-2xl mt-5"
        >
          Choose Topic
        </Link>
      </div>
    );
  }

  const { score, questionLength, topic, difficulty, amount } = state;
  const categoryNames = {
    9: "General Knowledge",
    12: "Music",
    18: "Computer",
    19: "Mathematics",
    23: "History",
  };
  const displayTopic = categoryNames[topic] || topic;

  // ── Save current result to localStorage (only once per load) ───────────────
  useEffect(() => {
    const entry = {
      topic,
      difficulty,
      amount,
      score,
      total: questionLength,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("quizScores") || "[]");

    // Avoid duplicates if page refreshed
    const alreadySaved = existing.some(
      (e) => e.date === entry.date && e.score === entry.score,
    );

    if (!alreadySaved) {
      existing.push(entry);
      localStorage.setItem("quizScores", JSON.stringify(existing));
    }
  }, [score, questionLength, topic, difficulty, amount]);

  // ── Load previous scores ──────────────────────────────────────────────────
  const previousScores = JSON.parse(localStorage.getItem("quizScores") || "[]");

  return (
    <div className="flex flex-col ml-auto mr-auto mt-8 pt-4 pb-4 pl-2 pr-2 justify-center items-center rounded-lg w-100 sm:w-3/4 h-auto gap-6">
      {score > questionLength / 2 && <Confetti />}
      <h1 className="text-4xl font-lemon text-center text-[#4E062E] ">
        RESULT
      </h1>
      <p className="text-2xl font-itim text-center">
        You scored &nbsp;&nbsp;&nbsp;
        <span className="text-3xl font-lemon text-bold text-[#4E062E]">
          {score}/{questionLength}
        </span>
      </p>

      <p className="text-xl text-gray-600 mb-10">
        •{displayTopic} <br className="block sm:hidden" />•
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}{" "}
        <br className="block sm:hidden" />•{amount} questions
      </p>

      {/* ── Minimal Scoreboard ──────────────────────────────────────────────── */}
      {previousScores.length > 0 && (
        <div className="w-full mt-4 mb-6">
          <h3 className="text-lg font-semibold text-center mb-2">
            Previous Attempts
          </h3>
          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded text-sm">
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">Topic</th>
                  <th className="p-2">Diff</th>
                  <th className="p-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {previousScores
                  .slice(-5) // show only last 5
                  .reverse() // newest first
                  .map((item, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">
                        {categoryNames[item.topic] || item.topic}
                      </td>
                      <td className="p-2 text-center capitalize">
                        {item.difficulty}
                      </td>
                      <td className="p-2 text-center font-medium">
                        {item.score}/{item.total}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-3 flex-col sm:flex-row">
        <Link
          to="/quiz"
          state={{ topic, difficulty, amount }}
          className="bg-[#4E062E] hover:bg-[#85044b] hover:text-[#ffffff] px-4 py-2 rounded-md font-itim font-normal text-[#ffffff] text-xl sm:text-2xl"
        >
          Retake Quiz
        </Link>
        <Link
          to="/preferences"
          className="bg-[#4E062E] hover:bg-[#85044b] hover:text-[#ffffff] px-4 py-2 rounded-md font-itim font-normal text-[#ffffff] text-xl sm:text-2xl"
        >
          Select new Topic
        </Link>
        <Link
          to="/"
          className="bg-[#4E062E] hover:bg-[#85044b] hover:text-[#ffffff] px-4 py-2 rounded-md font-itim font-normal text-[#ffffff] text-xl sm:text-2xl"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Result;
