import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import { Register } from "./view/Auth/Register/Register";
import { Login } from "./view/Auth/Login/Login";
import { ForgotPassword } from "./view/Auth/ForgotPassword/ForgotPassword";
import Home from "./view/Home/Home";
import Navigation from "./components/Layout/Navigation/Navigation";
import { BookDetails } from "./view/BookDetails/BookDetails";
import { userDataContext } from "./components/UserDataContext/UserDataContext";
import SearchingSite from "./view/SearchingSite/SearchingSite";
import Footer from "./components/Layout/Footer/Footer";
import { Profile } from "./view/Auth/Profile/Profile";
import { AddBooks } from "./view/Admin/AddBooks";
import { ToastContainer } from "react-toastify";

function App() {
  const { userData } = useContext(userDataContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation userData={userData} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/profile" element={<Profile />} />
          <Route path="/searching" element={<SearchingSite />} />
          <Route path="/:bookTitle/:bookId" element={<BookDetails />} />
          <Route path="auth/admin" element={<AddBooks />} />
          <Route
            path="/auth/login/przypomnijhaslo"
            element={<ForgotPassword />}
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
