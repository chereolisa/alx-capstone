import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-8 md:p-10 lg:p-12 ">
      <nav>
        <ul
          className="flex justify-evenly font-itim text-2xl sm:gap-8 
          md:gap-12 lg:gap-16"
        >
          <Link
            to="/"
            className="hover:bg-[#4E062E] hover:text-[#ffffff] px-4 py-2 rounded-md "
          >
            Home
          </Link>
          <Link
            to="/preferences"
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
      <h1 className="font-lemon font-bold text-[#4E062E] mb-4 mt-0 md:mb-6 text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        QUIZZIE
      </h1>
      <p
        className="font-itim m-4 text-center text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 px-4 sm:px-0 
        max-w-xl"
      >
        Test your knowledge across different topics with a quick quiz!
      </p>
      <Link
        to="/preferences"
        className="bg-[#4E062E] hover:bg-[#85044b] hover:text-[#ffffff] px-8 py-4 rounded-md font-itim font-normal text-[#ffffff] text-xl sm:text-2xl"
      >
        Take a Quiz
      </Link>
    </div>
  );
};

export default HomePage;
