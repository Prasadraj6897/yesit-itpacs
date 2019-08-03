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
	MDBStepper, MDBStep, MDBSelect, MDBIcon, MDBDatePicker, MDBChipsInput,MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable, MDBTableBody, MDBTableHead, MDBFormInline
} from 'mdbreact';
import './newcourse.css'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker'
import {AssignmentFormRules} from "./course_form_rules.js"
import ReactDOM from 'react-dom';
import CourseError from "./course_field_error.js"
import Questions from './questions.js'

class Assignments extends React.Component{
	constructor(props){
		super(props)
		this.state={
			showassignmentlists:true,
			newassigninput:false,
			max_chars:200,
			startdate:{},
			enddate:{},
			newlibrary:false,
			info:false,
			valid:false,
			AssignmentFormRules:AssignmentFormRules,
			assigntype:false,
			filevalid:false,
			test:false,
			assigntesttype:false,
			detaildesc:true,
			testtype:false,
			addques:false,
			displayInput:[],
			category:false,
			addcategory:true,
			assignmentquestionmethod:false,
			browsefiles:true,
			formData:{
					assignmentname:"",
					assigndesc:"",
					duration:"",
					grading:"",
					weightage:"",
					startdate:"",
					enddate:"",
					detaileddesc:"",
					created_on:"",
					updated_on:"",
					questiontypevalue:"",
					assignmentTypename:"",
					courseid: this.props.courseid,
					assignmentTestTypename:"",
				},
			value:"",
			questionlist:[],
			answerlist:[],
			marklist:[],
			queschecklist:[],
			category1list:[],
			mulanschecklist:[],
			assignmentListsWithCourse:[],
			allAssignmentLists:[],
			allQuestionLists:[],
			QuestionListsWithCourse:[],
			assigntype:"",
			AssignmentLastInsertId: "",
			AssignmenttIds:"",
			resetvalue:"",
			
		}
		this.getassign=this.getassign.bind(this)
		this.getQuestion = this.getQuestion.bind(this)
		this.getAnswer = this.getAnswer.bind(this)
		this.getMarks = this.getMarks.bind(this)
		this.getQuescheck = this.getQuescheck.bind(this)
		this.getMulanscheck = this.getMulanscheck.bind(this)
		this.getCategory1 = this.getCategory1.bind(this)
		this.getCategory2 = this.getCategory2.bind(this)
		this.getfreetext1 = this.getfreetext1.bind(this)
		this.getfreetext2 = this.getfreetext2.bind(this)
	}

	newassignment(){
		this.setState({
			newassignment:false,
			newassigninput:true,
			newlibrary:false,
			showassignmentlists:false,
		})
	}

	addfromlibrary(){
		this.setState({
			newlibrary:true,
			newassignment:false,
			newassigninput:false,
			showassignmentlists:false,
		})
	}

	componentDidMount(){
		this.getassign()
		this.getassignmenttype()
		this.getassignmenttesttype()
		this.getAllAssignmentlist()
		this.getAssignmentListsMappedWithCourse()
		// this.getQuestionListsMappedWithCourse()
		this.getAllQuestionlist()
	}

