import { useState, useEffect, useRef } from "react";
import he from "he";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setLoading(true);

    fetch(
      "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple&encode=base64",
    )
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
          setQuestions(decoded);
        } else {
          console.warn("API returned non-success code:", data.response_code);
          setQuestions([]);
        }
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
        setQuestions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading quiz...</p>;

  if (questions.length === 0) {
    return <p>No questions found. Please try again later.</p>;
  }

  if (showScore) {
    const score = Object.values(userAnswers).filter(
      (answer, idx) => answer === questions[idx].correct_answer,
    ).length;

    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Quiz Complete!</h2>
        <p style={{ fontSize: "1.4em", margin: "20px 0" }}>
          Your score:{" "}
          <strong>
            {score} / {questions.length}
          </strong>
        </p>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setShowScore(false);
          }}
          style={{
            padding: "12px 24px",
            fontSize: "1.1em",
            cursor: "pointer",
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  // Current question only
  const currentQuestion = questions[currentQuestionIndex];
  const allOptions = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>

      <div
        style={{
          background: "#f9f9f9",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>{currentQuestion.question}</h3>

        <div className="options" style={{ marginTop: "25px" }}>
          {allOptions.map((option, index) => (
            <label
              key={index}
              style={{
                display: "block",
                margin: "12px 0",
                padding: "14px 18px",
                border: "2px solid",
                borderColor: selectedAnswer === option ? "#4caf50" : "#ddd",
                borderRadius: "8px",
                background: selectedAnswer === option ? "#e8f5e9" : "white",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() =>
                  setUserAnswers((prev) => ({
                    ...prev,
                    [currentQuestionIndex]: option,
                  }))
                }
                style={{ marginRight: "12px", transform: "scale(1.3)" }}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        {currentQuestionIndex > 0 && (
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            style={{
              padding: "10px 20px",
              marginRight: "15px",
              fontSize: "1em",
            }}
          >
            Previous
          </button>
        )}

        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            disabled={!selectedAnswer}
            style={{
              padding: "10px 28px",
              fontSize: "1em",
              background: selectedAnswer ? "#1976d2" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: selectedAnswer ? "pointer" : "not-allowed",
            }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => setShowScore(true)}
            disabled={!selectedAnswer}
            style={{
              padding: "10px 28px",
              fontSize: "1em",
              background: selectedAnswer ? "#4caf50" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: selectedAnswer ? "pointer" : "not-allowed",
            }}
          >
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;
