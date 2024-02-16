"use client";
import React from "react";
import Link from "next/link";

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <main>This is a about page</main>
        <Link href="/">Click here to go Home</Link>
      </React.Fragment>
    );
  }
}

export default About;
