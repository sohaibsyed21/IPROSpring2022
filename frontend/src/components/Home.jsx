import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import "../home.scss"
import axios from "axios";
import Select from 'react-select';
import styled from "styled-components";
import { delay } from "q";


function Home(props) {

  const [classes, getClasses] = useState("")

  useEffect(() => {
    getAllClasses();
  }, []);

  const getAllClasses = () => {
    axios
      .get("http://localhost:8000/api/Classes/")
      .then((res) => {
        const allClasses = res.data;
        //console.log("allClasses: " + allClasses)
        getClasses(allClasses);
      })
      .catch(err => console.log(err));
  }

  //console.log("Classes in console: " + classes)
  const fullCourseList = [];
  const fullDescList = [];
  for (let i = 0; i < classes.length; i++){
    //console.log(classes[i].courseCode)
    fullCourseList.push(classes[i].courseCode)
    fullDescList.push(classes[i].courseDesc)
    
  }

  //console.log("fullCourseList: " + fullCourseList)

  let options = null;
  if (fullCourseList){
    options = fullCourseList.map((el) => <option key={el}>{el}</option>);
  }

  let history = useHistory();
  /** "selected" here is state variable which will hold the
  * value of currently selected dropdown.
  */
  const [selected, setSelected] = useState("");

  
  const finalSelectHandler = (event) => {
    setSelected(event.target.value);
    //console.log("finalSelect: " + event.target.value)
  };

  

  const handleClick = () => {
    for (let i = 0; i < fullCourseList.length; i++){
      if (selected === fullCourseList[i]){
        console.log("Desc found!" + fullDescList[i])
        localStorage.setItem("courseDesc", fullDescList[i])
        //console.log("COURSE DESC: " + localStorage.getItem("courseDesc"))
        break;
      }
    }
    localStorage.setItem("Class", selected)
    //history.push("/class", { dept: selected, course: selected2 })
    history.push("/class", { selectedCourse: selected, selectedDesc: localStorage.getItem("courseDesc") }) //, classPosts: classPosts })

  };

  const dropdownStyles = {
    container: base => ({
      ...base,
      flex: 1,
      width: 250
    }),
    option: (provided, state) => ({
      ...provided,
      width: 230
    }),
    control: base => ({
      ...base,
      height: 40,
      minHeight: 35,
      width: 250
    })            

  };

  const Button = styled.button`
    background-color: red;
    color: white;
    font-size: 20px;
    padding: 5px 35px;
    border-radius: 0px;
    margin: 10px 0px;
    cursor: pointer;
  `;

  let options2 = null;
  if (fullCourseList){
    options2 = fullCourseList.map((el) => ({label: el, value: el}));
  }

  const finalSelectHandler2 = (label, value) => {
    setSelected(label);
    //console.log("finalSelect: " + event.target.value.label)
  };

  return (
    
    <div>
    <div class="home" >
      <h1 class="font-weight-light">Select a class to get started.</h1>
      
      <div class="dropdown">
        <form>
          <div>
            <Select
              placeholder="Select a course code..."
              styles={dropdownStyles}
              options={options2}
              onChange={opt => finalSelectHandler2(opt.label, opt.value)}
            />
            
          </div>
        </form>
      </div>
      <div class = "button">
        <Button onClick={handleClick}>
          See Class
        </Button>
      </div>
    </div>
    <div></div>
    <div></div>
    <div></div>

    </div>
  );
}

export default Home;