	getassign=(e)=>{
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/gethandoutmenu`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			this.setState({
				assign : res.data.handout
			})
		})
		.catch((error)=>{console.log(error)})

	}

	getassignmenttype=(e)=>{
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getassignmenttype`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			this.setState({
				assignmenttype : res.data.assignment
			})
		})
		.catch((error)=>{console.log(error)})

	}

	getassignmenttesttype=(e)=>{
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getassignmenttesttype`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			this.setState({
				assignmenttesttype : res.data.assignment
			})
		})
		.catch((error)=>{console.log(error)})
		this.props.resetform(this.state.resetvalue)
	}

	handleaddtocourse =(e)=> {
		// console.log(this.state.questionlist)
		// console.log(this.state.answerlist)
		// console.log(this.state.marklist)
		// console.log(this.state.category1list)
		// console.log(this.state.mulanschecklist)
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/assignmentdata`,
			method: 'post',
			data:{"Assignment_field":this.state.formData,"Question_field":this.state.questionlist,"Answer_field":this.state.answerlist, "Marks_field":this.state.marklist,"QuesCheck_field":this.state.queschecklist, "Mulanscheck_field":this.state.mulanschecklist, "Category1_field":this.state.category1list, "Category2_field":this.state.category2list,"Freetext1_field":this.state.free1list,"Freetext2_field":this.state.free2list},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			
			this.setState({
				AssignmentLastInsertId: encodeURIComponent(res.data.id['_id']['$oid'])
			})
			console.log(this.state.AssignmentLastInsertId)
			this.getAssignmentListsMappedWithCourse()
			// this.getQuestionListsMappedWithCourse()
			this.closeassignment()
		})
		.catch((error)=>{console.log(error)})
	}
	/*Assignment section*/
	getAllAssignmentlist(id) {
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getAllAssignmentLists`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			
			this.setState({
				allAssignmentLists:res.data.assignmentlist,
			})
			console.log(this.state.allAssignmentLists)
			this.setState({
				AssignmenttIds: encodeURIComponent(res.data.assignmentlist[id]['_id']['$oid'])
			})
			console.log(this.state.AssignmenttIds)

		})
		.catch((error)=>{console.log(error)})
	}

	getAssignmentListsMappedWithCourse(){
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getAssignmentListsMappedWithCourse`,
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
				assignmentListsWithCourse:res.data.assignmentlist
			})
			//console.log(this.state.assignmentListsWithCourse)
		})
		.catch((error)=>{console.log(error)})
		
	}
	/*End Assignment section*/
	
	/*Question section*/
	getAllQuestionlist() {
		const options = {
			url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getAllQuestionLists`,
			method: 'post',
			data: {"Assignment_field":this.state.formData},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.authToken}`
			}
		}
		return axios(options)
		.then((res)=>{
			this.setState({
				allQuestionLists:res.data.questionlist
			})
			// console.log(this.state.allQuestionLists)
		})
		.catch((error)=>{console.log(error)})
	}

	// getQuestionListsMappedWithCourse(){
	// 	const options = {
	// 		url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getQuestionListsMappedWithCourse`,
	// 		method: 'POST',
	// 		data: {'courseid':this.props.courseid, 'Assignment_field':this.state.formData,'AssignmentLastInsertId':this.state.AssignmentLastInsertId},
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: `Bearer ${window.localStorage.authToken}`
	// 		}
	// 	}
	// 	return axios(options)
	// 	.then((res)=>{
	// 		this.setState({
	// 			QuestionListsWithCourse:res.data.questionlist
	// 		})
	// 		console.log(this.state.QuestionListsWithCourse)
	// 	})
	// 	.catch((error)=>{console.log(error)})
		
	// }
	/*End Question section*/
	getAlllist(id){
		this.state.AssignmenttIds= encodeURIComponent(this.state.allAssignmentLists[id]['_id']['$oid'])
		console.log(this.state.AssignmenttIds)
	}

	

	showassignmentdoc(e){
		const ids = e.target.id
		const newid = ids.split("s").pop()
		console.log(newid)
		this.getAlllist(newid)
		const node = ReactDOM.findDOMNode(this);
		if(e.target.checked)
		{
			node.querySelector('#AssignmentDetails'+e.target.id).style = "display: block"
			const options = {
				url: `${process.env.REACT_APP_COURSES_SERVICE_URL}/courses/getQuestionListsMappedWithCourse`,
				method: 'POST',
				data: {'AssignmentLastInsertId':this.state.AssignmenttIds},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${window.localStorage.authToken}`
				}
			}
			return axios(options)
			.then((res)=>{
				this.setState({
					QuestionListsWithCourse:res.data.question
				})
				console.log(this.state.QuestionListsWithCourse)
				// this.questionlist(this.state.AssignmenttIds)
			})
			.catch((error)=>{console.log(error)})
		}
		else
			node.querySelector('#AssignmentDetails'+e.target.id).style = "display: none"
	}

	// questionlist(assid){

	// 	let question = ""
	// 	 question = (
	// 	 	<div>
	// 			{this.state.QuestionListsWithCourse.map((item, index) =>{
	// 				return(
	// 					<div key={index}>
	// 						<span class="labeltext"> {index+1+")"} {item.test_question}</span>
							
	// 					</div>
	// 				)
	// 			})}
	// 		</div>
	// 	)
	// 	console.log(question)
	// }

	getQuestion(value){
		this.setState({
			questionlist:value
		})
	}

	getAnswer(value){
		this.setState({
			answerlist:value
		})
	}

	getMarks(value){
		this.setState({
			marklist:value
		})
	}

	getQuescheck(value){
		this.setState({
			queschecklist:value
		})
	}

	getCategory1(value){
		this.setState({
			category1list:value
		})
	}

	getCategory2(value){
		this.setState({
			category2list:value
		})
	}

	getfreetext1(value){
		this.setState({
			free1list:value
		})
	}

	getfreetext2(value){
		this.setState({
			free2list:value
		})
	}
	getMulanscheck(value){
		this.setState({
			mulanschecklist:value
		})
	}

	closeassignment(){
		this.setState({
			newassignment:false,
			newassigninput:false,
			newlibrary:false,
			showassignmentlists:true,
		})
	}

	startdate(event, date){
		const x=date.toLocaleString()
		let stringdatearr = x.split(',');
		let stringdate = stringdatearr[0]

		this.state.formData.startdate = stringdate
	}

	enddate(event, date){
		const x=date.toLocaleString()
		let stringdatearr = x.split(',');
		let stringdate = stringdatearr[0]
		
		this.state.formData.enddate = stringdate
	}

	infoalert(){
		this.setState({
			info:!this.state.info,
		})
	}

	formvalid(){
		const formRules=this.state.AssignmentFormRules
		{/*assigntype rules*/}
		if(this.state.assigntype)
		{
			formRules[0].valid = true
		}
		else
		{
			formRules[0].valid = false
		}
		{/*assigntesttype rules*/}
		if(this.state.assigntesttype)
		{
			formRules[6].valid = true
		}
		else
		{
			formRules[6].valid = false
		}
		{/*assignmentname rules*/}
		if(this.state.formData.assignmentname.length>5)
		{
			formRules[1].valid = true
		}
		else
		{
			formRules[1].valid = false
		}

		{/*assigndescription rules*/}
		if(this.state.formData.assigndesc.length>10)
		{
			formRules[2].valid = true
		}
		else
		{
			formRules[2].valid = false
		}
		{/*grading rules*/}
		if(this.state.formData.grading.length>=2)
		{
			formRules[3].valid = true
		}
		else
		{
			formRules[3].valid = false
		}
		{/*weightage rules*/}
		if(this.state.formData.weightage.length>=2)
		{
			formRules[4].valid = true
		}
		else
		{
			formRules[4].valid = false
		}
		{/*Browse files rules*/}
		if(this.state.filevalid)
		{
			formRules[5].valid = true
		}
		else
		{
			formRules[5].valid = false
		}
		{/*question method validation*/}
		if(this.state.assignmentquestionmethod){
			formRules[7].valid=true
		}
		else{
			formRules[7].valid=false
		}

		this.setState({AssignmentFormRules: formRules})
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
		let formRules = AssignmentFormRules
		for (const rule of formRules)
		{
			if(!rule.valid) return false
		}
		return true
	}

	handleassigntype(e){
		const node = ReactDOM.findDOMNode(this)
		const asstname = node.querySelector('.assignmenttype').value
		this.state.formData.assignmentTypename = asstname

		const id = e[0]
		this.state.formData.assigntestid = id

		{/*below section is for validation*/}
		if(e[0]==1 || e[0]==2 ||e[0]==3 || e[0]==4 || e[0]==5)
		{	
			this.state.assigntype=true
			this.setState({
				assigntype:this.state.assigntype,
			})
		}
		else
		{	
			this.state.assigntype=false
			this.setState({
				assigntype:this.state.assigntype
			})
		}
		{/*End Section*/}
		{/*below section is for Opening Question and answer section*/}
		if(e[0]==2)
		{
			this.state.test=true
			this.state.addques=true
			this.setState({
				test:this.state.test,
				detaildesc:false,
				addques:this.state.addques
			})
		}
		else{
			this.state.test=false
			this.state.addques=false
			this.state.browsefiles=true
			this.setState({
				test:this.state.test,
				detaildesc:true,
				addques:this.state.addques,
				browsefiles:this.state.browsefiles
			})

		}
		{/*End Section*/}
		 this.formvalid()
	}

	handleassigntesttype(e){
		//alert(e.toString())
		const node = ReactDOM.findDOMNode(this)
		const asstypename = node.querySelector('.assignmenttesttype').value
		this.state.formData.assignmentTestTypename = asstypename
		// console.log(this.state.formData.assignmentTestTypename)

		const typeVal = e.toString()
		this.state.formData.questiontypevalue = typeVal

		if(e[0]==1 || e[0]==2 ||e[0]==3 || e[0]==4 )
		{	
			this.state.assigntesttype=true
			this.state.testtype=true
			this.setState({
				assigntesttype:this.state.assigntesttype,
				testtype:this.state.testtype,
			})
		}
		else
		{	
			this.state.assigntesttype=false
			this.state.testtype=false
			this.setState({
				assigntesttype:this.state.assigntesttype,
				testtype:this.state.testtype,			
			})
		}
		this.formvalid()
	}

	handlechange(e){
		// console.log(e.target.value)
		const obj = this.state.formData
		obj[e.target.name] = e.target.value
		this.setState(obj)
		this.formvalid()
	}

	handlegrading(e){
		//console.log(e.target.value)
		if(e.target.value.match("^[0-9 ]*$")!=null)
		{
			const obj = this.state.formData
			obj[e.target.name] = e.target.value
			//console.log(obj[e.target.name])
			this.setState(obj)
		}
		this.formvalid()
	}

	handleweightage(e){
		// console.log(e.target.value)
		if(e.target.value.match("^[0-9 ]*$")!=null)
		{
			const obj = this.state.formData
			obj[e.target.name] = e.target.value
			// console.log(obj[e.target.name])
			this.setState(obj)
		}
		this.formvalid()
	}

	// handledesc(e){
	// 	const obj = this.state
	// 	obj[e.target.name] = e.target.value
	// 	this.setState(obj)
	// }

	

	radio = (value) => () => {
		if(value==1 || value==2)
		{
			this.state.assignmentquestionmethod=true
			this.setState({
				radio: value,
				assignmentquestionmethod:this.state.assignmentquestionmethod
			});
		}
		else{
			this.state.assignmentquestionmethod=false

			this.setState({
				assignmentquestionmethod:this.state.assignmentquestionmethod
			})
		}
		if(value==1)
		{
			this.setState({
				addques:true,
				browsefiles:false,
			})
		}
		else{
			this.setState({
				addques:false,
				browsefiles:true,
			})
		}
		this.formvalid()
		console.log(this.state.radio)
	}

	filechange(e){
		const filename=e[0].name
		const filesize=e[0].size
		const lastModified=e[0].lastModified
		var date = new Date().getDate()
		var month = new Date().getMonth() + 1
		var year = new Date().getFullYear()
		var createddate = date +'.'+ month +'.'+ year

		const fileext=filename.split('.').pop()

		if((fileext!=='')&&(fileext=="png" || fileext=="jpg" || fileext=="jpeg" || fileext=="txt" || fileext=="docx" || fileext=="doc" || fileext=="xls"))
		{	
			this.state.filevalid=true
			this.setState({
				imagevalid:this.state.filevalid,
			})	
		}
		else
		{
			this.state.filevalid=false
			this.setState({
				filevalid:this.state.filevalid
			})
		}
		this.state.formData.created_on=createddate
		this.formvalid()
	}

	render(){
		let formRules=this.state.AssignmentFormRules
		let question = this.state.QuestionListsWithCourse.map((item, index) =>{  <li key={index}>{item.test_question}</li>})
		return(
			<div class="contentbox">
				<MDBRow>
					<MDBCol md="12">
						<h6 className="mb-0 font-weight-bold">Assignments</h6>
						<br />
						<MDBBtn color="primary" size="md" rounded type="submit" onClick={(e)=>this.newassignment(e)}>Create New Assignments</MDBBtn>
						<MDBBtn color="primary" size="md" rounded type="submit" onClick={()=>this.addfromlibrary()}>Add From Library</MDBBtn>	
						
						{(this.state.showassignmentlists && this.state.assignmentListsWithCourse == 0) && (
							<MDBRow>
								<MDBCol col-md="12">
									<div >
										<p class="text-muted" className="text-center pt-4 pb-5 mb-2">
											You have no Assignments yet. <a class="text-decoration-none text-primary" onClick={(e)=>this.newassignment(e)}>Click here </a>to add a new Assignments
										</p> 
									</div>
								</MDBCol>
							</MDBRow>
						)}

						{(this.state.newassigninput) && (
							<div>
								<div>
									<br />
									<h6 className="mb-0 font-weight-bold">New Assignment</h6>
									<p>The assignments added to the course will also be available in the library</p>
								</div>

								<MDBRow>
									<MDBCol md="12">
										<label class="labeltext">This is Part of the Module</label>
										<MDBSelect  outline>
											<MDBSelectInput selected="Select" />
											<MDBSelectOptions>
											<MDBSelectOption disabled>Select</MDBSelectOption>
												{
													this.props.ModuleLists.map((modules ,i)=>{
														let moduleId = modules['_id']['$oid']
														return <MDBSelectOption value={moduleId}>{modules.ModuleName}</MDBSelectOption>
													})
												}
											</MDBSelectOptions>
										</MDBSelect>
									</MDBCol>
								</MDBRow>

								<MDBRow>	
									<MDBCol md="12">
										<label class="labeltext">Assignment Type *</label>
										<MDBSelect  outline color="primary" getValue={this.handleassigntype.bind(this)} className="assignmenttypeclass">
											<MDBSelectInput selected="Select" className="assignmenttype"/>
											<MDBSelectOptions>
											<MDBSelectOption disabled >Select</MDBSelectOption>
												{
													this.state.assignmenttype.map((type ,i)=>{
														return <MDBSelectOption value={type.AssignmentId}>{type.AssignmentName}</MDBSelectOption>
													})
												}
											</MDBSelectOptions>
										</MDBSelect>
										<CourseError
											formRulesObject={formRules[0]}
										/>
									</MDBCol>
								</MDBRow>

								{(this.state.test) && (
									<div>
										<MDBRow>	
											<MDBCol md="12">
												<label class="labeltext">Test Type *</label>
												<MDBSelect  outline color="primary" getValue={(e)=>this.handleassigntesttype(e)}>
													<MDBSelectInput selected="Select" className="assignmenttesttype"/>
													<MDBSelectOptions>
													<MDBSelectOption disabled >Select</MDBSelectOption>
														{
															this.state.assignmenttesttype.map((type ,i)=>{
																return <MDBSelectOption value={type.AssignmenttypeId}>{type.AssignmenttypeName}</MDBSelectOption>
															})
														}
													</MDBSelectOptions>
												</MDBSelect>
												<CourseError
													formRulesObject={formRules[6]}
												/>
											</MDBCol>
										</MDBRow>

										{(this.state.testtype) && (
											<MDBRow>
												<MDBCol md="12">
													<label class="labeltext">Add Question Method *</label>
													 <MDBFormInline>
														<MDBInput gap onClick={this.radio(1)} checked={this.state.radio===1 ? true : false} label="Add New Questions" type="radio" id="radio1" />
														<MDBInput gap onClick={this.radio(2)} checked={this.state.radio===2 ? true : false} label="Upload Questions (Download Template: CSV)" type="radio" id="radio2" />
													 </MDBFormInline>
													 <CourseError
														formRulesObject={formRules[7]}
													 />
											 	</MDBCol>
										 	</MDBRow>
									 	)}
								 	</div>		
								)}
								<label class="labeltext">Duration (In minutes) *</label>
								<MDBRow>
									<MDBCol md="12">
										<MDBInput type="text" placeholder="max 300" outline name="duration" onChange={(e)=>this.handlechange(e)}/>
									</MDBCol>
							 	</MDBRow>

								<label class="labeltext">Assignment Name *</label>
								<MDBRow>
									<MDBCol md="12">
										<MDBInput type="text" label="Assignment Name" outline maxLength={this.state.max_chars} name="assignmentname" onChange={(e)=>this.handlechange(e)}/>
										<span class="text-rightalign">Max 200 Characters</span>
										<CourseError
											formRulesObject={formRules[1]}
										/>
									</MDBCol>
							 	</MDBRow>

								<label class="labeltext">Short Description *</label>
								<MDBRow>
									<MDBCol md="12">
										<MDBInput type="textarea" rows="2" label="Assignment Description" outline name="assigndesc" onChange={(e)=>this.handlechange(e)}/>
										<CourseError
											formRulesObject={formRules[2]}
										/>
									</MDBCol>
							 	</MDBRow>

								<label class="labeltext">Search Tags</label>
								<MDBRow>
									<MDBCol md="12">
										<MDBChipsInput placeholder="Enter tags to search" outline className="border border-light"/>
									</MDBCol>
								</MDBRow>

								<MDBRow>
									<MDBCol md="6">
										<label class="labeltext">Available From Date</label>
										<MuiThemeProvider>
											<DatePicker 
												textFieldStyle={{width: '100%'}} 
												hintText="Assignment From" 
												onChange={this.startdate.bind(this)}>
											</DatePicker>
										</MuiThemeProvider>
									</MDBCol>
									<MDBCol md="6">
										<label class="labeltext">Due Date</label>
										<MuiThemeProvider>
											<DatePicker 
												textFieldStyle={{width: '100%'}} 
												hintText="Assignment To" 
												onChange={this.enddate.bind(this)}>
											</DatePicker>
										</MuiThemeProvider>
									</MDBCol>
								</MDBRow>

								<br />
								<hr />
								{(this.state.detaildesc) &&(
									<div>
										<MDBRow>
											<MDBCol md="12">
												<label class="labeltext"> Detailed Description (Only enrolled students can view)</label>
												<MDBInput type="textarea" rows="2" label="Assignment Description" outline name="detaileddesc" onChange={(e)=>this.handlechange(e)}  />
											</MDBCol>
										</MDBRow>
									</div>
								)}
								<br />

								{(this.state.browsefiles) &&(
									<div>
										<label class="labeltext">Browse Files</label>
										<MDBRow>
											<MDBCol md="11">
												<MDBFileInput className="browsefiles" getValue={(e)=>this.filechange(e)}/>
											</MDBCol>
											<MDBCol md="1" className="iconAlign" >
												<MDBIcon icon="folder-open" />
											</MDBCol>
										</MDBRow>
										<CourseError
											formRulesObject={formRules[5]}
										/>
										<hr />
									</div>
								)}
									
								{/*Questions Section*/}
								{(this.state.addques) && (
									<Questions 
									/>
								)}

								<label class="labeltext">Grading out of *</label>
								<MDBRow>
									<MDBCol md="11">
										<MDBInput type="text" label="Out Of" outline name="grading" maxLength="2" onChange={(e)=>this.handlegrading(e)}/>
										<CourseError
											formRulesObject={formRules[3]}
										/>
									</MDBCol>
								</MDBRow>

								<MDBRow>	
									<MDBCol md="11">
										<label class="labeltext">Weightage *</label>
									</MDBCol>
								</MDBRow>

								<MDBRow>
									<MDBCol md="11">
										<MDBInput type="text" label="Weightage" outline maxLength="2" name="weightage" onChange={(e)=>this.handleweightage(e)}/>
										<CourseError
											formRulesObject={formRules[4]}
										/>
									</MDBCol>
									<MDBCol md="1">
										<MDBIcon className="iconAlign" icon="info-circle" onClick={()=>this.infoalert()}></MDBIcon>
									</MDBCol>
								</MDBRow>

								<MDBInput label="Score on this assignment will affect students overall grade" type="checkbox" id="checkbox1"/>
								{/*info alert*/}
								<MDBModal isOpen={this.state.info} >
									<MDBModalHeader >Grading Help Content</MDBModalHeader>
									<MDBModalBody>
										<p><b>Weightage: </b>Each assignment you create for a course can carry a different weightage. The total weightage should add up to 100%. If you set the weightage to 0, each assignment will carry the same weight for the final scoring. </p>
										<p class="modaltext">Assignments are weighted by group. For example,</p>
										<MDBTable striped>
											<MDBTableHead color="primary-color" textWhite>
												<tr>
													<th>Group</th>
													<th>Weight</th>
												</tr>
											</MDBTableHead>
											<MDBTableBody>
												<tr>
													<td>Exam</td>
													<td>70%</td>
												</tr>
												<tr>
													<td>Team Project</td>
													<td>10%</td>
												</tr>
												<tr>
													<td>Class tests</td>
													<td>6%</td>
												</tr>
												<tr>
													<td>Worksheets</td>
													<td>14%</td>
												</tr>
												<tr>
													<td>Total</td>
													<td>100%</td>
												</tr>
											</MDBTableBody>
										</MDBTable>
									</MDBModalBody>
									<MDBModalFooter>
										<MDBBtn color="secondary" onClick={()=>this.infoalert()}>Close</MDBBtn>
									</MDBModalFooter>
								</MDBModal>
								<br />
								{/*Button Section*/}
								<MDBBtn color="primary" size="md"rounded  type="submit" onClick={(e)=>this.handleaddtocourse(e)}>Add to Course</MDBBtn>
								<MDBBtn color="primary" size="md"rounded  type="submit" onClick={()=>this.closeassignment()}>Cancel</MDBBtn>

						</div>
						)}

						{/* Display Assignment Lists From Library */}
						{(this.state.newlibrary) && (
							<div >
								<br />
								<MDBRow>
									<MDBCol md="12">
										<h6 className="mb-0 font-weight-bold" class="text">This is Part of the Module</h6>
										<MDBSelect  outline color="primary">
											<MDBSelectInput selected="Select" />
											<MDBSelectOptions>
											<MDBSelectOption disabled>Select</MDBSelectOption>
												{
													this.props.ModuleLists.map((modules ,i)=>{
														let moduleId = modules['_id']['$oid']
														return <MDBSelectOption value={moduleId}>{modules.ModuleName}</MDBSelectOption>
													})
												}
											</MDBSelectOptions>
										</MDBSelect>
									</MDBCol>
								</MDBRow>
								<MDBRow>
									<MDBCol md="12">
										<MDBRow className="ListsHeadRow">
											<MDBCol md="12" className="ListsHead">
												<MDBRow>
													<MDBCol md="1">
														<MDBInput label=" " type="checkbox" id="assignheader0" />
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Assignment
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Module
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Type													
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Due Date
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														From Date
													</MDBCol >
													<MDBCol md="1" className="textHeader">
														
													</MDBCol >
												</MDBRow>
											</MDBCol>
										</MDBRow>
										
										{this.state.allAssignmentLists.map((item, index) =>{
											const assignindex = "ass"+index
											return(
												<div>
													<MDBRow>
														<MDBCol md="12">
															<MDBRow>
																<MDBCol md="1" >
																	<MDBInput type="checkbox" id={assignindex} label=" " onChange={(e)=>this.showassignmentdoc(e)} />
																</MDBCol>
																<MDBCol md="2" className="textHeader">
																	{item.test_name}
																</MDBCol >
																<MDBCol md="2" className="textHeader">
																	Module
																</MDBCol >
																<MDBCol md="2" className="textHeader">
																	{item.assignment_testName}											
																</MDBCol >
																<MDBCol md="2" className="textHeader">
																	{item.end_date}											
																</MDBCol >
																<MDBCol md="2" className="textHeader">
																	{item.start_date}											
																</MDBCol >
																<MDBCol md="1" className="iconPosition">
																	<MDBIcon icon="file" id={assignindex} onClick={(e)=>this.showassignmentdoc(e)} ></MDBIcon>
																</MDBCol >
															</MDBRow>
														</MDBCol>
													</MDBRow>
													<div style={{display:"none"}} id={"AssignmentDetails"+assignindex}>
														<MDBContainer>
															<MDBRow>
																<MDBCol md="12" >
																	<span class="labeltext">Title :</span>{item.test_name} <br />
																	<span class="labeltext">Assignment Type :</span>{item.assignment_testName} <br />
																	<span class="labeltext">Short Description :</span> {item.description} <br />
																	<span class="labeltext">Search Tags :</span> - <br />
																	<span class="labeltext">Created On :</span>{item.created_on} <br />
																	<span class="labeltext">Out Of  :</span>{item.out_of} <br />
																	<span class="labeltext">Weightage :</span>{item.weightage} <br />
																	<span class="labeltext">Grade :</span>{item.weightage} <br />
																	{(item.assignment_testName =="Essay" && item.assignment_testName =="Project Report") &&(
																		<div>
																			<span class="labeltext">Project Report Document :</span> -  <br />
																		</div>
																	)}
																	<span class="labeltext">Test Duration :</span>{item.test_duration}  <br />
																	{(item.assignment_testName =="Exercise") &&(
																		<div>
																			<span class="labeltext">Deatiled desc :</span>{item.detailed_description}  <br />
																		</div>
																	)}
																</MDBCol >
															</MDBRow>
															{(item.assignment_testName =="Test") &&(
																<div>
																	<span class="labeltext">Test Type :</span>{item.assignmentTestTypename} <br />
																	<MDBRow>
																		<MDBCol md="1" >
																		</MDBCol>
																		<MDBCol md="11" >
																			<p>{this.question}</p>
																			
																		</MDBCol>
																	</MDBRow>
																</div>
															)}
														</MDBContainer>
													</div>
												</div>
											)
										})}

									</MDBCol>
								</MDBRow>
								<MDBRow>
									<MDBCol md="12">
										<MDBBtn color="primary" size="md" rounded  type="submit" >Add to Course</MDBBtn>
										<MDBBtn color="primary" size="md" rounded  type="submit" onClick={()=>this.closeassignment()}>Cancel</MDBBtn>
									</MDBCol>
								</MDBRow>
							</div>
						)}
						{/* End Display Assignment Lists From Library */}
						{/* Display Assignment Lists From Course */}
						{(this.state.showassignmentlists && this.state.assignmentListsWithCourse.length > 0) &&(
							<div>
								<MDBRow>
									<MDBCol md="12">
										<MDBRow className="ListsHeadRow">
											<MDBCol md="12" className="ListsHead">
												<MDBRow>
													<MDBCol md="1">
														<MDBInput label=" " type="checkbox" id="assignheader0" />
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Assignment
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Module
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Type													
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														Due Date
													</MDBCol >
													<MDBCol md="2" className="textHeader">
														From Date
													</MDBCol >
													<MDBCol md="1" className="textHeader">

													</MDBCol >
												</MDBRow>
											</MDBCol>
										</MDBRow>
										{this.state.assignmentListsWithCourse.map((item, index) =>{
											const assignindex = "assx"+index
											return(
												<div>
													<MDBRow>
														<MDBCol md="12">
															<MDBRow>
																<MDBCol md="1" >
																	<MDBInput type="checkbox" id={assignindex} label=" " onChange={(e)=>this.showassignmentdoc(e)} />
																</MDBCol>
																<MDBCol md="2" className="textHeader">
																	{item.test_name}
																</MDBCol >
																<MDBCol md="2" className="textHeader">
																	Module
																</MDBCol >
																<MDBCol md="2" className="textHeader">
																	{item.assignment_testName}											
																</MDBCol >
																<MDBCol md="2" className="textHeader">
																	{item.end_date}											
																</MDBCol >
																<MDBCol md="2" className="textHeader">
																	{item.start_date}											
																</MDBCol >
																<MDBCol md="1" className="iconPosition">
																	<MDBIcon icon="file" id={assignindex} onClick={(e)=>this.showassignmentdoc(e)} ></MDBIcon>
																</MDBCol >
															</MDBRow>
														</MDBCol>
													</MDBRow>
													<div style={{display:"none"}} id={"AssignmentDetails"+assignindex}>
														<MDBContainer>
															<MDBRow>
																<MDBCol md="12" >
																	<span class="labeltext">Title :</span>{item.test_name} <br />
																	<span class="labeltext">Assignment Type :</span>{item.assignment_testName} <br />
																	<span class="labeltext">Short Description :</span> {item.description} <br />
																	<span class="labeltext">Search Tags :</span> - <br />
																	<span class="labeltext">Created On :</span>{item.created_on} <br />
																	<span class="labeltext">Out Of  :</span>{item.out_of} <br />
																	<span class="labeltext">Weightage :</span>{item.weightage} <br />
																	<span class="labeltext">Grade :</span>{item.weightage} <br />
																	{((item.assignment_testName =="Essay") || (item.assignment_testName =="Project Report") || (item.assignment_testName =="Others")) &&(
																		<div>
																			<span class="labeltext">Project Report Document :</span> -  <br />
																		</div>
																	)}
																	{(item.assignment_testName =="Exercise") &&(
																		<div>
																			<span class="labeltext">Deatiled desc :</span>{item.detailed_description}  <br />
																		</div>
																	)}
																</MDBCol >
															</MDBRow>
															{(item.assignment_testName =="Test") &&(
																<div>
																	<span class="labeltext">Test Duration :</span>{item.test_duration}  <br />
																	<span class="labeltext">Test Type :</span>{item.assignmentTestTypename} <br />
																	
																	<MDBRow>
																		<MDBCol md="1" >
																		</MDBCol>
																		<MDBCol md="11" >
																			{this.state.allQuestionLists.map((item, index) =>{
																				return(
																					<div>
																						<span class="labeltext"> {index+1+")"} {item.test_question}</span>
																						
																					</div>
																				)
																			})}
																		</MDBCol>
																	</MDBRow>
																</div>
															)}
														</MDBContainer>
													</div>
												</div>
											)
										})}
									</MDBCol>
								</MDBRow>
							</div>
						)}
						{/* End Display Assignment Lists From Course */}
					</MDBCol>
				</MDBRow>
			</div>
		)
	}
}
export default Assignments
