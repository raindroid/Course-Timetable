// globalVar;

import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import {globalVar} from './global'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button} from '@material-ui/core';
import uniqid from 'uniqid'
import SaveDoneDialog from './Dialogs';
export class ControlPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchInput : '',
            display: 'cart',
            searchList: []
        }
        this.handleInput = this.handleInput.bind(this);
        this.fetchSearchResult = this.fetchSearchResult.bind(this);
    }
    handleInput(event){
        this.setState({searchInput: event.target.value});
        if (event.target.value == '') this.setState({display: 'cart'}); // if the input is empty, switch to cart view
        else{
            this.setState({display: 'loading'}); // enter search state, display loading symbol
            this.fetchSearchResult(event.target.value);
        }
    }
    async fetchSearchResult(input){
        if (globalVar.searchCache[input]){
            this.setState({display:'search'});
            // if the result exists in cache, use cached value
        }
        else{
            await fetch(this.props.host + `/API/courses?limit=10&code=${input}&detail=1&limit=10`,{mode:'cors'}).then((response)=>{return response.json()}).then((obj)=>{
                globalVar.searchCache[input] = obj;
            }).catch(err=>{console.error('Error',err)});
            if (this.state.searchInput == input && this.state.display == 'loading'){
                // if the user is still waiting for the current result, display the result
                this.setState({display:'search'});
            }
        }
    }
    render(){
        let displayInfo = '';
        let courseList = [];
        switch (this.state.display){
            case 'cart':
                for (let courseObj of this.props.selectedCourses) {
                    
                    courseList.push(<CoursePill 
                        position = 'cart' 
                        courseCode = {courseObj.courseName} 
                        key = {courseObj.courseName + " pill"} 
                        courseObj = {courseObj} 
                        removeCourse = {this.props.removeCourse} 
                        detail={courseObj}
                        addMeeting= {this.props.addMeeting}
                        removeMeeting={this.props.removeMeeting}
                        selectedMeetings={this.props.selectedMeetings}/>);
                }
                console.log(this.props.shareLink);
                
                displayInfo = 
                    <div className = "d-flex flex-column">
                        <div className = "cart-title mx-2 mb-3 border-bottom ">
                            Selected Courses
                        </div>
                        <div className = "">
                            {courseList.length!=0 ? courseList : 
                                <div className = "font-italic mb-3 text-center text-secondary">
                                    No selected courses
                                </div>
                            }
                            <hr />
                            <div className="row justify-content-center" >
                                <SaveDoneDialog 
                                    className='col-4' 
                                    saveProfile={this.props.saveProfile}
                                    link={this.props.shareLink}></SaveDoneDialog>
                            </div>
                            {/* <div className = "d-flex flex-row mb-3 course-pill theme-primary-action pill"> */}
                                {/* <i className="fas fa-calendar-plus mr-2 my-auto ml-auto"></i> */}
                                {/* <div className = "my-auto mr-auto">Autofill schedule (not yet available)</div>   */}
                            {/* </div> */}
                        </div>
                    </div>;
                break;
            case 'search':
                    for (let courseObj of globalVar.searchCache[this.state.searchInput]){
                        courseList.push(<CoursePill position = 'search' courseCode = {courseObj.courseName} key = {courseObj.courseName + "-searchPill"} selectedCourses = {this.props.selectedCourses} courseObj = {courseObj} addCourse = {this.props.addCourse} detail={courseObj}/>);
                    }
                    displayInfo = 
                    <div className = "d-flex flex-column">
                        <div className = "">
                            {courseList.length!=0 ? courseList : 
                                <div className = "font-italic mb-3 text-center text-secondary">
                                    No result
                                </div>
                            }
                        </div>
                    </div>;
                break;
            case 'detail':
                break;
            case 'loading':
                displayInfo = 
                    <div className = "d-flex flex-column">
                        <div className = "d-flex flex-column theme-neutral-text">
                            <i className="fas fa-spinner mx-auto loading-logo mb-3 ani-spin"></i>
                            <div className = "d-flex mx-auto">Searching...</div>
                        </div>
                    </div>;
                break;
            default:
                break;
        }

        

        return(
            <div className = "container-card  shadow d-flex flex-column flex-grow-1 p-4">
                <div className = "d-flex flex-row mb-3">
                    <div className="form-label-group mb-0 flex-grow-1">
                        <input type="text" id="courseCode" className="form-control h-auto px-3 pill-left" placeholder="Course code"  name = "courseCode" value = {this.state.searchInput} onChange = {this.handleInput} onClick = {this.handleInput}/>
                        <label htmlFor="courseCode" className = "px-3 d-flex"><i className = "fas fa-search my-auto mr-1"/>Course code</label>
                    </div>
                     <div className = "d-flex px-3 pill-right cart-number theme-primary-action" onClick = {()=>{this.setState({display:'cart'})}}><i className = "fas fa-shopping-cart my-auto ml-auto mr-1"/><div className = "my-auto mr-auto">{this.props.selectedCourses.length}</div></div>
                    </div>
                {displayInfo}
            </div>
        )
    }
}
class CoursePill extends React.Component{
    constructor(props){
        super(props);
        this.generateMeetings = this.generateMeetings.bind(this)
        this.state = {
            expanded : false
        }
        this.switchExpansion = this.switchExpansion.bind(this)
    }

