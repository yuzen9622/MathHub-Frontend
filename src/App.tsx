import "@/App.css";
import About from "@/pages/About/About";
import Exam from "@/pages/Exam/Exam";
import Home from "@/pages/Home/Home";
import MathPage from "@/pages/MathPage/MathPage";
import Playground from "@/pages/Playground/Playground";
import Quest from "@/pages/Quest/Quest";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App(): React.JSX.Element {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800">
          <ul className="flex justify-center items-center gap-4 py-4">
            <li>
              <Link
                to="/"
                className="text-white hover:text-gray-300 transition-colors"
              >
                首頁
              </Link>
            </li>
            <li>
              <Link
                to="/math"
                className="text-white hover:text-gray-300 transition-colors"
              >
                數學天地
              </Link>
            </li>
            <li>
              <Link
                to="/quest"
                className="text-white hover:text-gray-300 transition-colors"
              >
                題目
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:text-gray-300 transition-colors"
              >
                關於我們
              </Link>
            </li>
            <li>
              <Link
                to="/playground"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Latex!
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/math" element={<MathPage />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/about" element={<About />} />
          <Route path="/playground" element={<Playground />} />

          <Route path="/exam/:questId" element={<Exam />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
