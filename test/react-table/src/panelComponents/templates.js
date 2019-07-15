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

/** from material ui */
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Drawer, SwipeableDrawer, Divider, Grid, ButtonGroup, Button } from '@material-ui/core';

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
                <div className = "d-flex flex-column p-4" style = {{width:"20rem",backgroundColor:"#ebf4ff"}}>
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
            host: 'http://yucanwu.com:3000',
            displayMode: 'L',
            drawerOpen: false
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
        this.handleResize = this.handleResize.bind(this)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize() {
        let currentState = this.state
        if (window.innerWidth < 300) {
            currentState.displayMode = 'XS'
        } else if (window.innerWidth < 500 ) {
            currentState.displayMode = 'S'            
        } else if (window.innerWidth < 900) {
            currentState.displayMode = 'M'            
        } else {
            currentState.displayMode = 'L'
        }
        this.setState(currentState)
    }

    async componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)

        const time = cookies.get('updateTime');

        let url = this.state.host + `/api/couses/updatetime`
        
        if (!this.cookiesPrepared) {
            await fetch(url ,{mode:'cors'}).then((response)=>{return response.json()}).then(async (obj)=>{
                const dbTime = obj.time
                if (time != dbTime) {
                    // console.log('Cleared all old data');
                    cookies.set('updateTime' , dbTime)
                    cookies.set('courses', [])
                    cookies.set('meetings', [])
                } else {
                    let selectedCourses = cookies.get('courses') || []//.forEach(c=>await this.restoreCourses(c))
                    let selectedMeetings = cookies.get('meetings') || []
                    
                    await this.restoreCourses(selectedCourses)
                    this.resotreMeetings(selectedMeetings)

                    // console.log('Restored all old data');
                    
                }
                this.cookiesPrepared = true
            }).catch(err=>{console.error('Error',err)});
        }
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
        // console.log('Cookies updated');
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
                
        }).catch(err=>{console.error('Error',err)});
        return course
    }

    addMeeting(courseCode, newMeetingCode, meetingType) {
        let mets = this.state.selectedMeetings
        // let courseType = this.state.selectedCourses.find(c=>c.courseCode === courseCode).courseType
        mets.push({
            courseCode: courseCode,
            // courseType: 
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

    handleDrawerOpen = () => {
        let drawerOpen = true
        this.setState({drawerOpen})
    }

    handleDrawerClose = () => {
        let drawerOpen = false
        this.setState({drawerOpen})
    }

    render(){
        let fallClass = "d-flex px-3 ml-auto pill-left pill " + (this.state.timetableRange === 'Fall' ? 'selected' : 'unselected')
        let bothClass = "d-flex px-3 pill-middle pill " + (this.state.timetableRange === 'Both' ? 'selected' : 'unselected')
        let winterClass = "d-flex px-3 pill-right pill " + (this.state.timetableRange === 'Winter' ? 'selected' : 'unselected')
        let {displayMode} = this.state

        let layoutClass = "d-flex flex-grow-1 open-san " + (displayMode === 'Lp' ? "flex-row" : "flex-column")
        
        const drawerWidth = '100px'
        let generateTableContent = () => {
            let drawerInContent = <div></div>
            if (displayMode == 'L') {
                drawerInContent = (
                    <div className = "d-flex flex-column p-0 info-section" style = {{width:"20rem"}}>
                        <hr style={{height:'30px'}}></hr>
                        <ControlPanel 
                            selectedCourses = {this.state.selectedCourses} 
                            addCourse = {this.addCourse} 
                            removeCourse = {this.removeCourse} 
                            addMeeting = {this.addMeeting}
                            removeMeeting = {this.removeMeeting}
                            selectedMeetings={this.state.selectedMeetings}
                            host={this.state.host}
                            displayMode={this.state.displayMode}/>
                    </div>
                )
            }
            let tables = []
            if (this.state.timetableRange === 'Fall' || this.state.timetableRange === 'Both') {
                tables.push( <Table
                    key='fallTable'
                    type='Fall'
                    filter={['F', 'Y']}
                    selectedCourses={this.state.selectedCourses}
                    selectedMeetings={this.state.selectedMeetings}
                displayMode={this.state.displayMode}/> )
            }
            if (this.state.timetableRange === 'Winter' || this.state.timetableRange === 'Both') {
                tables.push( <Table
                    key='winterTable'
                    type='Winter'
                    filter={['S', 'Y']}
                    selectedCourses={this.state.selectedCourses}
                    selectedMeetings={this.state.selectedMeetings}
                displayMode={this.state.displayMode}/> )
            }
            return (
                <div>
                    <div className='d-flex flex-row'>
                        {drawerInContent}
                        <div className = "d-flex flex-column flex-grow-1 p-4" style={{}}>
                            {tables}
                        </div>
                    </div>
                </div>
            )
        }

        const controlPanelStyles = {
            root: {
                display: 'flex',
                flexGrow: 1
            },
            appBar: {
            },
            iconMenu: {
                display: this.state.drawerOpen && "none" || '',
                marginRight: '8px'
            },
            drawer: {
                // width: drawerWidth,
                flexShrink: 0
            },
            title: {
                flexGrow: 1
            },
            btnGroup: {
                boxShadow: 'none'
            }
        }

        let generateAppBar = () => {
            let drawerInAppBar = <span></span>
            let iconButton = (<span></span>)
            let iconTimetable = <i className="fas fa-calendar-alt"></i> 
            if (displayMode != 'L') {
                iconButton = (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        style={controlPanelStyles.iconMenu}
                    >
                        <MenuIcon/>
                    </IconButton>)
                drawerInAppBar = (<SwipeableDrawer
                    anchor={'left'}
                    open={this.state.drawerOpen}
                    onClose={this.handleDrawerClose}
                    onOpen={this.handleDrawerOpen}
                >
                    <div style={controlPanelStyles.drawer}>
                        <div className = "d-flex flex-column p-0 info-section" style = {{width:"20rem"}}>
                            <ControlPanel 
                                selectedCourses = {this.state.selectedCourses} 
                                addCourse = {this.addCourse} 
                                removeCourse = {this.removeCourse} 
                                addMeeting = {this.addMeeting}
                                removeMeeting = {this.removeMeeting}
                                selectedMeetings={this.state.selectedMeetings}
                                host={this.state.host}
                                displayMode={this.state.displayMode}/>
                        </div>
                    </div>
                </SwipeableDrawer>)
            } 
            if (displayMode === 'S') {
                iconTimetable = <span></span>
            }
             {
                return (
                    <div style={controlPanelStyles.root}> 
                        <AppBar
                            style={controlPanelStyles.appBar}
                            position='fixed'>
                            <Toolbar>
                                {iconButton}
                                <Typography variant="h6" style={controlPanelStyles.title}>
                                    {iconTimetable} &nbsp; Timetable
                                </Typography>
                                <Grid item>
                                    <ButtonGroup  
                                        style={controlPanelStyles.btnGroup}
                                        variant="contained"
                                        color="primary"
                                        aria-label="Full-width contained primary button group"
                                        >
                                        <Button className={fallClass} 
                                            onClick={()=>this.changeTimetableRange('Fall')}>Fall</Button>
                                        <Button
                                            className={bothClass}
                                            onClick={()=>this.changeTimetableRange('Both')}>Both</Button>
                                        <Button 
                                            className={winterClass}
                                            onClick={()=>this.changeTimetableRange('Winter')}>Winter</Button>
                                    </ButtonGroup>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                        {drawerInAppBar}
                        <hr style={{}}></hr>
                    </div>
                )
            }
        }

        return(
            <div className = "d-flex flex-column h-100">
                {/* <div className = "nav d-none" id = "navbar">
                    <div className = "m-auto title open-san text-white">LOGO</div>
                </div> */}
                <div className = {layoutClass}>
                    {generateAppBar()}
                    {generateTableContent()}
                </div>
            </div>
        );
    }
}