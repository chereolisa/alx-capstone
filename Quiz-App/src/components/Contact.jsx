import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Me</h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Have a question or just want to say hi? Feel free to{" "}
          <a
            href="mailto:justincherechukwu@gmail.com"
            className="text-indigo-600 font-medium hover:text-indigo-800 underline"
          >
            drop me an email
          </a>{" "}
          — and I'll get back to you as soon as I can!
          <br />
        </p>

        {/* Optional: quick social links */}
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://x.com/chereolisa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#000000] transition"
            aria-label="Twitter"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/ezeh-cherechukwu-jay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 transition"
            aria-label="LinkedIn"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.029-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.966v5.696h-3v-11h2.882v1.509h.039c.401-.757 1.381-1.557 2.837-1.557 3.033 0 3.597 1.997 3.597 4.597v6.451z" />
            </svg>
          </a>

          <a
            href="https://github.com/chereolisa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#000000] transition"
            aria-label="GitHub"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Justin Ezeh. All rights reserved.
        </p>

        <Link to="/" className="text-indigo-600 mb-8 mt-5 text-sm">
          <u>Go back home</u>
        </Link>
      </div>
    </div>
  );
};

export default Contact;
