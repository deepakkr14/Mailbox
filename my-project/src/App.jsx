import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Signin from "./Components/pages/singin.jsx";
import Singup from "./Components/pages/singup";
import Nav from "./Components/pages/nav";
import Inbox from "./Components/pages/inbox";
import Trash from "./Components/pages/trash";
import Sent from "./Components/pages/sent";
import Compose from "./Components/pages/compose";
function App() {
  const location = useLocation();

  const isSignupOrSignin =
    location.pathname === "/" || location.pathname === "/singup";
  return (
    <>
      <Suspense fallback={<div className="loader"></div>}>
        {!isSignupOrSignin && <Nav />}
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/singup" element={<Singup />} />
          <Route path="/hero" element={<Inbox />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/sent" element={<Sent />} />
          {/*<Route
            path="/verify"
            element={loginState ? <Hero /> : <Navigate to="/" />}
          />
          <Route path="/forget" element={<ForgotPassword />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
