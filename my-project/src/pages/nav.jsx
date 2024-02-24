import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
// import classes from "./NavBar.module.css";
import { Navbar, Button, Col, Nav } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import { Trash2, Send, Pen, Mailbox } from "react-bootstrap-icons";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const SideNav = () => {
  const Navigate = useNavigate();
  // / configureAnchors({ scrollDuration: 1000 });
  return (
    <>

     

      <div className="navbar">
      <Card.Img
      style={{maxHeight:'120px'}}
            src='/vite.svg'
            variant='top'
            className='sig'
          />
        <h4 style={{ marginBottom: "30px" }}>User:fff</h4>
        {/* <Navbar> */}
        <NavLink className="navlink" to="/compose">
          Compose
        </NavLink>
        <NavLink to="/hero" className="navlink">
          Inbox
          {/* /* /* * - {countUnReadMails} * * * */}
        </NavLink>

        <NavLink to="/sent" className="navlink">
          SentBox
        </NavLink>
        <NavLink to="/trash" className="navlink">
          Trash
        </NavLink>
        <Button onClick={console.log("aaa")} variant="outline-light">
          Logout
        </Button>
        {/* </Navbar> */}
      </div>
    </>
  );
};

export default SideNav;
