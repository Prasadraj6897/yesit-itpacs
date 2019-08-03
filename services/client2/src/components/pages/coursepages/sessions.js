import React from 'react';
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
	MDBStepper, MDBStep, MDBSelect, MDBIcon, MDBDatePicker, MDBChipsInput,MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBProgress
} from 'mdbreact';
import './newcourse.css'
import axios from 'axios'

class Session extends React.Component{
	constructor(props){
		super(props)
			this.state={
				nosession:true,
			}
	}

	render(){
		return(
			<div class="contentbox">
				<h6 class="mb-0 font-weight-bold">Session/ Events</h6>
				<MDBBtn color="primary" size="md" rounded type="submit" >Create new Session/ Event</MDBBtn>
				{(this.state.nosession) && (
					<p class="text-muted" className="text-center pt-4 pb-5 mb-2">
						You have no session/ events yet. Click here to add a Session/ Event. 
					</p> 
				)}
			</div>
		)
	}
}
export default Session
