import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./NavBar.css";
// import classes from "./NavBar.module.css";
import { Navbar, Button, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "../Store/AuthSlice";
import { Trash2, Send, Pen, EnvelopePaper } from "react-bootstrap-icons";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { InboxActions } from "../Store/Actions/Action";
const SideNav = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // for realtime messaging
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(InboxActions());
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const inboxMails = useSelector((state) => state.mails.inboxMails);
  let countUnReadMails = 0;
  inboxMails.forEach((each) => {
    if (each.isRead === false) {
      countUnReadMails++;
    }
  });
  const handleLogout = () => {
    dispatch(authActions.logout());
    Navigate("/singin");
  };
  return (
    <>
      <div className="navbar">
        <Card.Img
          style={{ maxHeight: "120px" }}
          src="/vite.svg"
          variant="top"
          className="sig"
        />
        <h4 style={{ marginBottom: "30px" }}>
          {localStorage.getItem("username").split("@")[0]}
        </h4>
     
        <NavLink className="navlink" to="/">
          <Pen /> Compose
        </NavLink>
        <NavLink to="/inbox" className="navlink">
          <EnvelopePaper />
          Inbox ---
          {countUnReadMails}
        </NavLink>

        <NavLink to="/sent" className="navlink">
          <Send /> SentBox
        </NavLink>
        {/* <NavLink to="/trash" className="navlink">
          <Trash2 /> Trash
        </NavLink> */}
        <Button onClick={() => handleLogout()} variant="outline-light">
          Logout
        </Button>
      
      </div>
    
    </>
  );
};

export default SideNav;
