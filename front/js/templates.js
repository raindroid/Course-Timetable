import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
globalVar;

import {ControlPanel} from "./conponents.js";
import {getCookie} from "./functions.js";

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
            timetableRange: 'both',
            highlightCourse: ''
        }
    }
    render(){
        return(
            <div className = "d-flex flex-column h-100">
                <div className = "nav d-flex" id = "navbar">
                    <div className = "m-auto title open-san text-white">LOGO</div>
                </div>
                <div className = "d-flex flex-row flex-grow-1 open-san">
                    <div className = "d-flex flex-column py-4 pl-4 info-section" style = {{width:"25rem"}}>
                        <ControlPanel />
                    </div>
                    <div className = "d-flex flex-column flex-grow-1 p-4">
                        <div className = "d-flex flex-row table-control pb-2 open-san mb-3">
                            <div className = "d-flex px-3 mr-3 pill selected"><div className = " m-auto">Timetable</div></div>
                            <div className = "d-flex px-3 mr-3 pill"><div className = " m-auto">CABE</div></div>
                            <div className = "d-flex px-3 mr-auto pill"><div className = " m-auto">Graduation req.</div></div>

                            <div className = "d-flex px-3 ml-auto pill-left selected pill"><div className = " m-auto">Fall</div></div>
                            <div className = "d-flex px-3 pill-middle pill"><div className = " m-auto">Winter</div></div>
                            <div className = "d-flex px-3 pill-right pill"><div className = " m-auto">Both</div></div>
                        </div>
                        <div className = "container-card pill shadow d-flex flex-row flex-grow-1 open-san">
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}