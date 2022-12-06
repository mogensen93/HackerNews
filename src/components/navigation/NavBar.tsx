import React from "react";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <svg height="20" width="200">
          <text x="0" y="15" fill="White">
            /The Hacker News/
          </text>
        </svg>
      </div>
      <div className="navbar-links-container">
        <a href="https://github.com/HackerNews/API">API docs</a>
        <a href="https://github.com/mogensen93/React-Typescript">Github</a>
        <a href="https://www.linkedin.com/in/rasmus-mogensen-8104b2114/">LinkedIn</a>
      </div>
    </div>
  );
}
