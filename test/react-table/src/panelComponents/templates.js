import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css'
// globalVar;

import globalVar from './global'
import {ControlPanel} from "./conponents.js";
import {getCookie} from "./functions.js";
import Table from '../tableComponents/table';
import {getColor, getColorSize} from '../colorPalette'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
document.cookies = cookies

export class ORGPage extends React.Component{
    constructor(props){
        super(props);
        this.addCourse = this.addCourse.bind(this);
    }
    addCourse(){
        let name = $("#course_name").val();
        let top = (parseInt($("#start").val())-9)*4.0625;
        let height = parseInt($("#duration").val())*4.0625;
        let dayContainer = $("#day").val().toLowerCase()+"Container";
        
        //if (!name||!top||!height||!dayContainer) return;
        
        let org = $('.'+dayContainer).html();
        let newBlock = `<div class = 'course-block w-100 p-4' style = 'position:absolute;top:${top}rem;height:${height}rem'>${name}</div>`;
        $('.'+dayContainer).html(org+newBlock);
    }
    render(){
        return(
            <div className = "d-flex flex-row h-100">
                <div className = "d-flex flex-column p-4" style = {{width:"25rem",backgroundColor:"#ebf4ff"}}>
                    <div class="form-group">
                        <label for="course_name">Name</label>
                        <input type="text" class="form-control" id="course_name" placeholder="ECE110" defaultValue = "ECE110"/>
                    </div>
                    <div class="form-group">
                        <label for="start">Start</label>
                        <input type="number" class="form-control" id="start" placeholder="9" defaultValue = "9"/>
                    </div>
                    <div class="form-group">
                        <label for="duration">Duration</label>
                        <input type="number" class="form-control" id="duration" placeholder="1" defaultValue = "1"/>
                    </div>
                    <div class="form-group">
                        <label for="day">Day</label>
                        <select class="form-control" id="day">
                        <option>Mon</option>
                        <option>Tue</option>
                        <option>Wed</option>
                        <option>Thur</option>
                        <option>Fri</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" onClick = {this.addCourse}>Add</button>
                </div>
                <div className = "d-flex flex-column flex-grow-1 p-4" style = {{backgroundColor:"#A8D0FF",position:"relative"}}>
                    <div className = "border-bottom w-100 mb-4 d-flex flex-row pl-5">
                        <div className = "d-flex mx-auto">Mon</div>
                        <div className = "d-flex mx-auto">Tue</div>
                        <div className = "d-flex mx-auto">Wed</div>
                        <div className = "d-flex mx-auto">Thur</div>
                        <div className = "d-flex mx-auto">Fri</div>
                    </div>
                    <div className = "border-bottom w-100 mb-time">9:00</div>
                    <div className = "border-bottom w-100 mb-time">10:00</div>
                    <div className = "border-bottom w-100 mb-time">11:00</div>
                    <div className = "border-bottom w-100 mb-time">12:00</div>
                    <div className = "border-bottom w-100 mb-time">13:00</div>
                    <div className = "border-bottom w-100 mb-time">14:00</div>
                    <div className = "border-bottom w-100 mb-time">15:00</div>
                    <div className = "border-bottom w-100 mb-time">16:00</div>
                    <div className = "border-bottom w-100 mb-time">17:00</div>
                    <div className = "border-bottom w-100 mb-time">18:00</div>
                    <div className = "border-bottom w-100 mb-time">19:00</div>
                    <div className = "border-bottom w-100 mb-time">20:00</div>
                    <div className = "border-bottom w-100">21:00</div>
                    <div className = "d-flex flex-row h-100 w-100" style = {{position:"absolute",top:"0",bottom:"0",left:"0",right:"0",paddingLeft:"5rem",paddingRight:"1.5rem",paddingTop:"6.1rem"}}>
                        <div className = "flex-grow-1 monContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 tueContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 wedContainer" style = {{position:"relative"}}></div>
                        <div className = "flex-grow-1 thurContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 friContainer" style = {{position:"relative"}} ></div>
                    </div>
                </div>
                <div className = "d-flex flex-column flex-grow-1 p-4" style = {{backgroundColor:"#A8D0FF",position:"relative"}}>
                    <div className = "border-bottom w-100 mb-4 d-flex flex-row pl-5">
                        <div className = "d-flex mx-auto">Mon</div>
                        <div className = "d-flex mx-auto">Tue</div>
                        <div className = "d-flex mx-auto">Wed</div>
                        <div className = "d-flex mx-auto">Thur</div>
                        <div className = "d-flex mx-auto">Fri</div>
                    </div>
                    <div className = "border-bottom w-100 mb-time">9:00</div>
                    <div className = "border-bottom w-100 mb-time">10:00</div>
                    <div className = "border-bottom w-100 mb-time">11:00</div>
                    <div className = "border-bottom w-100 mb-time">12:00</div>
                    <div className = "border-bottom w-100 mb-time">13:00</div>
                    <div className = "border-bottom w-100 mb-time">14:00</div>
                    <div className = "border-bottom w-100 mb-time">15:00</div>
                    <div className = "border-bottom w-100 mb-time">16:00</div>
                    <div className = "border-bottom w-100 mb-time">17:00</div>
                    <div className = "border-bottom w-100 mb-time">18:00</div>
                    <div className = "border-bottom w-100 mb-time">19:00</div>
                    <div className = "border-bottom w-100 mb-time">20:00</div>
                    <div className = "border-bottom w-100">21:00</div>
                    <div className = "d-flex flex-row h-100 w-100" style = {{position:"absolute",top:"0",bottom:"0",left:"0",right:"0",paddingLeft:"5rem",paddingRight:"1.5rem",paddingTop:"6.1rem"}}>
                        <div className = "flex-grow-1 monContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 tueContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 wedContainer" style = {{position:"relative"}}></div>
                        <div className = "flex-grow-1 thurContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 friContainer" style = {{position:"relative"}} ></div>
                    </div>
                </div>
            </div>
        );
    }
}
export class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCourses: [],
            selectedMeetings: [],
            timetableRange: 'Fall',
            highlightCourse: '',
            host: 'http://yucanwu.com:3000'
        }
        this.colorList = []
        this.addCourse = this.addCourse.bind(this);
        this.removeCourse = this.removeCourse.bind(this);
        this.addMeeting = this.addMeeting.bind(this)
        this.removeMeeting = this.removeMeeting.bind(this)
        this.randomColorIndex = this.randomColorIndex.bind(this)
        this.changeTimetableRange = this.changeTimetableRange.bind(this)
        this.cookiesPrepared = false
        this.updateCookies = this.updateCookies.bind(this)
        this.restoreCourses = this.restoreCourses.bind(this)
        this.resotreMeetings = this.resotreMeetings.bind(this)
    }

    async componentDidMount() {
        const time = cookies.get('updateTime');

        let url = this.state.host + `/api/couses/updatetime`
        
        await fetch(url ,{mode:'cors'}).then((response)=>{return response.json()}).then(async (obj)=>{
            const dbTime = obj.time
            if (time != dbTime) {
                console.log('Cleared all old data');
                cookies.set('updateTime' , dbTime)
                cookies.set('courses', [])
                cookies.set('meetings', [])
            } else {
                let selectedCourses = cookies.get('courses') || []//.forEach(c=>await this.restoreCourses(c))
                let selectedMeetings = cookies.get('meetings') || []
                
                await this.restoreCourses(selectedCourses)
                this.resotreMeetings(selectedMeetings)

                console.log('Restored all old data');
                
            }
            this.cookiesPrepared = true
        }).catch(err=>{console.error('Error',err)});
    }

    resotreMeetings(meetings) {
        for (let i in meetings) {
            let meeting = meetings[i];
            
            this.addMeeting(meeting.courseCode, meeting.meetingCode, meeting.meetingType)
        }
    }

    async restoreCourses(courses) {
        for (let i in courses) {
            const course = courses[i]
            
            let obj = await this.loadDetail(course)
            this.addCourse(obj)
        }
    }

    updateCookies() {
        if (!this.cookiesPrepared) return
        cookies.set('courses', this.state.selectedCourses.map(c=>c.courseName))
        // cookies.set('meetings', this.state.selectedMeetings.map(m=>`${m.courseCode}:${m.meetingCode}:${m.meetingType}`))
        cookies.set('meetings', this.state.selectedMeetings)
        console.log('Cookies updated');
    }

    componentDidUpdate() {
        document.selectedCourses = this.state.selectedCourses
        document.selectedMeetings = this.state.selectedMeetings
        this.updateCookies()
    }

    changeTimetableRange(range) {
        let timetableRange = range
        this.setState({timetableRange})
    }

    async loadDetail(courseCode) {
        let url = this.state.host + `/API/courses?limit=1&code=${courseCode}&detail=1`
        let course = {}
        
        await fetch(url ,{mode:'cors'}).then((response)=>{return response.json()}).then((obj)=>{
                // globalVar.searchCache[input] = obj;
                document.newCourse = obj[0]
                // Promise.resolve( obj[0] )
                course = obj[0]
                console.log(obj);
                
        }).catch(err=>{console.error('Error',err)});
        return course
    }

    addMeeting(courseCode, newMeetingCode, meetingType) {
        let mets = this.state.selectedMeetings
        mets.push({
            courseCode: courseCode,
            meetingCode: newMeetingCode,
            meetingType: meetingType
        })
        this.setState({selectedMeetings:mets})
    }

    removeMeeting(courseCode, oldMeetingCode) {
        let mets = this.state.selectedMeetings
        mets = mets.filter(o=>o.courseCode !== courseCode || o.meetingCode !== oldMeetingCode)
        this.setState({selectedMeetings:mets})
    }

    randomColorIndex() {
        let size = getColorSize()
        let newColorIndex = Math.floor(Math.random()* size)
        while (this.colorList.length < size && this.colorList.find(c=>c==newColorIndex)){
            newColorIndex = Math.floor(Math.random()* size)
        }
        this.colorList.push(newColorIndex)
        return newColorIndex
    }

    addCourse(newCourseObj){
        let colorIndex = this.randomColorIndex()
        newCourseObj.colors = {
            light: getColor(colorIndex, 50),
            medium: getColor(colorIndex, 100),
            normal: getColor(colorIndex, 300),
            dark: getColor(colorIndex, 800)
        }
        
        let org = this.state.selectedCourses;
        org.push(newCourseObj);
        this.setState({selectedCourses:org});
    }
    removeCourse(courseCode){
        let org = this.state.selectedCourses;
        for (let i = 0;i<org.length;i++){
            if (org[i].courseName == courseCode){
                org.splice(i,1);
                break;
            }
        }
        let mets = this.state.selectedMeetings
        mets = mets.filter(o=>o.courseCode !== courseCode)
        this.setState({selectedCourses:org});
        this.setState({selectedMeetings:mets})
    }
    render(){
        let fallClass = "d-flex px-3 ml-auto pill-left pill " + (this.state.timetableRange === 'Fall' ? 'selected' : '')
        let winterClass = "d-flex px-3 pill-middle pill " + (this.state.timetableRange === 'Winter' ? 'selected' : '')
        
        return(
            <div className = "d-flex flex-column h-100">
                <div className = "nav d-none" id = "navbar">
                    <div className = "m-auto title open-san text-white">LOGO</div>
                </div>
                <div className = "d-flex flex-row flex-grow-1 open-san">
                    <div className = "d-flex flex-column py-4 pl-4 info-section" style = {{width:"25rem"}}>
                        <ControlPanel 
                            selectedCourses = {this.state.selectedCourses} 
                            addCourse = {this.addCourse} 
                            removeCourse = {this.removeCourse} 
                            addMeeting = {this.addMeeting}
                            removeMeeting = {this.removeMeeting}
                            selectedMeetings={this.state.selectedMeetings}
                            host={this.state.host}/>
                    </div>
                    <div className = "d-flex flex-column flex-grow-1 p-4">
                        <div className = "d-flex flex-row table-control pb-2 open-san mb-3">
                            <div className = "d-flex px-3 mr-3 pill selected"><div className = " m-auto">Timetable</div></div>
                            {/* <div className = "d-flex px-3 mr-3 pill"><div className = " m-auto">CABE</div></div>
                            <div className = "d-flex px-3 mr-auto pill"><div className = " m-auto">Graduation req.</div></div> */}

                            <div className = {fallClass}
                                onClick={()=>this.changeTimetableRange('Fall')}><div className = " m-auto">Fall</div></div>
                            <div className = {winterClass}
                                onClick={()=>this.changeTimetableRange('Winter')}><div className = " m-auto">Winter</div></div>
                            <div className = "d-flex px-3 pill-right pill"><div className = " m-auto">Both</div></div>
                        </div>
                        <Table
                            selectedCourses={this.state.selectedCourses}
                            selectedMeetings={this.state.selectedMeetings}
                            ></Table>
                        {/* <div className = "container-card pill shadow d-flex flex-row flex-grow-1 open-san">
                            <div className = "d-flex flex-column flex-grow-1 p-4" style = {{position:"relative"}}>
                                <div className = "d-flex flex-column">
                                    <div className = "border-bottom w-100 mb-4 d-flex flex-row pl-5">
                                        <div className = "d-flex mx-auto">Mon</div>
                                        <div className = "d-flex mx-auto">Tue</div>
                                        <div className = "d-flex mx-auto">Wed</div>
                                        <div className = "d-flex mx-auto">Thur</div>
                                        <div className = "d-flex mx-auto">Fri</div>
                                    </div>
                                    <div className = "border-bottom mb-time">9:00</div>
                                    <div className = "border-bottom mb-time">10:00</div>
                                    <div className = "border-bottom mb-time">11:00</div>
                                    <div className = "border-bottom mb-time">12:00</div>
                                    <div className = "border-bottom mb-time">13:00</div>
                                    <div className = "border-bottom mb-time">14:00</div>
                                    <div className = "border-bottom mb-time">15:00</div>
                                    <div className = "border-bottom mb-time">16:00</div>
                                    <div className = "border-bottom mb-time">17:00</div>
                                    <div className = "border-bottom mb-time">18:00</div>
                                    <div className = "border-bottom mb-time">19:00</div>
                                    <div className = "border-bottom mb-time">20:00</div>
                                    <div className = "border-bottom">21:00</div>
                                </div>
                                <div className = "d-flex flex-row h-100 w-100" style = {{position:"absolute",top:"0",bottom:"0",left:"0",right:"0",paddingLeft:"5rem",paddingRight:"1.5rem",paddingTop:"6.1rem"}}>
                                    <div className = "flex-grow-1 monContainer" style = {{position:"relative"}} ></div>
                                    <div className = "flex-grow-1 tueContainer" style = {{position:"relative"}} ></div>
                                    <div className = "flex-grow-1 wedContainer" style = {{position:"relative"}}></div>
                                    <div className = "flex-grow-1 thurContainer" style = {{position:"relative"}} ></div>
                                    <div className = "flex-grow-1 friContainer" style = {{position:"relative"}} ></div>
                                </div>
                            </div>
                            <div className = "d-flex flex-column flex-grow-1 p-4" style = {{position:"relative"}}>
                    <div className = "border-bottom w-100 mb-4 d-flex flex-row pl-5">
                        <div className = "d-flex mx-auto">Mon</div>
                        <div className = "d-flex mx-auto">Tue</div>
                        <div className = "d-flex mx-auto">Wed</div>
                        <div className = "d-flex mx-auto">Thur</div>
                        <div className = "d-flex mx-auto">Fri</div>
                    </div>
                    <div className = "border-bottom mb-time">9:00</div>
                    <div className = "border-bottom mb-time">10:00</div>
                    <div className = "border-bottom mb-time">11:00</div>
                    <div className = "border-bottom mb-time">12:00</div>
                    <div className = "border-bottom mb-time">13:00</div>
                    <div className = "border-bottom mb-time">14:00</div>
                    <div className = "border-bottom mb-time">15:00</div>
                    <div className = "border-bottom mb-time">16:00</div>
                    <div className = "border-bottom mb-time">17:00</div>
                    <div className = "border-bottom mb-time">18:00</div>
                    <div className = "border-bottom mb-time">19:00</div>
                    <div className = "border-bottom mb-time">20:00</div>
                    <div className = "border-bottom">21:00</div>
                    <div className = "d-flex flex-row h-100 w-100" style = {{position:"absolute",top:"0",bottom:"0",left:"0",right:"0",paddingLeft:"5rem",paddingRight:"1.5rem",paddingTop:"6.1rem"}}>
                        <div className = "flex-grow-1 monContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 tueContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 wedContainer" style = {{position:"relative"}}></div>
                        <div className = "flex-grow-1 thurContainer" style = {{position:"relative"}} ></div>
                        <div className = "flex-grow-1 friContainer" style = {{position:"relative"}} ></div>
                    </div>
                </div>
        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}