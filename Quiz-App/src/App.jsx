import HomePage from "../src/components/HomePage";
import Preferences from "../src/components/Preferences";
import QuizPage from "../src/components/QuizPage";
import Result from "../src/components/Result";
import Contact from "../src/components/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<Result />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
