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
import {VideoFormRules} from './course_form_rules.js'
import CourseError from './course_field_error.js'
import ReactDOM from 'react-dom';

class videos extends React.Component{
	constructor(props){
		super(props)
			this.state={
				max_chars: 2000,
				chars_left: 2000,
				newvideo: false,
				addfromlibrary: false,
				novideo: true,
				VideoFormRules: VideoFormRules,
				formData:{
					courseid: this.props.courseid,
					moduleid: '',
					videotitle: "",
					videodescription: "",
					videouploadtype: "",
					videofilepath: "",
					searchtag: "",
				},
				allVideoLists: [],
				videoListsWithCourse: [],
				valid: false,
			}
			this.moduleChange = this.moduleChange.bind(this)
	}

	componentDidMount(){
		this.getVideoListsMappedWithCourse()
		this.getAllVideoLists()
	}

	getAllVideoLists(){
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getAllVideoLists`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			this.setState({
				allVideoLists:res.data.video
			})
		})
		.catch((error)=>{console.log(error)})
	}

	getVideoListsMappedWithCourse(){
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getVideoListsMappedWithCourse`,
			method: 'POST',
			data: {'courseid':this.props.courseid},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			this.setState({
				videoListsWithCourse:res.data.video
			})
		})
		.catch((error)=>{console.log(error)})
		
	}

	newvideo(){
		this.setState({
			newvideo:true,
			addfromlibrary:false,
			novideo:false,
		})
	}
	closeall(){
		this.setState({
			newvideo:false,
			addfromlibrary:false,
			novideo:true,
		})
	}
	addfromlibrary(){
		this.setState({
			newvideo:false,
			addfromlibrary:true,
			novideo:false,
		})
	}
	handleCharlength(event)
	{
		const input = event.target.value;
		const obj = this.state.formData
		obj['videodescription'] = input
		this.setState({
			chars_left: this.state.max_chars - input.length,
			obj
		});
	}
	uploadvideotype(value){
		const obj = this.state.formData
		obj['videouploadtype'] = value.toString()
		this.setState({
			obj
		})
	}
	uploadvideo = e => {
		console.log(e)
	}
	formvalid(){
		const formRules=this.state.VideoFormRules
		if(this.state.videotitle.length>3)
		{
			formRules[0].valid = true
		}
		else
		{
			formRules[0].valid = false
		}
		
		if(this.state.videofilepath.length>3)
		{
			formRules[1].valid = true
		}
		else
		{
			formRules[1].valid = false
		}
		
		this.setState({VideoFormRules: formRules})
		if (this.allTrue())
		{
			this.setState({valid:true})
		}
		else
		{
			this.setState({valid:false})
		}

	}
	allTrue(){
		let formRules = VideoFormRules
		for (const rule of formRules)
		{
			if(!rule.valid) return false
		}
		return true
	}
	handlechange(e){
		const obj = this.state.formData
		obj[e.target.name] = e.target.value
		this.setState(obj)
		this.formvalid()
	}

	moduleChange=(event)=>{
		const name = event.toString()
		const obj = this.state.formData
		obj['moduleid'] = name
		this.setState(obj)
	}

	handlesearchtags(e){
		const obj = this.state.formData
		obj['searchtag'] = e.target.value
		this.setState(obj)
	}

	insertVideo(e){
		console.log(this.state.formData)
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/insertVideo`,
			method: 'post',
			data: this.state.formData,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			this.getVideoListsMappedWithCourse()
			this.closeall()
		})
		.catch((error)=>{console.log(error)})
	}

	showvideodetails(e, idx){
		const node = ReactDOM.findDOMNode(this);
		if(e.target.checked)
			node.querySelector('#VideoDetails'+idx).style = "display: block"
		else
			node.querySelector('#VideoDetails'+idx).style = "display: none"
	}

	render(){
		let formRules=this.state.VideoFormRules
		return(
			<div class="contentbox VideoFormCls">
				<MDBRow>
					<MDBCol md="12">
						<h6 class="mb-0 font-weight-bold" >Video</h6>
						<br />
						<MDBBtn color="primary" size="md" rounded type="submit" onClick={(e)=>this.newvideo(e)}>Upload New Video</MDBBtn>
						<MDBBtn color="primary" size="md" rounded type="submit" onClick={()=>this.addfromlibrary()}>Add From Library</MDBBtn>	
						
						{((this.state.novideo && this.state.videoListsWithCourse.length == 0) || (this.state.addfromlibrary && this.state.allVideoLists.length == 0)) && (
							<MDBRow>
								<MDBCol col-md="12">
									<div >
										<p class="text-muted" className="text-center pt-4 pb-5 mb-2">
											You have no Videos yet. <a class="text-decoration-none text-primary" onClick={(e)=>this.newvideo(e)}>Click here </a>to add a new Video
										</p> 
									</div>
								</MDBCol>
							</MDBRow>
						)}

						{(this.state.newvideo)&&(
							<div>
								<label><b>New Video</b></label>
								<p >The Videos added to the course will also be available in the library</p>

								<MDBRow>
									<MDBCol md="12">
										<label><b>This is Part of the Module</b></label>
										<MDBSelect 
											outline 
											className="marginTop0px"
											getValue={this.moduleChange}
										>
											<MDBSelectInput selected="Select" />
											<MDBSelectOptions>
											{
												this.props.ModuleLists.map((modules ,i)=>{
													let moduleId = modules['_id']['$oid']
													return <MDBSelectOption value={moduleId}>{modules.ModuleName}</MDBSelectOption>
												})
											}
											<MDBSelectOption >Others</MDBSelectOption>
											</MDBSelectOptions>
										</MDBSelect>
									</MDBCol>
								</MDBRow>

								<MDBRow>
									<MDBCol md="12">
										<label><b>Video Title</b> *</label>
										<MDBInput className="marginTop0px" type="text" label="Video Title" outline onChange={(e)=>this.handlechange(e)} name="videotitle"/>
										<span class="text-rightalign">Max 200 Characters</span>
										<CourseError
											formRulesObject={formRules[0]}
										/>
									</MDBCol>
								</MDBRow>
								
								<MDBRow>
									<MDBCol md="12">
										<label><b>Description</b></label>
										<MDBInput className="marginTop0px" type="textarea" rows="1" label="Video Title" name="videodescription" outline maxLength={this.state.max_chars} onChange={this.handleCharlength.bind(this)}/>
										<span class="text-rightalign">{this.state.chars_left} Characters left</span>
									</MDBCol>
								</MDBRow>
								
								<MDBRow>
									<MDBCol md="12">
										<label><b>Search tags</b></label>
										<MDBChipsInput placeholder="Enter tags to search" outline className="border border-light" value = {this.state.searchtag} onChange={(e)=>this.handlesearchtags(e)}/>
									</MDBCol>
								</MDBRow>

								<MDBRow>
									<MDBCol md="12">
										<label><b>Upload Video</b></label>
										<MDBSelect className="marginTop0px" outline getValue={this.uploadvideotype.bind(this)}>
											<MDBSelectInput selected="Select" />
											<MDBSelectOptions>
											<MDBSelectOption selected value="1">Add Video Link</MDBSelectOption>
											<MDBSelectOption value="2">Upload Video</MDBSelectOption>
											</MDBSelectOptions>
										</MDBSelect>
									</MDBCol>
								</MDBRow>

								{(this.state.videouploadtype=="1") &&(
									<div>
										<MDBRow>
											<MDBCol md="12">
												<label><b>Video Link</b> *</label>
												<MDBInput className="marginTop0px" type="text" rows="1" label="File name" outline name="videofilepath" onChange={(e)=>this.handlechange(e)}/>
												<CourseError
													formRulesObject={formRules[1]}
												/>
											</MDBCol>
										</MDBRow>
									</div>
								)}

								{(this.state.videouploadtype=="2") &&(
									<div>
										<label><b>Upload Video</b></label>
										<MDBRow>
											<MDBCol md="2">
												<iframe className="embed-responsive-item" src="" class="videoframe"></iframe>
											</MDBCol>
											<MDBCol md="8">
												<MDBFileInput className="marginTop0px" />
												<CourseError
													formRulesObject={formRules[2]}
												/>
											</MDBCol>
											<MDBCol md="2">
												<MDBBtn onClick={this.uploadvideo.bind(this)}>Upload</MDBBtn>
											</MDBCol>
										</MDBRow>
										<MDBProgress material animated value={50} height="20px">
											50%
										</MDBProgress>
									</div>
								)}

								<MDBBtn color="primary" size="md" rounded type="submit" onClick={(e)=>this.insertVideo(e)}>Add New Video</MDBBtn>
								<MDBBtn color="primary" size="md" rounded type="submit" onClick={()=>this.closeall()}>Cancel</MDBBtn>
							</div>
						)}
						{(this.state.addfromlibrary && this.state.allVideoLists.length > 0) &&(
							<div>
								<MDBRow>
									<MDBCol col-md="12">
										<label><b>This is Part of the Module</b></label>
										<MDBSelect 
											outline 
											className="marginTop0px"
											getValue={this.moduleChange}
										>
											<MDBSelectInput selected="Select" />
											<MDBSelectOptions>
												<MDBSelectOption disabled>Select</MDBSelectOption>
												{
													this.props.ModuleLists.map((modules ,i)=>{
														let moduleId = modules['_id']['$oid']
														return <MDBSelectOption value={moduleId}>{modules.ModuleName}</MDBSelectOption>
													})
												}
												<MDBSelectOption value="Others">Others</MDBSelectOption>
											</MDBSelectOptions>
										</MDBSelect>
									</MDBCol>
								</MDBRow>

								<MDBRow>
									<MDBCol md="12">
										<MDBRow className="ListsHeadRow">
											<MDBCol md="12" className="ListsHead">
												<MDBInput label="Video Name" type="checkbox" id="checkbox0" class="labeltext" />
											</MDBCol>
										</MDBRow>
									</MDBCol>
								</MDBRow>
								{this.state.allVideoLists.map((item, index) =>{
										let vid = "video"+{index}
										return(
											<div>
												<MDBRow>
													<MDBCol md="10" >
														<MDBInput type="checkbox" id={vid} label={item.video_name} onChange={(e)=>this.showvideodetails(e, index)} />
													</MDBCol>
													<MDBCol md="2" className="iconPosition">
														<MDBIcon icon="file" id={index}  ></MDBIcon>
													</MDBCol >
												</MDBRow>
												<div style={{display:"none"}} id={"VideoDetails"+index}>
													<MDBContainer>
														<MDBRow>
															<MDBCol md="12" >
																<span class="labeltext">Title :</span>{item.video_name} <br />
																<span class="labeltext">Description :</span>{item.description} <br />
																<span class="labeltext">Created On :</span>{item.created_on} <br />
																<span class="labeltext">Video Link :</span>{item.video_path}<br />
															</MDBCol >
														</MDBRow>
													</MDBContainer>
												</div>
											</div>
										)
									})
								}
								<MDBBtn color="primary" size="md" rounded type="submit" >Add to Course</MDBBtn>
								<MDBBtn color="primary" size="md" rounded type="submit" onClick={()=>this.closeall()}>Cancel</MDBBtn>
							</div>
						)}

						{(this.state.novideo && this.state.videoListsWithCourse.length > 0) &&(
							<div>
								<MDBRow>
									<MDBCol md="12">
										<MDBRow className="ListsHeadRow">
											<MDBCol md="12" className="ListsHead">
												<MDBRow>
													<MDBCol md="1">
														<MDBInput label=" " type="checkbox" onChange={(e)=>this.clickall(e)}/>
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Video Name
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Module
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Play video													
													</MDBCol >
													<MDBCol md="4" className="textHeader">
														Description
													</MDBCol >
													<MDBCol md="1" className="textHeader">
														
													</MDBCol >
												</MDBRow>
											</MDBCol>
										</MDBRow>
										{this.state.videoListsWithCourse.map((item, index) =>{
												let vid = "video"+{index}
												return(
													<div>
														<MDBRow>
															<MDBCol md="12">
																<MDBRow>
																	<MDBCol md="1">
																		<MDBInput type="checkbox" id={vid} label=" " onChange={(e)=>this.showvideodetails(e, index)} />
																	</MDBCol >
																	<MDBCol md="2" className="textHeader">
																		{item.video_name}
																	</MDBCol >
																	<MDBCol md="2" className="textHeader">
																		Module
																	</MDBCol >
																	<MDBCol md="2" className="textHeader">
																		<MDBIcon icon="play-circle" id={index}></MDBIcon>										
																	</MDBCol >
																	<MDBCol md="4" className="textHeader">
																		{item.description}
																	</MDBCol >
																	<MDBCol md="1" className="textHeader">
																		<MDBIcon icon="edit" id={index}  ></MDBIcon>
																	</MDBCol >
																</MDBRow>
															</MDBCol>
														</MDBRow>
														<div style={{display:"none"}} id={"VideoDetails"+index}>
															<MDBContainer>
																<MDBRow>
																	<MDBCol md="12" >
																		<span class="labeltext">Title :</span>{item.video_name} <br />
																		<span class="labeltext">Description :</span>{item.description} <br />
																		<span class="labeltext">Created On :</span>{item.created_on} <br />
																		<span class="labeltext">Video Link :</span>{item.video_path}<br />
																	</MDBCol >
																</MDBRow>
															</MDBContainer>
														</div>
													</div>
												)
											}
										)}
									</MDBCol>
								</MDBRow>
							</div>
						)}
					</MDBCol>
				</MDBRow>
			</div>
		)
	}
}
export default videos