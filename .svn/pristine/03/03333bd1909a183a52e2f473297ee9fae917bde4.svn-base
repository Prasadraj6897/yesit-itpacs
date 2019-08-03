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
	MDBStepper, MDBStep, MDBSelect, MDBIcon, MDBDatePicker, MDBChipsInput,MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBFormInline, MDBPopover, MDBPopoverBody, MDBPopoverHeader,
} from 'mdbreact';
import './newcourse.css'
import axios from 'axios'
import{Paymentrules} from './course_form_rules.js'
import CourseError from './course_field_error.js'

class Payments extends React.Component{

	constructor(props){
		super(props)
		this.state={
			courseId: this.props.courseid,
			paid:true,
			editState:true,
			newedit:false,
			userDetails: [],
			userAccountDetails: [],
			formData:{
				maxusers:0,
				notificationStatus: '',
				email: '',
				radio: 2,
				fees: '',
				password: '',
				currencyCode: '',
			},
			rows: [],
			batches_lists: [],
			Paymentrules:Paymentrules,
			valid:true,
			password:"",
			currency:false
		}
		this.notificationstatus = this.notificationstatus.bind(this)
	}

	editpayment=()=>{
		this.state.editState = false,
		this.state.newedit = true,
		this.setState({
			editState: this.state.editState,
			newedit: this.state.newedit
		})
	}

