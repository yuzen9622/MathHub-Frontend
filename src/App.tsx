import { persistor, store } from "@/redux/store/app";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// Components
import Header from "@/components/Header/Header";
import { AuthProvider } from "@/hooks/useAuth";
import AppRoutes from "@/routes/index";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <AppRoutes />
              </main>
            </div>
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
