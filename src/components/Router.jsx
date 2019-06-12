import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignUpPage from "./SignUpPage";
import EditPage from "./EditPage";
import VideoPage from "./VideoPage";

export default function AppRouter() {
  return (
    <Router>
      <main className="main-page">
        <Route exact path="/" component={HomePage} />
        <Route path="/addUser" component={SignUpPage} />
        <Route path="/editUser" component={EditPage} />
        <Route path="/video/:videoId" component={VideoPage} />
      </main>
    </Router>
  );
}