	getUserDetails(event){
		const options = {
			url: `${process.env.REACT_APP_USERS_SERVICE_URL}/users/userbasicdetails`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			this.setState({
				userDetails: res.data.data,
				userAccountDetails: res.data.data.accountdetails[0]
			})
			console.log(this.state.userDetails)
		})
		.catch((error)=>{console.log(error)})
	}

	componentDidMount(){
		this.getUserDetails()
		this.getCourseBatches()
	}

	radio = (value) => () => {
		const obj = this.state.formData
		obj['radio'] = value
		this.setState({
			obj
		});
		if(value==1)
		{
			this.setState({
				paid:false,
			})
		}
		else{
			this.setState({
				paid:true
			})
		}
	}
	
	cancel(){
		this.setState({
			editState:true,
			newedit:false,
		})
	}

	maxuserchange(e){
		const re = /^[0-9\b]+$/;

		// if value is not blank, then test the regex
		if (e.target.value === '' || re.test(e.target.value)) {
			const obj = this.state.formData
			obj['maxusers'] = e.target.value
			this.setState({obj})
		}
	}

	handlechange(e){
		const obj = this.state.formData
		obj[e.target.name] = e.target.value
		this.setState(obj)
		this.formvalid()
	}

	getcurrencytype(e){
		const formRules=this.state.Paymentrules
		var currencytype=e.toString()
		const obj = this.state.formData
		obj['currencyCode'] = currencytype

		if(currencytype == '')
		{
			obj['currencyCode'] = ''
			this.state.currency=false
			this.setState({
				currency:this.state.currency,
				obj
			})
		}
		else
		{
			this.state.currency=true
			this.setState({
				currency:this.state.currency,
				obj
			})
			
		}
		this.formvalid()
	}

	formvalid(){
		const formRules=this.state.Paymentrules

		var emailre= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		var feesre = /^[0-9\b]+$/;

		{/*Email Validation*/}
		if (emailre.test(this.state.formData.email)){
			formRules[0].valid = true
		}
		else{
			formRules[0].valid = false
		}

		{/*Fees Validation*/}
		if(feesre.test(this.state.formData.fees) && (this.state.formData.fees)!="" && this.state.currency){
			formRules[1].valid = true
		}
		else{
			formRules[1].valid = false
		}

		{/*Password Validation*/}
		if(this.state.formData.password.length>=8){
			formRules[2].valid = true
		}
		else{
			formRules[2].valid = false
		}

	}

	notificationstatus(event){
		const name = event.toString()
		const obj = this.state.formData
		obj['notificationStatus'] = name
		this.setState(obj)
	}

	formsubmit(){
		console.log(this.state.formData)
	}

	handleChangeBatch = idx => e => {
		const { name, value } = e.target;
		const rows = [...this.state.rows];
		rows[idx] = {
			[name]: value
		};
		this.setState({
			rows
		});
	};

	handleAddRow = () => {
		const item = {
			name: ""
	    };
		this.setState({
			rows: [...this.state.rows, item]
		});
	};

	handleRemoveRow(i){
		let data = [...this.state.rows]
		data.splice(i, 1)
		this.setState({
			rows: data
		});
	};

	insertCourseBatch(i){
		let data = [...this.state.rows]
		const batchName = data[i].module
		const courseid = this.state.courseId

		const options = {
	      url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/insertCourseBatch`,
	      method: 'post',
	      data:{'courseid': courseid,'batchname': batchName},
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${window.localStorage.authToken}`
	      }
	    }
	    return axios(options)
	    .then((res)=>{
	      	this.getCourseBatches()
	      	data.splice(i, 1)
			this.setState({
				rows: data
			});
	    })
	    .catch((error)=>{console.log(error)})
	}

	getCourseBatches(){
		const courseid = this.state.courseId

		const options = {
	      url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getCourseBatches`,
	      method: 'post',
	      data:{'courseid': courseid},
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${window.localStorage.authToken}`
	      }
	    }
	    return axios(options)
	    .then((res)=>{
	      this.setState({
	      	batches_lists : res.data.batches
	      })
	    })
	    .catch((error)=>{console.log(error)})
	}


	render(){
		let formRules=this.state.Paymentrules
		return (
			<div class="contentbox EnrollmentFormCls">
				<MDBRow>
					<MDBCol md="12" >
						<label class="mb-0 font-weight-bold" >Enrollment Settings</label>
						<br/>
						<br/>
						<MDBRow>
							<MDBCol md="12" >
								<label><b>Max Users</b></label>
								<MDBInput type="text" outline name="maxusers" onChange={(e)=>this.maxuserchange(e)} value={this.state.formData.maxusers}/>
								<span class="text-leftalign">'Enrollments Full' will appear in the published courses, after the enrollment reaches maximum.	</span>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol md="12" >
								<label><b>Notification</b></label>
								<MDBSelect outline 
									color="primary"
									getValue={this.notificationstatus}
								>
									<MDBSelectInput selected="Select" />
									<MDBSelectOptions>
										<MDBSelectOption value="1" >Yes</MDBSelectOption>
										<MDBSelectOption value="0" >No</MDBSelectOption>
									</MDBSelectOptions>
								</MDBSelect>
								<span class="text-leftalign">A message will be triggered to the default email id when people enroll for this course.</span>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol md="12" >
								<label><b>Default Email</b> *</label>
								<MDBInput type="text" outline value={this.state.userDetails.email} onChange={(e)=>this.handlechange(e)} name='email'/>
								<span class="text-leftalign">This is the email which will be used to communicate information regarding this course.</span>
								<br />
								<CourseError
									formRulesObject={formRules[0]}
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol md="12" >
								<label><b>Fees</b> *</label>
								 <MDBFormInline>
									<MDBInput gap onClick={this.radio(1)} checked={this.state.formData.radio===1 ? true : false} label="Free" type="radio" id="radio1" />
									<MDBInput gap onClick={this.radio(2)} checked={this.state.formData.radio===2 ? true : false} label="Paid" type="radio" id="radio2" />
								 </MDBFormInline>
							 </MDBCol>
						</MDBRow>

						 {(this.state.paid) &&(
						 	<div>
						 		<MDBRow>
							 		<MDBCol md="6">
							 		<label><b>Fees $*</b></label>
							 			<MDBInput type="text" outline value={this.state.fees} onChange={(e)=>this.handlechange(e)} name="fees"/>
						 			</MDBCol>
						 			<MDBCol md="6">
						 				<label>&nbsp;</label>
							 			<MDBSelect outline color="primary" getValue={(e)=>this.getcurrencytype(e)}>
											<MDBSelectInput selected="Select" />
											<MDBSelectOptions>
												<MDBSelectOption value="USD">USD</MDBSelectOption>
											</MDBSelectOptions>
										</MDBSelect>
									</MDBCol>
					 			</MDBRow>
				 				<CourseError
									formRulesObject={formRules[1]}
								/>
					 			
					 			<MDBRow>
									<MDBCol md="12" >
										<label><b>Service Charges</b></label>
						 				<span class="text-desc">Service charges include taxes, administration, charity to sponsor education, bank transaction and iNrutura fees. This is collected as a percentage of the fees from students (approximately 20%). Example, if you price your course fees as $ 10, we will collect $ 12 from the learner. You will get paid $10. Course creators get paid the full course fees as indicated in the fees field.	</span>
							 			<br />
							 			<label><b>Payment Process</b></label>
							 			<span class="text-desc">Payments collected from learners will be transferred to your Paypal account within 5 weeks from date of purchase after deducting the service fees provided there are no refund claims or disputes. In case of refund claims or disputes, the processing time may vary. A notification of transfer will be sent to your email id upon successful transfer to your paypal account.	</span>
							 			<hr />
							 			<label><b>Paypal Payment Details</b></label>
				 					</MDBCol>
					 			</MDBRow>
					 			{(this.state.editState) && (
					 				<div>
						 				<MDBRow>
											<MDBCol md="12" >
							 					<MDBBtn color="primary" size="md" type="submit" onClick={()=>this.editpayment()}>Edit</MDBBtn>
							 					<br /><br />
								 				<label ><b>Paypal Email : </b>{this.state.userDetails.email}</label><br />
									 			<label ><b>First Name : </b>{this.state.userDetails.firstname}</label><br />
									 			<label ><b>Last Name : </b>{this.state.userDetails.lastname}</label><br />
									 			<label ><b>Country : </b>{this.state.userAccountDetails.country}</label><br />
									 			<label ><b>State :</b>{this.state.userAccountDetails.country}</label><br />
									 			<label ><b>City :</b>{this.state.userAccountDetails.country}</label><br />
								 			</MDBCol>
						 				</MDBRow>
						 			</div>
				 				)}
				 				{(this.state.newedit) && (
					 				<div class="contentbox">
					 					<label class="labeltext">ITPACS Password *</label>
					 					<MDBRow>
						 					<MDBCol md="11">
							 					<MDBInput type="text" outline placeholder="password" name="password" onChange={(e)=>this.handlechange(e)}/>
						 					</MDBCol>
						 					<MDBCol md="1">
						 						<div style={{ display: "flex" }} >
													<MDBPopover placement="bottom" popover clickable id="popper3" >
								 						<MDBIcon className="ali" icon="info-circle" type="submit"></MDBIcon>
														<div>
															<MDBPopoverBody>
																To Access your payment details, enter your iNurtura Password.
															</MDBPopoverBody>
														</div>
							 						</MDBPopover>
						 						</div>
						 					</MDBCol>
					 					</MDBRow>
				 						<CourseError
											formRulesObject={formRules[2]}
										/>

					 					<MDBBtn color="primary" size="md" rounded type="submit" >Submit</MDBBtn>
					 					<MDBBtn color="primary" size="md" rounded type="submit" onClick={()=>this.cancel()}>Cancel</MDBBtn>
						 			</div>
				 				)}
					 		</div>

					 	)}
					 	<hr />
					 	<label><b>Batch</b></label>
					 	<br />
					 	<ul class="list-group ModuleListsCls">
							{
								this.state.batches_lists.map((batches,index)=>{
									return(
										<li class="list-group-item">
											<div>
												<div style={{'width':'90%'}} className="fleft">
													{batches.BatchName}
												</div>
												<div style={{'width':'10%'}} className="fleft">
													<MDBIcon icon="edit"></MDBIcon>&nbsp;
													<MDBIcon icon="trash"></MDBIcon>
												</div>
											</div>
										</li>
									)
								})
							}
						</ul>

					 	{
							this.state.rows.map((item, idx)=>{
								return (
									<MDBRow>
										<MDBCol md="12" className="BatchIconCls">
											<MDBInput 
												name="module"
												type="text" 
												hint="Enter Your Batch Name" 
												center 
												outline
												onChange={this.handleChangeBatch(idx)}
												value={this.state.rows[idx].module}
											/>
											<MDBIcon icon="save" onClick={this.insertCourseBatch.bind(this,idx)}></MDBIcon>&nbsp;
											<MDBIcon icon="trash" onClick={this.handleRemoveRow.bind(this,idx)}></MDBIcon>
										</MDBCol>
									</MDBRow>
								)
							})
						}
						<MDBBtn color="primary" size="md" rounded type="submit" onClick={this.handleAddRow}>Add New Batch</MDBBtn>
					</MDBCol>
				</MDBRow>
			</div>
		)
	}
}
export default Payments