import React, {useState} from "react";
import {withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
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
    const [commentList,setCommentList]=useState([]);
  //////////// START TESTING AREA /////////////
  let history = useHistory();

  const renderPost = () => {
    //this.state.postList = PostList;
    if (postList.length !== oldPostList.length){
      //console.log("THE POSTS ARE NOT EQUAL TO EACH OTHER");
      //console.log("OLD POST LIST: " + oldPostList.length);
      //console.log("NEW POST LIST: " + postList.length);
      setOldPostList(postList);
      refreshPosts();
    }
   return postList.map(Posts=>
      {
        if (Posts.ParentPost==null){
           return( <div className="divStyle">
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
            <Button primary onClick={() => handleReply(Posts.id)}>Reply</Button>
          </div>
           )}
           else{
            return( <div className="reply">
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
            <Button primary onClick={() => handleReply(Posts.id)}>Reply</Button>
          </div>
           )
           }
      })
    }
  // const populateComments=()=>{
  //   var parents  = {}
  //   for(let x = 0; x<postList.length; x++)
  //   {
  //     if (postList[x].ParentPost == null)
  //       {
  //         parents[postList[x]]=[];       
  //       }
  //   }
  //   for(let i =0; i<parents.length;i++){
  //     for(let j=0;j<postList.length;j++){
  //       if (postList[j].ParentPost==parents[i].id){

  //       }
  //     }
  //   }
  //   setCommentList(parents);

  // }
  
  const populateReplys=()=>{

  }

  const refreshPosts = () => {
    axios
      .get("http://localhost:8000/api/Posts/")
      .then(res =>  {setPostList(res.data.filter(classNum => classNum.Classes === course))
      })
      .catch(err => console.log(err));
  }
  const handleReply=(e)=>{
    localStorage.setItem('parent', JSON.stringify(e));
    history.push("/post");
    
  }


  ////////// END TESTING AREA //////////


  const handleNewPost = () => {
    localStorage.setItem('parent', null);
    history.push("/post",{selectedCourse:course,selectedDesc: localStorage.getItem("courseDesc")});

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
          </div>
          <div>
          <button onClick={handleNewPost}>New Post</button>
          </div>
        </div>
      </div>
      <section >
        {renderPost()}
      </section>
    </div>
    )

}export default withRouter(Class)