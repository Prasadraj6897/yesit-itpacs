import React from 'react'
import {Link, Redirect} from 'react-router-dom'
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
} from 'mdbreact';

import axios from 'axios';

class Courses extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			redirect: false,
			courses: [],
		}
		this.getnewcourses = this.getnewcourses.bind(this)
	}

	getnewcourses(event){

		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getMyCourseLists`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}

		return axios(options)
			.then((res)=>{
				this.setState({
					courses: res.data.courses
				})
				console.log(res.data.courses)
			})
			.catch((error)=>{console.log(error)})
	}

	componentDidMount(){
		this.getnewcourses()
	}

	setRedirect = () => {
		this.setState({
			redirect: true
		})
	}

	render(){
    	return(
    		<div>
    			<MDBCard narrow>
	    			<MDBView cascade className="mdb-color lighten-3 card-header">
						<h5 className="mb-0 font-weight-bold text-center text-white">
							My Course(s)
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
															<MDBCardTitle className="text-primary">
																<Link to={path} className="collapsible-header">
																	{course.CourseName}
																</Link>
															</MDBCardTitle>
															
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


export default Courses;