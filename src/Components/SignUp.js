import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (email && password && confirmPassword && password === confirmPassword) {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY",
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        );
        if (response.status === 200) {
          console.log('signup-success');
          toast.success("Sign Up Successful");
          navigate("/sign-in");
          return true;
        } else {
          console.log('signup-failed');
          toast.error("Signup failed");
          return false;
        }
      } catch (error) {
        console.log(error.response.data.error.message);
        toast.error(error.response.data.error.message);
        throw new Error("Signup Failed");
      }
    } else if (
      email &&
      password &&
      confirmPassword &&
      password !== confirmPassword
    ) {
      toast.error("Passwords do not match");
    } else {
      toast.error("Fill in all fields");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h2>Signup</h2>
      <Form onSubmit={handleSignup} className="w-25 d-flex flex-column gap-2">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4">
          Sign Up
        </Button>
      </Form>

      <div className="mt-3">
        <p>
          Already have an account? <Link to="/sign-in">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
