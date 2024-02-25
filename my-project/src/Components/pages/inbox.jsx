import React, {  useState ,useEffect} from 'react'
import { Row, Col, Container, Button ,Spinner} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import classes from "./Inbox.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../Store/MailSlice';
import useHttp from '../hooks/usdHttp';

// import Nav from './nav'
// import './nav.css';
function Inbox() {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const [isLoading, setIsLoading] = useState(null);
  const [mails, setReciveData] = useState([]);
  // const mails = useSelector(state => state.mails.inboxMails);
  
  useDispatch(mailActions.addInboxMail(mails))

  const userEmail = localStorage.getItem('email');
  const userName = userEmail.split("@")[0];

  const fetchData = async () => {
    const inboxData = await fetch(
      `https://mailbox-d7010-default-rtdb.firebaseio.com/mail-box/${userName}/inbox.json`,
    );
    const resData = await inboxData.json();
    const dataEntries=resData ?Object.entries(resData):[];
    const mails = dataEntries.map(([id, mail]) => ({
      id: id,
      ...mail
    }));
    setReciveData(mails);
    console.log(mails)
    dispatch(mailActions.addInboxMail(mails));
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const openMail = async(mail) => {
    try {
      
      dispatch(mailActions.updatedInboxMail(mail))
      await sendRequest({
        endPoint: `${userName}/inbox/${mail.id}`,
        method: "PUT",
        body: {...mail, isRead: true}
      });
    } catch (error) {
      console.log(error,"openMail inbox");
    }  
  }

    const deleteMail = async (mail) => {
      try {
        setIsLoading(mail.id);
        await sendRequest({
          endPoint: `${userName}/inbox/${mail.id}`,
          method: "DELETE",
        })
        setIsLoading(null);
        dispatch(mailActions.removeInboxMail(mail));
      } catch (error) {
        console.log(error,"inbox delete");
      }
    };


  return (
    <div className={classes.inbox}>
       <h3 className={classes.inboxHeading}>Inbox </h3>
       {!mails.length && <h5 className={classes.inboxHeading}>No Mails</h5>}
      {mails.map((mail) => (
        <Container fluid key={mail.id}>
          <Row key={mail.id} className={
            mail.isRead ? classes.openedMail : classes.notOpenedMail
          }>
            <Col className="col-11">
              <NavLink className={classes.navlink} to={`/inbox/${mail.id}`}>
                <Row onClick={openMail.bind(null, mail)}>
                  <Col className="fw-bold col-2">{mail.from}</Col>
                  <Col className="col-8">
                    <div className={classes.content}>
                      <strong>{mail.subject} - </strong> {mail.content}
                    </div>
                  </Col>
                  <Col className="col-2">
                    <strong>
                      {mail.time.hours}:{mail.time.minutes} {" "}
                      {mail.date.day}-{mail.date.month}-{mail.date.year} 
                    </strong>
                  </Col>
                </Row>
              </NavLink>
            </Col>
            <Col className="col-1">
              <Button
                onClick={deleteMail.bind(null, mail)}
                style={{ padding: "0px 5px" }}
                variant="danger"
              >
                 {(isLoading === mail.id) ?   
                  <span>
                    <Spinner as="span" animation="border" size="sm" role="status" 
                      aria-hidden="true"
                    />
                  </span>
                  : 
                  'Delete'
                }
              </Button>
            </Col>
          </Row>
        </Container>
      ))}
      <NavLink className={classes.navlink} to="/compose">
          <Button className={classes.composeBtn} variant="success" >
            Compose
          </Button>
      </NavLink>
    </div>
  )
}
// const inbox = () => {
//   return (
//     <>

//     <div className='box'>
//       <h1>Inbox</h1>
     
//     </div>
//     </>  
//   )
// }

export default Inbox;
