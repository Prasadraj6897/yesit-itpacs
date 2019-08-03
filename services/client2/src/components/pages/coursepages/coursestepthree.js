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
  SideNavLink,
  MDBStepper, MDBStep, MDBSelect, MDBIcon, MDBDatePicker, MDBChipsInput,MDBSelectInput, MDBSelectOptions, MDBSelectOption
} from 'mdbreact';
import Payments from './payments.js'

class CreateCourse extends React.Component{

	constructor(props){
		super(props)
		this.state={
			courseId:props.match.params.courseid,
			redirect: false,
			page: "/createcourse/stepone"
		}
	}

	navigatepageredirect(event, p){
		this.setState({
			redirect: true
		})

		if(event == "page1"){
			this.setState({
				page: "/createcourse/stepone"
			})
		}else if(event == "page2"){
			this.setState({
				page: "/createcourse/steptwo"
			})
		}else if(event == "page3"){
			this.setState({
				page: "/createcourse/stepthree"
			})
		}
	}

	navigatepage(){
		if (this.state.redirect){
			const path=this.state.page+"/"+this.state.courseId
			return <Redirect to={path} />
		}
	}

	render(){
		return(
			<MDBContainer>
				<MDBStepper form>
	                <MDBStep form>
	                		{this.navigatepage()}
                    		<MDBBtn color="indigo" circle onClick={this.navigatepageredirect.bind(this,"page1")} >
                      		1
                    		</MDBBtn>
	                  	<p>Course</p>
	                </MDBStep>
	                <MDBStep form>
	                    	<MDBBtn color="indigo" circle onClick={this.navigatepageredirect.bind(this,"page2")} >
	                      	2
	                    	</MDBBtn>
	                  	<p>Resources</p>
	                </MDBStep>
	                <MDBStep form>
	                    	<MDBBtn color="indigo" circle onClick={this.navigatepageredirect.bind(this,"page3")} >
	                      	3
	                    	</MDBBtn>
	                  	<p>Payment</p>
	                </MDBStep>
				</MDBStepper>
				

				<MDBCard narrow >
					<MDBView cascade className="mdb-color lighten-3 card-header">
	                	<h5 className="mb-0 font-weight-bold text-center text-white">Payment</h5>
	              	</MDBView>
					<MDBContainer>
						<br/>
						<Payments 
							courseid= {this.state.courseId}
						/>

						{/*Bottom buttons*/}
						<MDBRow>
							<MDBCol lg="12" className="mb-r">
								<MDBBtn color="default" onClick={this.navigatepageredirect.bind(this,"page2")} >
								Previous
								</MDBBtn>
								<MDBBtn color="primary" onClick={this.navigatepageredirect.bind(this,"page3")} >
								Save
								</MDBBtn>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</MDBCard>

			</MDBContainer>
		)
	}

}

export default CreateCourse;