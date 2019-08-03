import React from 'react'
import {Link} from 'react-router-dom'
import { HashRouter as Router } from 'react-router-dom';
import { Route, NavLink, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact'
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
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBProgress,
  MDBIcon,
  MDBBadge,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane,
} from 'mdbreact';


class CourseDetails extends React.Component{

	constructor(props){
		super(props)
		this.state = {		
			courseId: props.match.params.courseid,
			CourseLogo: '',
			CourseName: '',
			CourseDescription: '',
			activeItem: "1",
			courses: []
		}
	}

	componentDidMount(){
		this.getCourseDetails()
	}

	getCourseDetails(){
		const options = {
	      url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getCourseDetails`,
	      method: 'post',
	      data: {CourseId:this.state.courseId},
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${window.localStorage.authToken}`
	      }
	    }
	    return axios(options)
	    .then((res)=>{
	      // console.log(res.data.coursedata)
	      const ObjData = res.data.coursedata[0]
	      this.setState({
	      	courses: res.data.coursedata,
	      	CourseName: ObjData['CourseName']
	      })
	    })
	    .catch((error)=>{console.log(error)})
	}

	toggle = tab => e => {
		if (this.state.activeItem !== tab) {
			this.setState({
				activeItem: tab
			});
		}
	};

	render(){

		return(
			<div>
    			<MDBCard narrow>
	    			<MDBView cascade className="mdb-color lighten-3 card-header">
						<h5 className="mb-0 font-weight-bold text-center text-white">
							{this.state.CourseName}
						</h5>
					</MDBView>
					<MDBCardBody>
						<br />
						<MDBRow>
							{
								this.state.courses.length == 0 ?
			            			<MDBCol md="12">
			            				<div className="customBox padding70px text-center text-primary">
			            					No Record Found
			            				</div>
			            			</MDBCol >
			            			: 
									this.state.courses.map((course, i)=>{
										let path = "coursedetails/"+course['_id']['$oid']

										const CourseLevel = course.courselevel.map(function(cl){
											return(
												<div><b>Course Level:</b> {cl.CourseLevelName}</div>
											)
										})
										const CourseType = course.CourseTypeId == 1 ? "Official" : "Tuition/ Training"
										const AgeSplitter = course.AgeTo.length > 4 ? "":"-"

										return(
											<MDBCol md="12">
												<div className="customBox padding10px marginBottom10px">
													{/* Course Basic Information */}
													<MDBRow>
														{/* Course Image */}
														<MDBCol md="3">
															<MDBCardImage 
																className="img-fluid" 
																src={course.CourseLogo}
																style={{borderRadius: course.CourseLogoRadius+'px'}}
															/>
														</MDBCol>

														{/* Course Details */}
														<MDBCol md="9">
															
															{/* Course Options */}
															<MDBDropdown className="TopRightCorner" size="sm">
														      <MDBDropdownToggle caret color="light-blue">
														        Options
														      </MDBDropdownToggle>
														      <MDBDropdownMenu basic>
														        <MDBDropdownItem>Send Payment Link</MDBDropdownItem>
														        <MDBDropdownItem>Copy</MDBDropdownItem>
														        <MDBDropdownItem>Edit</MDBDropdownItem>
														        <MDBDropdownItem>Create New Batch</MDBDropdownItem>
														      </MDBDropdownMenu>
														    </MDBDropdown>

															<MDBCardText>
																{course.CourseDescription}
															</MDBCardText>
															<div>
																{CourseLevel}
																<div><b>For:</b> {course.CourseIsForName}</div>
																<div><b>Type:</b> {CourseType}</div>
																<div><b>Streams:</b> {course.CourseFallStreamName}</div>
															</div>
															<div>
																<MDBBadge color="default">Free</MDBBadge> |&nbsp;
																<MDBBadge color="danger">$30.00</MDBBadge> |&nbsp;
																<MDBBadge color="light">Published</MDBBadge> |&nbsp;
																<MDBBadge color="info">Not Published</MDBBadge>
															</div>
														</MDBCol>
													</MDBRow>
													<hr/>
													<MDBRow>
														{/* Left Rating Progress Bar Section */}
														<MDBCol md="8">
															<MDBRow>
																<MDBCol className="RightBoldLabel" md="6">
																	Rating:
																</MDBCol>
																<MDBCol md="6">
																	<MDBProgress value={25} className="my-2" />
																</MDBCol>
															</MDBRow>
															<MDBRow>
																<MDBCol className="RightBoldLabel" md="6">
																	Allowed Students:
																</MDBCol>
																<MDBCol md="6">
																	-
																</MDBCol>
															</MDBRow>
															<MDBRow>
																<MDBCol className="RightBoldLabel" md="6">
																	Age From - To:
																</MDBCol>
																<MDBCol md="6">
																	{course.AgeFrom}&nbsp;
																	{AgeSplitter}&nbsp;
																	{course.AgeTo} 
																</MDBCol>
															</MDBRow>
															<MDBRow>
																<MDBCol className="RightBoldLabel" md="6">
																	Enrolled Students:
																</MDBCol>
																<MDBCol md="6">
																	8
																</MDBCol>
															</MDBRow>
															<MDBRow>
																<MDBCol className="RightBoldLabel" md="6">
																	Pending Students:
																</MDBCol>
																<MDBCol md="6">
																	-
																</MDBCol>
															</MDBRow>
															<MDBRow>
																<MDBCol className="RightBoldLabel" md="6">
																	Student Grade:
																</MDBCol>
																<MDBCol md="6">
																	<MDBProgress value={45} className="my-2" color="success" />
																</MDBCol>
															</MDBRow>
															<MDBRow>
																<MDBCol className="RightBoldLabel" md="6">
																	Belongs To:
																</MDBCol>
																<MDBCol md="6">
																	Anna University
																</MDBCol>
															</MDBRow>
														</MDBCol>
														{/* End Left Rating Progress Bar Section */}

														{/* Right Assignment count Section */}
														<MDBCol md="4" className="CourseResourcesCls">
															<div>
																<i class="fa fa-video-camera"></i> Video Lectures (0)
															</div>
															<div>
																<i class="fa fa-file-text"></i> Assignments (8)
															</div>
															<div>
																<i class="fa fa-file"></i> Handouts (0)
															</div>
															<div>
																<i class="fa fa-desktop"></i> Live Sessions (0)
															</div>
														</MDBCol>
														{/* End Right Assignment count Section */}
													</MDBRow>
													{/* End Course Basic Information */}

													<hr/>
													{/* Course Resource Section */}
													<MDBRow>
														<MDBCol>
															<MDBNav className="nav-tabs mt-5">
																<MDBNavItem>
																	<MDBNavLink to="#" className={this.state.activeItem === "1" ? "active" : ""} onClick={this.toggle("1")} role="tab" >
																		INDEX
																	</MDBNavLink>
																</MDBNavItem>
																<MDBNavItem>
																	<MDBNavLink to="#" className={this.state.activeItem === "2" ? "active" : ""} onClick={this.toggle("2")} role="tab" >
																		BROADCAST
																	</MDBNavLink>
																</MDBNavItem>
																<MDBNavItem>
																	<MDBNavLink to="#" className={this.state.activeItem === "3" ? "active" : ""} onClick={this.toggle("3")} role="tab" >
																		MODULE
																	</MDBNavLink>
																</MDBNavItem>
															</MDBNav>
															<MDBTabContent activeItem={this.state.activeItem} >
																<MDBTabPane tabId="1" role="tabpanel">
																	<p className="mt-2">
																		Lorem ipsum dolor sit amet, consectetur adipisicing elit.
																		Nihil odit magnam minima, soluta doloribus reiciendis
																		molestiae placeat unde eos molestias. Quisquam aperiam,
																		pariatur. Tempora, placeat ratione porro voluptate odit
																		minima.
																	</p>
																</MDBTabPane>
																<MDBTabPane tabId="2" role="tabpanel">
																	<p className="mt-2">
																		Quisquam aperiam, pariatur. Tempora, placeat ratione porro
																		voluptate odit minima. Lorem ipsum dolor sit amet,
																		consectetur adipisicing elit. Nihil odit magnam minima,
																		soluta doloribus reiciendis molestiae placeat unde eos
																		molestias.
																	</p>
																	<p>
																		Quisquam aperiam, pariatur. Tempora, placeat ratione porro
																		voluptate odit minima. Lorem ipsum dolor sit amet,
																		consectetur adipisicing elit. Nihil odit magnam minima,
																		soluta doloribus reiciendis molestiae placeat unde eos
																		molestias.
																	</p>
																</MDBTabPane>
																<MDBTabPane tabId="3" role="tabpanel">
																	<p className="mt-2">
																		Quisquam aperiam, pariatur. Tempora, placeat ratione porro
																		voluptate odit minima. Lorem ipsum dolor sit amet,
																		consectetur adipisicing elit. Nihil odit magnam minima,
																		soluta doloribus reiciendis molestiae placeat unde eos
																		molestias.
																	</p>
																</MDBTabPane>
															</MDBTabContent>
														</MDBCol>
													</MDBRow>
													{/* End Course Resource Section */}
												</div>
							              </MDBCol>
										)
									})
							}		           
						</MDBRow>

					</MDBCardBody>
				</MDBCard>
		    </div>
		)
	}

}

export default CourseDetails;