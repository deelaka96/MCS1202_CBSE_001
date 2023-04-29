import router from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function Dashboard() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setLoading(false);
    } else {
      router.replace("/");
    }
  }, []);

  // Log out user
  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/");
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>Dashboard</h1>
      <p>
        Welcome <b>{user?.name}</b> to your dashboard! <br />
        This is a sample application created to showcase the{" "}
        <b>component based software engineering</b>.<br />
        This application has <b>two components</b> Frontend and the Backend.
        Frontend calls the backend <b>/login</b> endpoint to authenticate the
        user.
        <br />
        ex:- username:- <b>test@gmail.com</b>, password :- <b>test@12345</b>
      </p>
      <Button variant="primary" size="lg" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
