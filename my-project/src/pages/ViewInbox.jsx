import React, { useEffect, useState } from 'react'
import classes from './InboxView.module.css';
import {ArrowBarLeft} from 'react-bootstrap-icons'
import { useParams,NavLink, useNavigate} from 'react-router-dom';
import { Button,Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../components/Store/MailSlice';
import useHttp from '../components/Hooks/UsdHttp';


function InboxView() {
    const history = useNavigate();
    const dispatch = useDispatch();

    const userEmail = localStorage.getItem('email');
    const userName = userEmail && userEmail.split("@")[0]
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(null);
    
    const sendRequest = useHttp();


    const inboxMails = useSelector(state => state.mails.inboxMails);
    const mail = inboxMails.find(i => i.id === id);

    const fromMail = mail && `<${mail.fromMail}>`;
    const deleteMail = async () => {
      try {
        setIsLoading(mail.id);
        await sendRequest({
          endPoint : `${userName}/inbox/${mail.id}`,
          method : "DELETE"
        });
        dispatch(mailActions.removeInboxMail(mail));
        history("/inbox");
        setIsLoading(null);
      } catch (error) {
        console.log(error,"inboxview delete");
      }
    }

    
  return (
    <>
			{mail && 
				<div className={classes.box}>
					<NavLink to="/inbox" className={classes.navlink}>
						<Button style={{marginBottom:"20px", padding:"5px"}}> <ArrowBarLeft/>Go Back</Button>
					</NavLink>
					<h4>Subject: {mail.subject}</h4>
					<span style={{fontSize:"20px", fontWeight:"bold"}}>From: {mail.from}</span>{" "}
					<span style={{fontSize:"16px"}}>{fromMail}</span>	
					<h6 style={{marginTop: "10px"}}>
						Time: {mail.time.hours}:{mail.time.minutes} {" "}
						{mail.date.day}-{mail.date.month}-{mail.date.year} 
					</h6>
					<p style={{marginTop:"20px"}}>{mail.content}</p>
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
				</div>
			}
		</>
  )
}

export default InboxView