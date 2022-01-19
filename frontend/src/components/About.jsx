import React from "react";

function About() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://media.istockphoto.com/photos/happy-college-students-talking-on-a-class-in-the-classroom-picture-id1161093572?k=20&m=1161093572&s=170667a&w=0&h=3n3Igsb5kxs4YeI12pQKZif0ItGXbt8ShRjCtticix0="
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">About</h1>
            <p>
              This is a web app for IIT students that allows you to see comments on certain classes from IIT from previous students
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;