    generateMeetings(course) {
        let buttons = []
        let {selectedMeetings} = this.props
        
        for (let type in course.meetings){
            let typeMeetings = course.meetings[type]
            let typeButtons = []
            typeMeetings.forEach((meeting, index)=>{
                
                if (selectedMeetings.find(o=>o.courseCode === course.courseName && o.meetingCode === meeting.meetingName)) {
                    let btnHtml = (
                        <button 
                            onClick={()=>this.props.removeMeeting(course.courseName, meeting.meetingName)}
                            className="btn btn-info m-1 btn-sm" key={index}>
                            {meeting.meetingName}
                        </button>)
                    typeButtons.push(btnHtml)
                } else {
                    let btnHtml = (
                        <button 
                            onClick={()=>this.props.addMeeting(course.courseName, meeting.meetingName, type)}
                            className="btn btn-outline-info m-1 btn-sm" key={index}>
                            {meeting.meetingName}
                        </button>)
                    typeButtons.push(btnHtml)
                }
            })
            buttons.push(<div key={uniqid()}><span className="mr-2" ></span>{typeButtons} </div>)
        }
        return buttons
    }

    switchExpansion(){
        let expanded = this.state.expanded
        expanded = !expanded
        this.setState({expanded})
    }

    render(){
        if (this.props.position == 'cart'){
            // selected courses, show edit and delete buttons
            let detail = this.props.detail
            let panelStyle = {
                margin: '0',
                marginBottom: '10px',
                padding: '0',
                borderRadius: '2rem',
                boxShadow: 'none',
                border: 'none'
            }
            let detailStyle = {
                boxShadow: '0 1px 15px rgba(0, 0, 0, 0.089), 0 8px 12px rgba(0, 0, 0, 0.041)',
            }
            
            return(
                <ExpansionPanel 
                    onChange={this.switchExpansion}
                    className = "card"
                    style={panelStyle}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{padding: '0', margin: '0'}}
                    >
                        {/* <div className = "d-flex flex-row mb-3 course-pill">
                            <div className = "d-flex pill-left theme-neutral flex-grow-1 course-pill-code px-3 text-left h-100"><div className = "m-auto">{this.props.courseCode}</div></div>
                            <div className = "d-flex pill-right theme-danger-action pl-2 pr-3 h-100" onClick = {()=>{this.props.removeCourse(this.props.courseCode)}}><i className="fas fa-trash-alt m-auto"></i></div>
                        </div> */}
                         <div className = "d-flex flex-row m-0 course-pill w-100 p-0">
                            <div className = "d-flex pill-left theme-neutral flex-grow-1 course-pill-code px-3 text-left h-100"><div className = "m-auto">{this.props.courseCode}</div></div>
                            <div className = "d-flex pill-right theme-danger-action pl-2 pr-3 h-100" onClick = {()=>{this.props.removeCourse(this.props.courseCode)}}><i className="fas fa-trash-alt m-auto"></i></div>
                        
                            {/* <div className = "d-flex h-100"><div className = "m-auto">{this.props.courseCode}</div></div>
                            <div className = "d-flex h-100 badge badge-pill badge-danger" onClick = {()=>{this.props.removeCourse(this.props.courseCode)}}><i className="fas fa-trash-alt m-auto"></i></div> */}
                         </div>
                        
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        style={detailStyle}>
                        {/* <div></div> */}
                        <div className='h-100'> 
                            <h3>{detail.courseTitle || '<Unknown>'}</h3>
                            {this.generateMeetings(detail)}
                            <p dangerouslySetInnerHTML={{ __html: detail.courseDescription || 'Not Found'}}></p>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        }
        else{
            // search result
            let button = <div className = "d-flex pill-right theme-primary-action pl-2 pr-3 h-100" onClick = {()=>{this.props.addCourse(this.props.courseObj)}}><i className="fas fa-cart-plus m-auto"></i></div>;
            for (let courseObj of this.props.selectedCourses){
                if (courseObj.courseName == this.props.courseCode){
                    button = <div className = "d-flex pill-right theme-success pl-2 pr-3 h-100"><i className="fas fa-cart-arrow-down m-auto"></i></div>;
                    break;
                }
            }
            return(
                <div className = "d-flex flex-row mb-3 course-pill">
                    <div className = "d-flex pill-left theme-neutral flex-grow-1 course-pill-code px-3 text-left h-100"><div className = "m-auto">{this.props.courseCode}</div></div>
                    {button}
                </div>);
        }
    }
}