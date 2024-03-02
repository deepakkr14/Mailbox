import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Signin from "./pages/Singin";
import Singup from "./pages/Singup.jsx";
import Nav from "./components/UI/Nav.jsx";
import Inbox from "./pages/Inbox";
import Trash from "./pages/Trash.jsx";
import Sent from "./pages/Sent.jsx";
import Compose from "./pages/Compose.jsx";
import InboxView from "./pages/ViewInbox.jsx";
import SentboxView from "./pages/SentBoxView.jsx";
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
          <Route path="/inbox" element={<Inbox />} />

          <Route path="/trash" element={<Trash />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/sent" element={<Sent />} />

          <Route exact path="/inbox/:id" element={<InboxView />} />
          <Route exact path="/sentbox/:id" element={<SentboxView />} />

          {/* {!isSignupOrSignin && <Redirect to="login" />} */}
          {/* </Route> } */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
