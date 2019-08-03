import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import {CardTitle, CardText, Jumbotron, Autocomplete, InputNumeric, Select, Fa, SelectInput, SelectOptions, SelectOption, Stepper, Step} from 'mdbreact';
import {level, type} from '../../forms/selectLists.js'
import DatePickerPage from '../../forms/DatePickerPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker'
import './newcourse.css'
import Logo from './CourseLogo.js'
import TextField from '@material-ui/core/TextField';
import Modules from './Modules.js'
import { 
  MDBRow,
  MDBCol,
  MDBCard,
  MDBView,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBAvatar,
  MDBBtn,
  MDBFileInput,
  MDBModal,
  MDBStepper, MDBStep, MDBSelect, MDBIcon, MDBDatePicker, MDBChipsInput,MDBSelectInput, MDBSelectOptions, MDBSelectOption
} from 'mdbreact';

class NewCourse extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			formData:{
				coursetitle: '',
				coursedetails: '',
				courselevel:'',
				coursetype:'',
				startdate:{},
          		enddate:{}
			},
			course: {},
			formActivePanel1: 1,
      		formActivePanel1Changed: false,
      		file: '',
      		imagePreviewUrl: '',
      		imageurl: 'https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(49).jpg',
      		showProfile: true,
      		levelitems:'',
      		gradelist:'',
      		juniorlists:'',
      		activeStep: 0,
  			one : true,
  			two : false,
  			three : false,	
  			four : false,
  			isActive1: "active",
  			isActive2: "disabled",
  			isActive3: "disabled",
  			departments:[],
      		courselevel: [
				{
					value: "School",
					text: "School"
				},
				{
					value: "11th-12th/ Junior College/ Diploma",
					text: "11th-12th/ Junior College/ Diploma"
				},
				{
					value: "University",
					text: "University"
				}
				,
				{
					value: "Professional",
					text: "Professional"
				},

				{
					value: "Others",
					text: "Others"
				}
			],
			coursetype: [
				{
					value: "Official",
					text: "Official"
				},
				{
					value: "Tuition/ Training",
					text: "Tuition/ Training"
				}
			],
			studentgroup: [
				{
					value: "Grade 1, Grade 2,...",
					text: "Grade 1, Grade 2,..."
				},
				{
					value: "Standard 1, Standard 2,...",
					text: "Standard 1, Standard 2,..."
				},
				{
					value: "Form 1, Form 2,...",
					text: "Form 1, Form 2,..."
				},
				{
					value: "class 1, class 2,...",
					text: "class 1, class 2,..."
				},
				{
					value: "Batch 1, Batch 2,...",
					text: "Batch 1, Batch 2,..."
				},
				{
					value: "year 1, year 2,...",
					text: "year 1, year 2,..."
				}
			],
			coursestream: [
				{
					value: "Arts",
					text: "Arts"
				},
				{
					value: "Classic",
					text: "Classic"
				},
				{
					value: "Drama",
					text: "Drama"
				},
				{
					value: "English",
					text: "English"
				},
				{
					value: "Maths",
					text: "Maths"
				},
				{
					value: "History",
					text: "History"
				},
				{
					value: "Music",
					text: "Music"
				}
			],
			agefrom: [
				{
					value: "1 Years",
					text: "1 Years"
				},
				{
					value: "2 Years",
					text: "2 Years"
				},
				{
					value: "3 Years",
					text: "3 Years"
				},
				{
					value: "4 Years",
					text: "4 Years"
				},
				{
					value: "5 Years",
					text: "5 Years"
				},
				{
					value: "6 Years",
					text: "6 Years"
				},
				{
					value: "7 Years",
					text: "7 Years"
				},
				{
					value: "8 Years",
					text: "8 Years"
				},
				{
					value: "9 Years",
					text: "9 Years"
				},
				{
					value: "10 Years",
					text: "10 Years"
				}
			],
			ageto: [
				{
					value: "And Above",
					text: "And Above"
				},
				{
					value: "And Below",
					text: "And Below"
				},
				{
					value: "Only",
					text: "Only"
				},
				{
					value: "2 Years",
					text: "2 Years"
				},
				{
					value: "3 Years",
					text: "3 Years"
				},
				{
					value: "4 Years",
					text: "4 Years"
				},
				{
					value: "5 Years",
					text: "5 Years"
				},
				{
					value: "6 Years",
					text: "6 Years"
				},
				{
					value: "7 Years",
					text: "7 Years"
				},
				{
					value: "8 Years",
					text: "8 Years"
				},
				{
					value: "9 Years",
					text: "9 Years"
				},
				{
					value: "10 Years",
					text: "10 Years"
				},
				{
					value: "11 Years",
					text: "11 Years"
				},
				{
					value: "12 Years",
					text: "12 Years"
				},
				{
					value: "13 Years",
					text: "13 Years"
				},
				{
					value: "14 Years",
					text: "14 Years"
				},
				{
					value: "15 Years",
					text: "15 Years"
				},
			],
			grade: [
				{
					value: "Grade 1",
					text: "Grade 1"
				},
				{
					value: "Grade 2",
					text: "Grade 2"
				},
				{
					value: "Grade 3",
					text: "Grade 3"
				},
				{
					value: "Grade 4",
					text: "Grade 4"
				},
				{
					value: "Grade 5",
					text: "Grade 5"
				},
				{
					value: "Grade 6",
					text: "Grade 6"
				},
				{
					value: "Grade 7",
					text: "Grade 7"
				},
				{
					value: "Grade 8",
					text: "Grade 8"
				},
				{
					value: "Grade 9",
					text: "Grade 9"
				},
				{
					value: "Grade 10",
					text: "Grade 10"
				}
			],
			standard: [
				{
					value: "Standard 1",
					text: "Standard 1"
				},
				{
					value: "Standard 2",
					text: "Standard 2"
				},
				{
					value: "Standard 3",
					text: "Standard 3"
				},
				{
					value: "Standard 4",
					text: "Standard 4"
				},
				{
					value: "Standard 5",
					text: "Standard 5"
				},
				{
					value: "Standard 6",
					text: "Standard 6"
				},
				{
					value: "Standard 7",
					text: "Standard 7"
				},
				{
					value: "Standard 8",
					text: "Standard 8"
				},
				{
					value: "Standard 9",
					text: "Standard 9"
				},
				{
					value: "Standard 10",
					text: "Standard 10"
				}
			],
			form :[
					{
					value: "Form 1",
					text: "Form 1"
					},
					{
					value: "Form 2",
					text: "Form 2"
					},
					{
					value: "Form 3",
					text: "Form 3"
					},
					{
					value: "Form 4",
					text: "Form 4"
					},
					{
					value: "Form 5",
					text: "Form 5"
					},
					{
					value: "Form 6",
					text: "Form 6"
					},
					{
					value: "Form 7",
					text: "Form 7"
					},
					{
					value: "Form 8",
					text: "Form 8"
					},
					{
					value: "Form 9",
					text: "Form 9"
					},
					{
					value: "Form 10",
					text: "Form 10"
					}	

			],

			class :[
					{
					value: "Class 1",
					text: "Class 1"
					},
					{
					value: "Class 2",
					text: "Class 2"
					},
					{
					value: "Class 3",
					text: "Class 3"
					},
					{
					value: "Class 4",
					text: "Class 4"
					},
					{
					value: "Class 5",
					text: "Class 5"
					},
					{
					value: "Class 6",
					text: "Class 6"
					},
					{
					value: "Class 7",
					text: "Class 7"
					},
					{
					value: "Class 8",
					text: "Class 8"
					},
					{
					value: "Class 9",
					text: "Class 9"
					},
					{
					value: "Class 10",
					text: "Class 10"
					}
			],
			batch :[
					{
					value: "Batch 1",
					text: "Batch 1"
					},
					{
					value: "Batch 2",
					text: "Batch 2"
					},

					{
					value: "Batch 3",
					text: "Batch 3"
					},
					{
					value: "Batch 4",
					text: "Batch 4"
					},
					{
					value: "Batch 5",
					text: "Batch 5"
					},
					{
					value: "Batch 6",
					text: "Batch 6"
					},
					{
					value: "Batch 7",
					text: "Batch 7"
					},
					{
					value: "Batch 8",
					text: "Batch 8"
					},
					{
					value: "Batch 9",
					text: "Batch 9"
					},
					{
					value: "Batch 10",
					text: "Batch 10"
					}
			],
			year :[
					{
					value: "year 1",
					text: "year 1"
					},
					{
					value: "year 2",
					text: "year 2"
					},

					{
					value: "year 3",
					text: "year 3"
					},
					{
					value: "year 4",
					text: "year 4"
					},
					{
					value: "year 5",
					text: "year 5"
					},
					{
					value: "year 6",
					text: "year 6"
					},
					{
					value: "year 7",
					text: "year 7"
					},
					{
					value: "year 8",
					text: "year 8"
					},
					{
					value: "year 9",
					text: "year 9"
					},
					{
					value: "year 10",
					text: "year 10"
					}
			],
			juniorlist: [
				{
					value: "Grade 11, Grade 12,...",
					text:  "Grade 11, Grade 12,..."
				},
				{
					value: "Standard 11, Standard 12,...",
					text: "Standard 11, Standard 12,..."
				},
				{
					value: "Junior College 1, Junior College 2, Junior College 3",
					text: "Junior College 1, Junior College 2, Junior College 3"
				},
				{
					value: "Diploma 1, Diploma 2, Diploma 3",
					text: "Diploma 1, Diploma 2, Diploma 3"
				},
				{
					value: "Form 11, Form 12",
					text: "Form 11, Form 12"
				},
				{
					value: "Class 11, Class 12",
					text: "Class 11, Class 12"
				},
				{
					value: "Batch 11, Batch 12",
					text: "Batch 11, Batch 12"
				},
				{
					value: "year 11, year 12",
					text: "year 11, year 12"
				},
				{
					value: "Pre University 1, Pre University 2",
					text: "Pre University 1, Pre University 2"
				},
				{
					value: "A1 level, A2 level, A3 level",
					text: "A1 level, A2 level, A3 level"
				}

			],
			juniorgradelist: [
				{
					value: "Grade 11",
					text: "Grade 11"
				},
				{
					value: "Grade 12",
					text: "Grade 12"
				}
			],
			juniorstandardlist: [
				{
					value: "Standard 11",
					text: "Standard 11"
				},
				{
					value: "Standard 12",
					text: "Standard 12"
				}
			],
			juniorformlist: [
				{
					value: "Form 11",
					text: "Form 11"
				},
				{
					value: "Form 12",
					text: "Form 12"
				}
			],
			juniordiplomalist: [
				{
					value: "Diploma 1",
					text: "Diploma 1"
				},
				{
					value: "Diploma 2",
					text: "Diploma 2"
				},
				{
					value: "Diploma 3",
					text: "Diploma 3"
				}
			],
			juniorclasslist: [
				{
					value: "class 11",
					text: "class 11"
				},
				{
					value: "class 12",
					text: "class 12"
				}
			],
			juniorbatchlist: [
				{
					value: "batch 11",
					text: "batch 11"
				},
				{
					value: "batch 12",
					text: "batch 12"
				}
			],
			junioryearlist: [
				{
					value: "year 11",
					text: "year 11"
				},
				{
					value: "year 12",
					text: "year 12"
				}
			],
			junioryearlist: [
				{
					value: "year 11",
					text: "year 11"
				},
				{
					value: "year 12",
					text: "year 12"
				}
			],

			juniorcollegelist: [
				{
					value: "college year 1",
					text: "college year 1"
				},
				{
					value: "college year 2",
					text: "college year 2"
				},
				{
					value: "college year 3",
					text: "college year 3"
				}
			],
			junioruniversitylist: [
				{
					value: "Pre University 1",
					text: "Pre University 1"
				},
				{
					value: "Pre University 2",
					text: "Pre University 2"
				}
			],
			juniorlevellist: [
				{
					value: "A1 Level",
					text: "A1 Level"
				},
				{
					value: "A2 Level",
					text: "A2 Level"
				},
				{
					value: "A3 Level",
					text: "A3 Level"
				}
			],
			universitylist: [
				{
					value: "Associate Degree year 1",
					text: "Associate Degree year 1"
				},
				{
					value: "Associate Degree year 2",
					text: "Associate Degree year 2"
				},
				{
					value: "Associate Degree year 3",
					text: "Associate Degree year 3"
				},
				{
					value: "Bachelor Degree year 1",
					text: "Bachelor Degree year 1"
				},
				{
					value: "Bachelor Degree year 2",
					text: "Bachelor Degree year 2"
				},
				{
					value: "Bachelor Degree year 3",
					text: "Bachelor Degree year 3"
				},
				{
					value: "Master Degree 1",
					text: "Master Degree 1"
				},
				{
					value: "Master Degree 2",
					text: "Master Degree 2"
				},
				{
					value: "Master Degree 3",
					text: "Master Degree 3"
				},
				{
					value: "Post Graduate 1",
					text: "Post Graduate 1"
				},
				{
					value: "Post Graduate 2",
					text: "Post Graduate 2"
				},
				{
					value: "Phd",
					text: "Phd"
				}
			]



		}

		this.handleFormChange = this.handleFormChange.bind(this)
		this.addnewcourses = this.addnewcourses.bind(this)
	}

	handleFormChange = (e) =>{
		const obj =this.state.formData
		obj[e.target.name] = e.target.value
		this.setState(obj)

	}
	addnewcourses(event){
		event.preventDefault()
			const fieldvalue = {
		      coursetitle: this.state.formData.coursetitle,
		      coursedetails: this.state.formData.coursedetails,
		      coursetype:this.state.formData.coursetype,
		      courselevel:this.state.formData.courselevel,
		      startdate:this.state.formData.startdate,
		      enddate:this.state.formData.enddate

   

		  	}
		    const options = {
		      url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/addcoursedetails`,
		      method: 'post',
		      data: fieldvalue,
		      headers: {
		        'Content-Type': 'application/json',
		        Authorization: `Bearer ${window.localStorage.authToken}`

  			  }

    		}
    		
    		console.log(fieldvalue)

    		return axios(options)
		    .then((res)=>{
		      console.log(res.data)
		    })
		    .catch((error)=>{console.log(error)})

	}
	get_courselevel(value){    
	     console.log(value)

	    this.state.levelitems=value.toString()
	     this.setState({
		levelitems:this.state.levelitems
		
	})

	    
	}
	get_studentgroup(value){ 
		console.log(value)
		 this.state.gradelist=value.toString()
		 console.log(this.state.gradelist)
		  this.setState({
		gradelist:this.state.gradelist
		
	})

	}
	get_juniorgroup(value){    
		console.log(value)
		 this.state.juniorlists=value.toString()
		 console.log(this.state.juniorlists)
		 this.setState({
		juniorlists:this.state.juniorlists
		
	})

	}	

	get_coursetype(value){    
		const items = this.state.formData
		items.coursetype = value.toString()
		this.setState({
		  items,
		})

	}


swapFormActive = (a) => (param) => (e) => {
	console.log(param)
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
  	});
  	if(param == 2)
      {
      	
      this.state.isActive1 = "active"
       this.state.isActive2 ="active"
       this.state.isActive3 = "disabled"
      }
      else if(param == 3)
      {
      	console.log(param)
      this.state. isActive1 = "active"
       this.state.isActive2 = "active"
       this.state.isActive3 = "active"
      }
      else
      {
       this.state.isActive1 = "active"
       this.state.isActive2 = "disabled"
       this.state.isActive3 = "disabled"
      }

}

startdate(event, date){
    const items = this.state.formData
    items.startdate= date
    this.setState({
      items,
    })
    
}

enddate(event, date){
	const items = this.state.formData
	items.enddate= date
	this.setState({
	  items,
	})

}

toggle = () => { 
    this.setState({
		modal: !this.state.modal
    });
}

showFileUploadToggle = () => {
    this.setState({showProfile: !this.state.showProfile})
    this.toggle()
}

handleNextPrevClick = (a) => (param) => (e) => {
	
    this.setState({
      ['formActivePanel' + a] : param,
      // ['formActivePanel' + a + 'Changed']: false

  	})  	
  	if(param == 2)
      {
      	
      this.state.isActive1 = "active"
       this.state.isActive2 ="active"
       this.state.isActive3 = "disabled"
      }
      else if(param == 3)
      {
      	console.log(param)
      this.state. isActive1 = "active"
       this.state.isActive2 = "active"
       this.state.isActive3 = "active"
      }
      else
      {
       this.state.isActive1 = "active"
       this.state.isActive2 = "disabled"
       this.state.isActive3 = "disabled"
      }

}
 onClickButton(e) {
    alert(e);
  }
   isDisabled(){
    return true;   // for disable button return true otherwise false
  }

   submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  }

addnewdepartment(){
	this.setState({
		departments:[...this.state.departments,""]
	});
  }
handlechange(e,index){
	console.log(index)
	this.state.departments[index]=e.target.value
	this.setState({
		departments:this.state.departments
	})
}
handleremove(index){
	console.log(index)
	this.state.departments.splice(index,1)
	this.setState({
		departments:this.state.departments

	})
}
createElements(n){
    var elements = [];
    for(let i =0; i < n; i++){
        elements.push(<MDBSelectOption value={i}>{i}</MDBSelectOption>);
    }
    return elements;
}

createOptionsFrom = () => {
	var selectOptions = [];
	for(let i =1; i <= 100; i++){
		selectOptions.push(<MDBSelectOption value={i}>{i}</MDBSelectOption>)
	}
	return selectOptions
}
createOptionsTo = () => {
	var selectOptions = [];
	for(let i =2; i <= 100; i++){
		selectOptions.push(<MDBSelectOption value={i}>{i}</MDBSelectOption>)
	}
	return selectOptions
}

render(){
	
	return(

		<MDBContainer fluid>
			<MDBRow>
				<MDBCol lg="12" className="mb-r">
				    <MDBCard narrow >
						<div>
							<Container>
								<h2 className="text-center pt-4 pb-5 mb-2">Add New Course</h2>			           
						      		<MDBStepper icon>
										<MDBStep far icon="folder-open" stepName="Course Details" id = "1" className={this.state.isActive1} onClick={this.swapFormActive(1)(1)}></MDBStep>
										<MDBStep icon="globe" stepName="Resources" id = "2" className={this.state.isActive2} onClick={this.swapFormActive(1)(2)}></MDBStep>
										<MDBStep icon="photo" stepName="Payment" id = "3" className={this.state.isActive3} onClick={this.swapFormActive(1)(3)}></MDBStep>
						        	</MDBStepper>	
										<form className="needs-validation" onSubmit={this.submitHandler} noValidate>
			              					 {this.state.formActivePanel1 == 1  &&
			              					 	(<Col md="12">
			              					 		<MDBRow>
				              					 		<MDBCol md="1" sm="1">
					              					 		<div className = "ali">
					              					 			<MDBIcon icon='book' float-center/>
				              					 			</div>
				              					 		</MDBCol>

				              					 		<MDBCol md="11" sm="3">
				              					 			<MDBInput type="text" className="form-control" label="coursetitle" required getValue={this.state.formData.coursetitle} onChange={e => this.handleFormChange} outline />
				              					 		</MDBCol>

			              					 			<MDBCol md="1">
			              					 			<div className = "ali">
			              					 			 	<MDBIcon icon='graduation-cap' />
		              					 			 	</div >
				              					 		</MDBCol>

				              					 		<MDBCol md="11">
															<div>
															    <MDBSelect
																	options={this.state.courselevel}
																	selected="Course Level"
																	getValue={this.get_courselevel.bind(this)}
																	onChange={() => alert('clicked')} 
																/>
									          	        	</div>
								          	        	</MDBCol>

								          	        	{(this.state.levelitems=='School') &&(
								          	        		<MDBContainer fluid>
									          	        		<MDBRow>	
										          	        		<MDBCol md="1">
							              					 		</MDBCol>
									          	        				<MDBCol col-md="11">
								              					 			<div >
								              					 			 	<MDBSelect
																					options={this.state.studentgroup}
																					selected="Students Are Generally Grouped By"
																					getValue={this.get_studentgroup.bind(this)}
																					outline
																				/>
							              					 			 	</div >
						              					 			 	</MDBCol >
					              					 			 		{this.state.gradelist=='Grade 1, Grade 2,...' &&
							              					 			 	<MDBContainer fluid>
												          	        			<MDBRow>
												          	        			<MDBCol md="1">
							              					 					</MDBCol>
									              					 			 	<MDBCol col-md="11">
											              					 			 	<MDBSelect
																								options={this.state.grade}
																								selected="Select Grade"
																								color="success"
																								outline
																								multiple
																							/>
																					</MDBCol>
								              					 			 	</MDBRow>
							              					 			 	</MDBContainer>
						              					 			 	}

						              					 			 	{this.state.gradelist=='Standard 1, Standard 2,...' &&
							              					 			 	<MDBContainer fluid>
												          	        			<MDBRow>
												          	        			<MDBCol md="1">
							              					 					</MDBCol>
									              					 			 	<MDBCol col-md="11">
											              					 			 	<MDBSelect
																								options={this.state.standard}
																								selected="Select Standard"
																								color="success"
																								outline
																								multiple
																							/>
																					</MDBCol>
								              					 			 	</MDBRow>
							              					 			 	</MDBContainer>
						              					 			 	}
						              					 			 	{this.state.gradelist=='Form 1, Form 2,...' &&
							              					 			 	<MDBContainer fluid>
												          	        			<MDBRow>
												          	        			<MDBCol md="1">
							              					 					</MDBCol>
									              					 			 	<MDBCol col-md="11">
											              					 			 	<MDBSelect
																								options={this.state.form}
																								selected="Select Form"
																								color="success"
																								outline
																								multiple
																							/>
																					</MDBCol>
								              					 			 	</MDBRow>
							              					 			 	</MDBContainer>
						              					 			 	}
						              					 			 	{this.state.gradelist=='year 1, year 2,...' &&
							              					 			 	<MDBContainer fluid>
												          	        			<MDBRow>
												          	        			<MDBCol md="1">
							              					 					</MDBCol>
									              					 			 	<MDBCol col-md="11">
											              					 			 	<MDBSelect
																								options={this.state.year}
																								selected="Select Year"
																								color="success"
																								outline
																								multiple
																							/>
																					</MDBCol>
								              					 			 	</MDBRow>
							              					 			 	</MDBContainer>
						              					 			 	}
						              					 			 	{this.state.gradelist=='class 1, class 2,...' &&
							              					 			 	<MDBContainer fluid>
												          	        			<MDBRow>
												          	        			<MDBCol md="1">
						              					 						</MDBCol>
									              					 			 	<MDBCol col-md="11">
											              					 			 	<MDBSelect
																								options={this.state.class}
																								selected="Select Class"
																								color="success"
																								outline
																								multiple
																							/>
																					</MDBCol>
								              					 			 	</MDBRow>
							              					 			 	</MDBContainer>
						              					 			 	}
						              					 			 	{this.state.gradelist=='Batch 1, Batch 2,...' &&
							              					 			 	<MDBContainer fluid>
												          	        			<MDBRow>
												          	        			<MDBCol md="1">
							              					 					</MDBCol>
									              					 			 	<MDBCol col-md="11">
											              					 			 	<MDBSelect
																								options={this.state.batch}
																								selected="Select Batch"
																								color="success"
																								outline
																								multiple
																							/>
																					</MDBCol>
								              					 			 	</MDBRow>
							              					 			 	</MDBContainer>
						              					 			 	}
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1">
								              					 				</MDBCol>
								              					 			 	<MDBCol col-md="6">
																					<MDBSelect outline>
																						<MDBSelectInput selected="Age From" />
																						<MDBSelectOptions >
																							<MDBSelectOption disabled>Age From</MDBSelectOption>
																							{this.createOptionsFrom()}
																						</MDBSelectOptions>
																					</MDBSelect>
																				</MDBCol>
																				<MDBCol col-md="6">
																					<MDBSelect outline>
																						<MDBSelectInput selected="Age To" />
																						<MDBSelectOptions >
																							<MDBSelectOption>And Above</MDBSelectOption>
																							<MDBSelectOption>And Below</MDBSelectOption>
																							<MDBSelectOption>Only</MDBSelectOption>
																							{this.createOptionsTo()}
																						</MDBSelectOptions>
																					</MDBSelect>
								              					 			 	</MDBCol>
							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
						              					 			 	<MDBContainer fluid>
						              					 			 		<MDBRow>
								              					 			 	<MDBCol md="1">
										              					 			</MDBCol>
								              					 			 		<MDBCol col-md="11">
									              					 			 	<MDBSelect
									              					 			 		multiple
																						options={this.state.coursestream}
																						selected="Course Stream"
																						color="success"
																						outline
																					/>
																				</MDBCol>
																			</MDBRow>
																		</MDBContainer>
						              					 		</MDBRow>
					              					 		</MDBContainer>
								          	        	)}
								          	        	{this.state.levelitems=='11th-12th/ Junior College/ Diploma' &&
			              					 			 	<MDBContainer fluid>
								          	        			<MDBRow>
									          	        			<MDBCol md="1" sm="1">
							              					 		</MDBCol>
					              					 			 	<MDBCol col-md="11">
							              					 			 	<MDBSelect
																				options={this.state.juniorlist}
																				selected="Select From Below List"
																				color="success"
																				getValue={this.get_juniorgroup.bind(this)}
																				outline
																			/>
																	</MDBCol>
																	{this.state.juniorlists=='Grade 11, Grade 12,...' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.juniorgradelist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>
							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
		              					 			 				}
		              					 			 				{this.state.juniorlists=='Standard 11, Standard 12,...' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.juniorstandardlist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>
							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
		              					 			 				}
		              					 			 				{this.state.juniorlists=='Junior College 1, Junior College 2, Junior College 3' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.juniorcollegelist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>

							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
	              					 			 					}
	              					 			 					{this.state.juniorlists=='Diploma 1, Diploma 2, Diploma 3' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.juniordiplomalist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>

							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
	              					 			 					}	{this.state.juniorlists=='Form 11, Form 12' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.juniorformlist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>

							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
	              					 			 					}
              					 			 						{this.state.juniorlists=='Class 11, Class 12' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.juniorclasslist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>

							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
	              					 			 					}
	              					 			 					{this.state.juniorlists=='Batch 11, Batch 12' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.juniorbatchlist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>

							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
	              					 			 					}
	              					 			 					{this.state.juniorlists=='year 11, year 12' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.junioryearlist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>

							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
	              					 			 					}
	              					 			 					{this.state.juniorlists=='Pre University 1, Pre University 2' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.junioruniversitylist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>

							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
	              					 			 					}
	              					 			 					{this.state.juniorlists=='A1 level, A2 level, A3 level' &&
						              					 			 	<MDBContainer fluid>
											          	        			<MDBRow>
												          	        			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
										              					 			 	<MDBSelect
																							options={this.state.juniorlevellist}
																							selected="Select From Below List"
																							color="success"
																							outline
																							multiple
																						/>
																				</MDBCol>

							              					 			 	</MDBRow>
						              					 			 	</MDBContainer>
	              					 			 					}
	              					 			 					 	<MDBContainer fluid>
						              					 			 		<MDBRow>
						              					 			 			<MDBCol md="1" sm="1">
										              					 		</MDBCol>
								              					 			 	<MDBCol col-md="11">
									              					 			 	<MDBSelect
									              					 			 		multiple
																						options={this.state.coursestream}
																						selected="Course Stream"
																						color="success"
																						outline
																					/>
																				</MDBCol>
																			</MDBRow>
																		</MDBContainer>
				              					 			 	</MDBRow>
			              					 			 	</MDBContainer>
		              					 			 	}
								          	        	{this.state.levelitems=='University' &&
							          	        			<MDBContainer fluid>
								          	        			<MDBRow>
									          	        			<MDBCol md="1" sm="1">
							              					 		</MDBCol>
					              					 			 	<MDBCol col-md="11">
							              					 			 	<MDBSelect
																				options={this.state.universitylist}
																				selected="Select From Below List"
																				color="success"
																				outline
																			/>
																	</MDBCol>
																</MDBRow>
																<MDBRow>
			              					 			 			<MDBCol md="1" sm="1">
							              					 		</MDBCol>
					              					 			 	<MDBCol col-md="11">
						              					 			 	<MDBSelect
						              					 			 		multiple
																			options={this.state.coursestream}
																			selected="Course Stream"
																			color="success"
																			outline
																		/>
																	</MDBCol>
																</MDBRow>
																<MDBRow>
									          	        			<MDBCol md="1" sm="1">
							              					 		</MDBCol>
																		<MDBCol col-md="11">
																			<div>
																				<MDBInput
																					type="text"
																					label="Enter Your Department"
																					rows="1"
																					outline 
																				/>
																			</div>
																		</MDBCol>
																</MDBRow>
																<MDBRow>
																	<MDBCol md="1" sm="1">
							              					 		</MDBCol>
							              					 		<MDBCol col-md="11">
							              					 			
																			<div>
																		        {
																					this.state.departments.map((department, index)=>{
																						return(
																							<div key={index}>
																								<MDBContainer fluid>
								        					 										<MDBRow>
								        					 											<MDBCol col md="11">
																											<MDBInput type="text" rounded value={department} onChange={(e)=>this.handlechange(e,index)} outline label="Enter Your Department"></MDBInput>
																										</MDBCol>
																										<MDBCol col md="1">
																											<MDBIcon className="ali" icon="trash" onClick={()=>this.handleremove(index)}></MDBIcon>
																										</MDBCol>
																									</MDBRow>
																								</MDBContainer>
																							</div>

																						)
																					})

																		        }
																	        </div>
																        
												        			<MDBBtn color="warning" size="sm" rounded onClick={(e)=>this.addnewdepartment(e)}>ADD  Department</MDBBtn>
												        			</MDBCol>
												        		</MDBRow>
															</MDBContainer>
								          	        	}
								          	        	{this.state.levelitems=='Professional' &&
															<MDBContainer fluid>
								          	        			<MDBRow>
									          	        			<MDBCol md="1" sm="1">
									          	        			</MDBCol>
						              					 			 	<MDBCol col-md="6">
							              					 			 	<MDBSelect outline>
																				<MDBSelectInput selected="Age From" />
																				<MDBSelectOptions >
																					<MDBSelectOption disabled>Age From</MDBSelectOption>
																					{this.createOptionsFrom()}
																				</MDBSelectOptions>
																			</MDBSelect>
																		</MDBCol>
																		<MDBCol col-md="6">
																			<MDBSelect outline>
																				<MDBSelectInput selected="Age To" />
																				<MDBSelectOptions >
																					<MDBSelectOption>And Above</MDBSelectOption>
																					<MDBSelectOption>And Below</MDBSelectOption>
																					<MDBSelectOption>Only</MDBSelectOption>
																					{this.createOptionsTo()}
																				</MDBSelectOptions>
																			</MDBSelect>
						              					 			 	</MDBCol>
				              					 			 	</MDBRow>
			              					 			 	</MDBContainer>
								          	        	}
								          	        	{this.state.levelitems=='Others' &&
															<MDBContainer fluid>
								          	        			<MDBRow>
									          	        			<MDBCol md="1" sm="1">
									          	        			</MDBCol>
									          	        			<MDBCol col-md="11">
							              					 			<div>
																			<MDBInput
																				type="text"
																				label="Others"
																				rows="1"
																				outline 
																			/>
																			</div>
					              					 			 	</MDBCol>
				              					 			 	</MDBRow>
			              					 			 		<MDBRow>
		              					 			 				<MDBCol md="1" sm="1">
								          	        				</MDBCol>
					              					 			 	<MDBCol col-md="6">
						              					 			 	<MDBSelect outline>
																			<MDBSelectInput selected="Age From" />
																			<MDBSelectOptions >
																				<MDBSelectOption disabled>Age From</MDBSelectOption>
																				{this.createOptionsFrom()}
																			</MDBSelectOptions>
																		</MDBSelect>
																	</MDBCol>
																	<MDBCol col-md="6">
																		<MDBSelect outline>
																			<MDBSelectInput selected="Age To" />
																			<MDBSelectOptions >
																				<MDBSelectOption>And Above</MDBSelectOption>
																				<MDBSelectOption>And Below</MDBSelectOption>
																				<MDBSelectOption>Only</MDBSelectOption>
																				{this.createOptionsTo()}
																			</MDBSelectOptions>
																		</MDBSelect>
				              					 			 		</MDBCol>	
			              					 			 		</MDBRow>
			              					 			 	</MDBContainer>
								          	        	}

														<MDBCol md="1">
														<div className = "ali">
															<Fa icon='balance-scale' />
														</div>
														</MDBCol>

														<MDBCol md="11">
															<div>
																<MDBSelect
																	options={this.state.coursetype}
																	selected="Course Type"
																/>
															</div>
														</MDBCol>
														<MDBCol md="1">
														<div className = "ali">
															<Fa icon='pencil' />
														</div>
														</MDBCol>

														<MDBCol md="11">
															<div>
																<MDBInput
																	type="textarea"
																	label="Enter course description"
																	rows="1"
																	getValue={this.state.formData.coursedetails}
																	onChange={e => this.handleFormChange} 
																outline />
															</div>
														</MDBCol>
														<MDBContainer fluid>
															<MDBRow>
																<MDBCol md="1">
																<div className = "ali">
																	<Fa icon='calendar' />
																</div>
																</MDBCol>
																<MDBCol md="5">
																  <MuiThemeProvider>
												                    <DatePicker 
												                      style={{borderBottom: '1px solid #bdbdbd', height: '3rem'}} 
												                      id="startdate" textFieldStyle={{width: '100%'}} 
												                      hintText="Course Start date" 
												                      onChange={this.startdate.bind(this)}
												                      value={this.state.formData.startdate}>
												                      </DatePicker>
												                  </MuiThemeProvider>
																</MDBCol>
																<MDBCol md="5">
																  <MuiThemeProvider>
												                    <DatePicker 
												                      style={{borderBottom: '1px solid #bdbdbd', height: '3rem'}} 
												                      id="startdate" textFieldStyle={{width: '100%'}} 
												                      hintText="Course End date" 
												                      onChange={this.enddate.bind(this)}
												                      value={this.state.formData.enddate}>
											                      	</DatePicker>
												                  </MuiThemeProvider>
																</MDBCol>
															</MDBRow>
														</MDBContainer>
													</MDBRow>  
													<br/>
													
													<MDBRow>
														<MDBCol md="1">
														</MDBCol>
														<MDBCol md="11">
															<Logo 
																sendToggleFunction={this.showFileUploadToggle}
																previousProfileImg={this.state.imageurl} 
															/>
														</MDBCol>
													</MDBRow>
													<br/>  
													<hr/>  
													<MDBRow>
														<MDBCol md="1">
															<div className = "ali">
																<Fa icon='pencil' />
															</div>
														</MDBCol>
														<MDBCol md="11">
							                              	<div>
																<MDBChipsInput placeholder="Enter tags to search" secondaryPlaceholder="Enter a tag" outline/>
													        </div>
												        </MDBCol>
											        </MDBRow>
												        <br/>
												       	
											        <div>
								                    	<MDBBtn color="cyan" size="md" type="primary" onClick={this.addnewcourses}>ADD</MDBBtn>
								                    	<MDBBtn color="secondary" size="md" rounded className="float-right" onClick={this.handleNextPrevClick (1)(2)}  type="submit" >next</MDBBtn>
								                 	 </div>
								            	     
								          </Col>)}
											 	 	{this.state.formActivePanel1 == 2  &&	
											 	 		(<Col md="12">
											 	 				<Modules/>
											 	 				<br />
											 	 				<div>
											 	 					<MDBBtn color="primary" size="md"rounded onClick={this.handleNextPrevClick (1)(1)}  type="submit" >Previous</MDBBtn>
											                    	<MDBBtn color="secondary" size="md" rounded className="float-right" onClick={this.handleNextPrevClick (1)(3)}  type="submit" >next</MDBBtn>
											                 	 </div>
											 	 	</Col>)}
											 	 	{this.state.formActivePanel1 == 3  &&	
											 	 		(<Col md="12">
											 	 				<h2> Third page</h2>
											 	 				<div>
											 	 					<MDBBtn color="primary" size="md" rounded onClick={this.handleNextPrevClick (1)(2)}  type="submit" >Previous</MDBBtn>
											                    	<MDBBtn color="success" size="md" rounded className="float-right" type="submit" >Save</MDBBtn>
											                 	 </div>
											 	 	</Col>)}  			
										</form>			
							</Container>
						</div>
					</MDBCard >

				</MDBCol>
			</MDBRow>
		</MDBContainer>

	)

	}

}

export default NewCourse