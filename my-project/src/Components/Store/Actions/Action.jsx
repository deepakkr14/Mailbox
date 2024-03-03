import { mailActions } from "../MailSlice";
const userEmail = localStorage.getItem("email");
const userName = userEmail.split("@")[0];

export const InboxActions = () => {  
  return async (dispatch) => {
    try {
      const responseData = await fetch(`https://mailbox-d7010-default-rtdb.firebaseio.com/mail-box/${userName}/inbox.json`);
      if (responseData.ok) {
        const resData = await responseData.json();
      const dataEntries=resData ?Object.entries(resData):[];
      const mails = dataEntries.map(([id, mail]) => ({
        id: id,
        ...mail
      }));
      dispatch(mailActions.replaceInboxMail(mails));
    } }catch (error) {
      console.log(error, "openMail inbox");
    }
  };
};
export const SentActions = () => {  
  return async (dispatch) => {
    try {
      const responseData = await fetch(`https://mailbox-d7010-default-rtdb.firebaseio.com/mail-box/${userName}/sentbox.json`);
      if (responseData.ok) {
        const resData = await responseData.json();
      const dataEntries=resData ?Object.entries(resData):[];
      const mails = dataEntries.map(([id, mail]) => ({
        id: id,
        ...mail
      }));
      dispatch(mailActions.replaceSentboxMail(mails));
    } }catch (error) {
      console.log(error, "openMail inbox");
    }
  };
};
