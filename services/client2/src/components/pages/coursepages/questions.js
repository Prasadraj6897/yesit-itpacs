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
import ReactDOM from 'react-dom';

class Questions extends React.Component{
	constructor(props){
		super(props)
		this.state={
			QuestionArray : [],
			QuestionIndex:[],

		}
	}

	componentDidMount(){
		
	}

	addArray = () => {
		const item = {
			Question : "",
			answers : [
						{
							name :""
						},
						{
							name :""
						},
						{
							name :""
						},
						{
							name :""
						}
					  ]
					  
		};
		this.setState({
			QuestionArray: [...this.state.QuestionArray, item]
		});
	}

	handleQuesCheckboxchange(e, index){
		if(e.target.checked)
		{	
			const Qidarr = [...this.state.QuestionIndex]
			const  Qidadd = [...Qidarr, index] 
			this.state.QuestionIndex = Qidadd
			this.setState({ 
				QuestionIndex: this.state.QuestionIndex
			})
		}
		else
		{
			let Qidarr = this.state.QuestionIndex.filter((i) => i !== index)
			this.state.QuestionIndex = Qidarr
			this.setState({ 
				QuestionIndex : this.state.QuestionIndex 
			});

		}
		console.log(this.state.QuestionIndex)
	}

	removeArray(){
		
		/*const QuesArr = [...this.state.QuestionArray]
		{
			this.state.QuestionIndex.map((item, index) => {
				// QuesArr.splice(item, 1)
				this.state.QuestionArray = QuesArr1
			})
			
			this.setState({
				QuestionArray: this.state.QuestionArray 
			})
			console.log(this.state.QuestionArray)
		}*/
		
		/*{
			this.state.QuestionIndex.map((item, index) => {
				this.setState(prevState => {
					let jasper = Object.assign({}, prevState.QuestionArray);
					const Qidarr = jasper.filter((e, i) => i !== item) 
					QuestionArray: Qidarr
				})
			})
		}
		const updated = [...this.state.QuestionArray];
		this.setState({
			updated
		})
		console.log(this.state.QuestionArray)*/
		const QuesArr = [...this.state.QuestionArray]
		{
			this.state.QuestionIndex.map((item, index) => {
				const Qidarr = this.state.QuestionArray.filter((e, i) => i !== item)
				this.state.QuestionArray = Qidarr
				this.setState({ 
					QuestionArray : this.state.QuestionArray 
				});
			})
			
			console.log(this.state.QuestionArray)
		}
	}

	addAns (index)  {
		this.setState(prevState => {
		  let jasper = Object.assign({}, prevState.QuestionArray);  
		  const arr1 = jasper[index].answers  
		 // const  arr2 = [...arr1, {name:""}] 
		  arr1.push({name:""})            
		  QuestionArray: arr1
		})

		const updated = [...this.state.QuestionArray];
		this.setState({
			updated
		})
		console.log(this.state.QuestionArray)
	}

	handleQuestion = index => e => {
		const{name, value} = e.target

		this.setState(prevState => {
		  let jasper = Object.assign({}, prevState.QuestionArray);  // creating copy of state variable jasper
		  jasper[index].Question = value;                     // update the name property, assign a new value                 
		  QuestionArray: jasper                            // return new object jasper object
		})

		const updated = [...this.state.QuestionArray];
		this.setState({
			updated
		})
		console.log(this.state.QuestionArray)
	}

	handleAnswer (e, index, idx) {
		const{name, value} = e.target

		/*this.setState(prevState => {
		  let jasper = Object.assign({}, prevState.QuestionArray);
		  jasper[index].answers[idx].name = value;               
		  QuestionArray: jasper 
		})*/
		const newQuestionArray = this.state.QuestionArray.map((item, sidx) => {
			if (idx !== sidx) return item;
			this.setState(prevState => {
			  	let jasper = Object.assign({}, prevState.QuestionArray);
			  	jasper[index].answers[idx].name = value;               
			  	QuestionArray: jasper 
			})
			return { ...item, this.state.QuestionArray  };
		});

		const updated = [...this.state.QuestionArray];
		this.setState({
			updated
		})
		console.log(this.state.QuestionArray)

	}

	/*handletextboxAnswer(){
		const newQuestionArray = this.state.QuestionArray.map((item, sidx) => {
			if (idx !== sidx) return item;
			this.setState(prevState => {
			  	let jasper = Object.assign({}, prevState.QuestionArray);
			  	jasper[index].answers[idx].name = value;               
			  	QuestionArray: jasper 
			})
		});

		this.setState({
			QuestionArray: newQuestionArray
		});
	}*/

	render(){
		return(
			<div>	
				{
					this.state.QuestionArray.map((item, index) => {
						return(
							<div key={index}>
								<MDBRow>
									<MDBCol col md="1" className="questioncheckbox">
										<MDBInput id={index} className="iconAlign" type="checkbox" label=" " onChange = {(e)=>this.handleQuesCheckboxchange(e, index)} />
									</MDBCol>
									<MDBCol col md="11">
										<MDBInput type="text" label="Type Your Question" value={this.state.QuestionArray[index].Question} name="Question" outline onChange={this.handleQuestion(index)} />
										{
											item.answers.map((ans, idx) => {
												return(
													<div key={idx}>
														<MDBRow>
															<MDBCol col md="12">
																<MDBInput type="text" label="Type Your Answers" name="Answers" value={item.answers[idx].Answers} outline onChange={(e)=>this.handleAnswer(e, index, idx)} />
															</MDBCol>
														</MDBRow>
													</div>
												)
											})
										}

									</MDBCol>
								</MDBRow>
								<MDBIcon type="submit" icon="plus" onClick={()=>this.addAns(index)} className="addAnsicon" />
							</div>
						)
					})
				}
				<MDBBtn color="primary" size="md" rounded type="submit" onClick={this.addArray}> Add new Question </MDBBtn>
				<MDBBtn color="primary" size="md" rounded type="submit" onClick={()=>this.removeArray()}> Remove Question </MDBBtn>
			</div>
		)
	}
}


export default Questions 