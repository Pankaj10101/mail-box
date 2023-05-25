import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Button } from "react-bootstrap";
import "./Mailbox.css"; // Import custom CSS file
import { useDispatch, useSelector } from "react-redux";
import { setMailData } from "../store/MailSlice";
import { toast } from "react-toastify";
import axios from "axios";

const Mailbox = () => {

  const dispatch = useDispatch();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const data = useSelector((state) => state.mail.mailData);

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleEditorStateChange = (state) => {
    setEditorState(state);
  };

  const handleSend = async () => {
    if (!to || !subject || editorState.getCurrentContent().getPlainText().trim() === '') {
      toast.error('Please fill in all fields', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(to)) {
      toast.error('Invalid email address', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    const emailContent = editorState.getCurrentContent().getPlainText();
    const updatedData = (() => {
      const itemIndex = data.findIndex((item) => item.TO === to);
      if (itemIndex !== -1) {
        const updatedItems = [...data];
        const updatedItem = { ...updatedItems[itemIndex] };
        updatedItem.Content = [
          ...updatedItem.Content,
          { Subject: subject, 'Email Content': emailContent }
        ];
        updatedItems[itemIndex] = updatedItem;
        return updatedItems;
      } else {
        return [
          ...data,
          {
            TO: to,
            Content: [{ Subject: subject, 'Email Content': emailContent }]
          }
        ];
      }
    })();

    try {
      const userMail = localStorage.getItem('userName');
      const res = await axios.put(
        `https://mail-box-28163-default-rtdb.firebaseio.com/${userMail}.json`,
        updatedData
      );
      dispatch(setMailData(updatedData));

      setTo('')
      setSubject('')
      setEditorState(EditorState.createEmpty())

      toast.success('Mail sent successfully', {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.error('Error while sending mail:', error);

      toast.error('Failed to send mail', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <div className="mailbox-container">
      <Form>
        <Form.Group controlId="to">
          <Form.Label>To:</Form.Label>
          <Form.Control type="email" value={to} onChange={handleToChange} />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={handleSubjectChange}
          />
        </Form.Group>
        <Form.Group>
          <div className="editor-container">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorStateChange}
              wrapperClassName="editor-wrapper"
              editorClassName="editor-content"
            />
          </div>
        </Form.Group>
        <Button variant="primary" onClick={handleSend}>
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Mailbox;
