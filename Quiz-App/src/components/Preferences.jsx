import { useState } from "react";
import { Link } from "react-router-dom";

function Preferences() {
  // const [state, setState] = useState(0);
  const [topic, setTopic] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState(0);

  const isReady = topic && difficulty && amount;

  return (
    <div className="m-6 flex flex-col justify-center items-center">
      <h2 className="text-center font-lemon text-4xl mb-4">
        Select your Preferences
      </h2>

      <div className="flex flex-col w-1/2 justify-end ">
        <label
          htmlFor="topic"
          className="mt-4 mb-1 font-itim font-normal text-2xl"
        >
          Topic
        </label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="border h-12 bg-[#EAEAEA] w-full rounded-lg"
        >
          <option value="">Select a topic</option>
          <option value="19">Mathematics</option>
          <option value="12">Music</option>
          <option value="18">Computers</option>
          <option value="23">History</option>
          <option value="9">General Knowledge</option>
        </select>

        <label
          htmlFor="difficulty"
          className="mt-4 mb-1 font-itim font-normal text-2xl"
        >
          Difficulty
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
          className="border h-12 bg-[#EAEAEA] w-full rounded-lg"
        >
          <option value="">Select a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label
          htmlFor="amount"
          className="mt-4 mb-1 font-itim font-normal text-2xl"
        >
          Number of Questions
        </label>
        <select
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border h-12 bg-[#EAEAEA] w-full rounded-lg font"
        >
          <option value="">Select number of questions</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <Link
        to="/quiz"
        onClick={(e) => {
          if (!isReady) {
            e.preventDefault();
          }
        }}
        state={{ topic, difficulty, amount: Number(amount) }}
        className={`
    px-8 py-4 rounded-md 
    font-itim font-normal text-[#ffffff] text-2xl 
    mt-8
    transition-colors duration-200
    ${
      isReady
        ? "bg-[#4E062E] hover:bg-[#85044b] cursor-pointer"
        : "bg-[#a0a0a0] cursor-not-allowed opacity-60"
    }
  `}
      >
        Start Quiz
      </Link>
    </div>
  );
}

export default Preferences;
