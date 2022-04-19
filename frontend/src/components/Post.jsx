import Footer from "./Footer";
import React, {useState} from "react";
import {withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles.scss" 
import {Form, Button } from "react-bootstrap";
import insider from '../insider_platform_1.png';
function Post(props) {
    const [postList, setPostList] = useState([]);
    const [oldPostList, setOldPostList] = useState([1]);
    const [classList, setClassList] = useState([]);
    const [course, setCourse] = useState(localStorage.getItem("Class")) ; //unsure about this one
    const [name, setName] = useState("");
    const [postComment, setPostComment] = useState("");
    const [classDesc, setClassDesc] = useState(localStorage.getItem("courseDesc"));
    const [pid]=useState(localStorage.getItem('parent'));
    const history = useHistory();

    const handlePost=()=>{
        axios
      .post("http://localhost:8000/api/Posts/", 
      {
        name: String(name),
        contents: String(postComment),
        Classes: course,
        ParentPost:parseInt(pid),
      });
      history.push("/class");

    }
  return (
    <div className="Post">
      <div class="container">
        {course}
        {classDesc}
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
          <Form onSubmit={handlePost}>
                  <Form.Group className="mb-3" controlId="formBasicEmail" onChange = {e => setName( e.target.value) }>
                   
                    <Form.Control type="name" placeholder="Enter Name"/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <textarea placeholder="  Enter Comment" onChange = {e => setPostComment( e.target.value) }/>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Post;