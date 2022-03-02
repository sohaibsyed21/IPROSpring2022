import React, {useState} from "react";
import {withRouter } from "react-router-dom";
import axios from "axios";
import "../styles.scss" 
import {Form, Button } from "react-bootstrap";
import insider from '../insider_platform_1.png';
function Class(props){
  //replacement for constructor code
    const [postList, setPostList] = useState([]);
    const [oldPostList, setOldPostList] = useState([1]);
    const [classList, setClassList] = useState([]);
    const [course, setCourse] = useState(localStorage.getItem("Class") || props.location.state.selectedCourse) ; //unsure about this one
    const [name, setName] = useState("");
    const [postComment, setPostComment] = useState("");
    const [classDesc, setClassDesc] = useState(localStorage.getItem("courseDesc") || props.location.state.selectedDesc || ""); //unsure about this one
    console.log(localStorage.getItem("Class"));
  //////////// START TESTING AREA /////////////

  const renderPost = () => {
    //this.state.postList = PostList;
    if (postList.length !== oldPostList.length){
      //console.log("THE POSTS ARE NOT EQUAL TO EACH OTHER");
      //console.log("OLD POST LIST: " + oldPostList.length);
      //console.log("NEW POST LIST: " + postList.length);
      setOldPostList(postList);
      refreshPosts();
    }
    
    return postList.map(Posts => (
      <div className="divStyle">
        <h4 key = {Posts.id}>
          <span  title = {Posts.name}>
                {Posts.name}
          </span>
        </h4>
        <h5 key = {Posts.id}>
          <p title = {Posts.contents}>
            {Posts.contents}
          </p>
        </h5>
      </div>
    ))
  }



  const refreshPosts = () => {
    axios
      .get("http://localhost:8000/api/Posts/")
      .then(res =>  setPostList(res.data.filter(classNum => classNum.Classes === course)) )
      .catch(err => console.log(err));
  }


  ////////// END TESTING AREA //////////

  const refreshClasses = () => {
    axios
      .get("http://localhost:8000/api/Classes/")
      .then(res => setClassList(res.data))
      .catch(err => console.log(err));

  }
  


  const handleName = (event) => {
    console.log("handleName: " + event.target.value)
    name = event.target.value
  }
  /*
  const handleName= e =>{
    console.log("handleName: " + event.target.value)
    setName(e.target.value);
  };
  */

  const handleComment = (event) => {
    postComment = event.target.value
  }
  const handlePost = Posts => {
    console.log("handlePost: " + name + "- " + postComment)

    axios
      .post("http://localhost:8000/api/Posts/", 
      {
        name: String(name),
        contents: String(postComment),
        Classes: course,
      })
      .then(res => refreshPosts())
      .catch(err => console.log("handlePost error: " + err));
    
    localStorage.setItem('Class', course);
    
  }
    return (
    
    <div className="class">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="insiders"> <img src={insider} alt="Logo" /> </div>
        <div class = "courseDesc">
        <p id="Course Desc"> <b>{course} Class Description</b></p> 
                {classDesc}
        </div>
          <div class="col-lg-5">
            <h1 id="Course Title" class="font-weight-light">{course}</h1> 
              <div>
                <Form onSubmit={handlePost}>
                  <Form.Group className="mb-3" controlId="formBasicEmail" onChange = {e => setName( e.target.value) }>
                   
                    <Form.Control type="name" placeholder="Enter Name"/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                  
                    <Form.Control type="professor" placeholder="Enter Professor Name" />
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
      <section >
        {renderPost()}
      </section>
    </div>
    )

}export default withRouter(Class)