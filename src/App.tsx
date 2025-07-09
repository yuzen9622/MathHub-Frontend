import "@/App.css";
import { persistor, store } from "@/redux/store/app";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// Pages
import About from "@/pages/About/About";
import Exam from "@/pages/Exam/Exam";
import Home from "@/pages/Home/Home";
import MathPage from "@/pages/MathPage/MathPage";
import Playground from "@/pages/Playground/Playground";
import Quest from "@/pages/Quest/Quest";

import LoginForm from "@/components/Auth/LoginForm";
// Components
import Header from "@/components/Header/Header";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/math" element={<MathPage />} />
                <Route path="/quest" element={<Quest />} />
                <Route path="/about" element={<About />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/exam/:questId" element={<Exam />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
