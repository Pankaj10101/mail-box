import React, { useEffect, useState } from 'react';
import { Alert, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMailData } from '../store/MailSlice';
import { NavLink } from 'react-router-dom';

const SentMails = () => {
  const [selectedMailId, setSelectedMailId] = useState(null);
  const dispatch = useDispatch();
  const mailData = useSelector((state) => state.mail.mailData);
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    const fetchSentMails = async () => {
      try {
        const userMail = localStorage.getItem('userName');
        const response = await axios.get(
          `https://mail-box-28163-default-rtdb.firebaseio.com/${userMail}.json`
        );
        if (response.data) {
          dispatch(setMailData(response.data));
        }
      } catch (error) {
        console.error('Error while fetching sent mails:', error);
      }
    };

    fetchSentMails();
  }, []);

  const handleMailClick = (mailId) => {
    setSelectedMailId(mailId);
  };

  if (!isLogin) {
    return (
      <>
        <h1 className='text-center'>Sign In to see your sent Mails</h1>
        <NavLink to='/sign-in' className='text-center'><h3>Sign In</h3></NavLink>
      </>
    );
  }

  return (
    <div>
      {!mailData || mailData.length === 0 ? (
        <Alert variant="info">No sent mail</Alert>
      ) : (
        <div className="d-flex">
          <div className="w-25 p-3">
            <h2>Sent Mails</h2>
            <ListGroup>
              {mailData.map((mail, index) => (
                <ListGroupItem
                  key={index}
                  action
                  active={selectedMailId === mail.TO}
                  onClick={() => handleMailClick(mail.TO)}
                >
                  {mail.TO}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
          <div className="flex-grow-1 p-3">
            {selectedMailId && (
              <div>
                <h2>All Mails of {selectedMailId}</h2>
                {mailData
                  .filter((mail) => mail.TO === selectedMailId)
                  .map((mail, index) => (
                    <Card key={`card-${index}`} className="mb-3">
                      {mail.Content.map((item, itemIndex) => (
                        <div key={`content-${index}-${itemIndex}`}>
                          <Card.Header>Subject: {item.Subject}</Card.Header>
                          <Card.Body>
                            <Card.Text>{item['Email Content']}</Card.Text>
                          </Card.Body>
                        </div>
                      ))}
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SentMails;
