import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <nav>
        <ul className="flex justify-evenly gap-48 font-itim text-2xl">
          <Link
            to="/"
            className="hover:bg-[#4E062E] hover:text-[#ffffff] px-4 py-2 rounded-md "
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="hover:bg-[#4E062E] hover:text-[#ffffff] px-4 py-2 rounded-md "
          >
            Quiz
          </Link>
          <Link
            to="/contact"
            className="hover:bg-[#4E062E] hover:text-[#ffffff] px-4 py-2 rounded-md "
          >
            Contact
          </Link>
        </ul>
      </nav>
      <img src="/Logo.svg" alt="Logo" />
      <h1 className="text-8xl font-lemon font-bold text-[#4E062E] mb-4 mt-0">
        QUIZZIE
      </h1>
      <p className="font-itim text-2xl m-4 ">
        Test your knowledge across different topics with a quick quiz!
      </p>
      <Link
        to="/preferences"
        className="bg-[#4E062E] hover:bg-[#85044b] hover:text-[#ffffff] px-8 py-4 rounded-md font-itim font-normal text-[#ffffff] text-2xl"
      >
        Take a Quiz
      </Link>
    </div>
  );
};

export default HomePage;
