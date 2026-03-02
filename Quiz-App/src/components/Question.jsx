import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Loader from "./Loader";
import he from "he";

function Question() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="flex flex-col ml-auto mr-auto mt-8 pt-4 pb-4 pl-2 pr-2 justify-center items-center border rounded-lg bg-gray-100 w-full sm:w-3/4 h-auto">
        <h2 className="text-3xl font-itim text-center">
          No quiz settings found
        </h2>
        <p className="text-2xl font-itim text-center">
          Please go back and select preferences.
        </p>
        <Link
          to="/preferences"
          className="bg-[#4E062E] hover:bg-[#85044b] hover:text-[#ffffff] px-8 py-4 mt-4 rounded-md font-itim font-normal text-[#ffffff] text-2xl"
        >
          Choose Topic
        </Link>
      </div>
    );
  }

  const { topic, difficulty, amount } = state;

  const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${topic}&difficulty=${difficulty}&type=multiple&encode=base64`;
  console.log(apiUrl);

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setLoading(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code === 0) {
          const decoded = data.results.map((q) => ({
            ...q,
            question: he.decode(atob(q.question)),
            correct_answer: he.decode(atob(q.correct_answer)),
            incorrect_answers: q.incorrect_answers.map((a) =>
              he.decode(atob(a)),
            ),
          }));

          // Shuffle options **once** for each question
          const questionsWithShuffledOptions = decoded.map((q) => ({
            ...q,
            shuffledOptions: [...q.incorrect_answers, q.correct_answer].sort(
              () => Math.random() - 0.5,
            ),
          }));

          setShuffledQuestions(questionsWithShuffledOptions);
        } else {
          console.warn("API returned non-success code:", data.response_code);
          setShuffledQuestions([]);
        }
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
        setShuffledQuestions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center pt-6">
        <div className="flex flex-col ml-auto mr-auto mt-8 px-3 py-4 justify-center items-center border rounded-lg bg-gray-100 w-full sm:w-3/4 h-auto">
          <p className="text-3xl font-itim text-center">Loading Questions</p>
          <Loader />
        </div>
      </div>
    );

  if (shuffledQuestions.length === 0) {
    return (
      <div className="flex flex-col ml-auto mr-auto mt-8 px-3 py-4 justify-center items-center border rounded-lg bg-gray-100 w-1/3 h-auto">
        <p className="text-3xl font-itim text-center">
          No questions found. Please try again later.
        </p>
      </div>
    );
  }

  const score = Object.values(userAnswers).filter(
    (answer, idx) => answer === shuffledQuestions[idx]?.correct_answer,
  ).length;
  const questionLength = shuffledQuestions.length;

  const current = currentQuestionIndex + 1;
  const total = shuffledQuestions.length;
  const progress = (current / total) * 100;
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Safety guard in case index is somehow invalid
  if (!currentQuestion) {
    return <p>Error: Question not found. Please restart the quiz.</p>;
  }

  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h2 className="text-2xl font-extralight font-lobster text-center mb-3">
        Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
      </h2>
      <div
        style={{
          height: "8px",
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#4E062E",
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <div
        style={{
          background: "#f9f9f9",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h3 className="text-2xl font-extralight font-itim text-center">
          {currentQuestion.question}
        </h3>

        <div className="options" style={{ marginTop: "25px" }}>
          {currentQuestion.shuffledOptions.map((option, index) => (
            <div key={index} style={{}}>
              <button
                type="button"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={selectedAnswer === option}
                onClick={() =>
                  setUserAnswers((prev) => ({
                    ...prev,
                    [currentQuestionIndex]: option,
                  }))
                }
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "block",
                  margin: "12px 0",
                  padding: "14px 18px",
                  border: "2px solid",
                  borderColor: selectedAnswer === option ? "#4E062E" : "#ddd",
                  borderRadius: "8px",
                  background: selectedAnswer === option ? "#e8f5e9" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                className="text-lg font-extralight font-itim text-center"
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-8 justify-between">
        {currentQuestionIndex > 0 && (
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            className="bg-[#4E062E] hover:bg-[#85044b] hover:text-[#ffffff] px-8 py-4 rounded-md font-itim font-normal text-[#ffffff] text-xl sm:text-2xl"
          >
            Previous
          </button>
        )}

        {currentQuestionIndex < shuffledQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            disabled={!selectedAnswer}
            className={`
    px-8 py-4 rounded-md 
    font-itim font-normal text-[#ffffff] text-xl sm:text-2xl 
    transition-colors duration-200
    ${
      selectedAnswer
        ? "bg-[#4E062E] hover:bg-[#85044b] cursor-pointer "
        : "bg-[#a0a0a0] cursor-not-allowed opacity-60"
    }
  `}
          >
            Next
          </button>
        ) : (
          <Link
            to="/result"
            state={{ score, questionLength, topic, difficulty, amount }}
            disabled={!selectedAnswer}
            className={`
    px-8 py-4 rounded-md 
    font-itim font-normal text-[#ffffff] text-xl sm:text-2xl 
    transition-colors duration-200
    ${
      selectedAnswer
        ? "bg-[#4E062E] hover:bg-[#85044b] cursor-pointer"
        : "bg-[#a0a0a0] cursor-not-allowed opacity-60"
    }
  `}
          >
            Finish Quiz
          </Link>
        )}
      </div>
    </div>
  );
}

export default Question;
