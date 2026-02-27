import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Preferences() {
  // const [state, setState] = useState(0);

  const startQuiz = () => {};

  return (
    <div>
      <h2>Select your Preferences</h2>

      <div>
        <label htmlFor="topic">Topic</label>
        <select id="topic" required>
          <option>Mathematics</option>
          <option>Music</option>
          <option>Computers</option>
          <option>History</option>
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" required>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <label htmlFor="amount">Number of Questions</label>
        <select id="amount" required>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>
      </div>

      <Link to="/start">Start Quiz</Link>
    </div>
  );
}

export default Preferences;
