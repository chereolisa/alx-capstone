import Confetti from "react-confetti";
import { useLocation, Link } from "react-router-dom";

const Result = () => {
  //   const [showScore, setShowScore] = useState(false);
  const { state } = useLocation();
  if (!state) {
    return (
      <div className="flex flex-col ml-auto mr-auto mt-8 pt-4 pb-4 pl-2 pr-2 justify-center items-center border rounded-lg bg-gray-100 w-1/3 h-auto">
        <h2 className="text-3xl font-itim text-center">
          Take a quiz to view your result!
        </h2>
        <Link to="/preferences">Choose Topic</Link>
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
      <div className="flex justify-between gap-3">
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
      </div>
    </div>
  );
};

export default Result;
