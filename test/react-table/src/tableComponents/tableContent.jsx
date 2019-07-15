import React, { Component } from 'react';
import uniqid from 'uniqid'
import {getColor, getColorSize} from '../colorPalette'

class TableContent extends Component {
    state = { 
        popupMeeting: undefined,
    }

    preState = {
        preMeeting: undefined
    }

    fakeMeetingLists = [
        [
            {_id: uniqid(), courseCode: 'ECE302', courseName: 'probability', meetingCode: '', meetingType: 'LEC', meetingStart: '10:00', meetingEnd:'11:00', meetingLocation: "GB244"},
            {_id: uniqid(), courseCode: 'ECE302', courseName: 'probability', meetingCode: '', meetingType: 'TUT', meetingStart: '13:00', meetingEnd:'15:00', meetingLocation: "GB243"},
        ],
        [],
        [],
        [
            {_id: uniqid(), courseCode: 'ECE302', courseName: 'probability', meetingType: 'LEC', meetingStart: '12:00', meetingEnd:'13:00', meetingLocation: "GB244"},
            {_id: uniqid(), courseCode: 'ECE302', courseName: 'probability', meetingType: 'TUT', meetingStart: '13:00', meetingEnd:'14:00', meetingLocation: "GB243"},
        ],
        []]
    
    meetings = []

    updateMeetings = () => {
        this.meetings = []
        let id_cnt = 0;
        let {selectedMeetings, selectedCourses} = this.props
        selectedMeetings.forEach(meetingData=>{
            let {courseCode, meetingCode, meetingType} = meetingData
            let course = selectedCourses.find(c=>c.courseName === courseCode) 
            let {detail} = course.meetings[meetingType].find(m=>m.meetingName===meetingCode)

            let meeting = {
                // _id: `${courseCode}-${meetingCode}`, 
                courseCode: courseCode, 
                courseName: course.courseTitle, 
                courseType: course.courseType,
                meetingCode: meetingCode, 
                meetingType: meetingType,
                colors: course.colors
            }

            // if (this.pro)
            if (this.props.filter.find(t=>t===course.courseType)) {   
                detail.forEach(m=>{
                    meeting._id = `${id_cnt ++}`
                    meeting.meetingStart = m.meetingStartTime
                    meeting.meetingEnd = m.meetingEndTime
                    meeting.meetingLocation = m.meetingLocation || m.assignedRoom1
                    meeting.day = m.meetingDay
                    // check for duplications
                    let preMeeting = this.meetings.find(pm=>
                        pm.meetingStart === meeting.meetingStart && 
                        pm.meetingEnd === meeting.meetingEnd && 
                        pm.day == meeting.day &&
                        pm.courseCode === meeting.courseCode &&
                        pm.meetingCode === meeting.meetingCode)
                    if (preMeeting) {
                        preMeeting.meetingLocation += ' / ' + meeting.meetingLocation
                        
                    } else {
                        this.meetings.push(Object.assign({}, meeting))
                    }
                })
            }
        })
    }

    helpers = {
        minToString : (min) => {
            min = parseInt(min)
            let hour = parseInt(min / 60)
            min = min % 60
            return (hour < 10 ? `0${hour}` : `${hour}`) + ':' + (min < 10 ? `0${min}` : `${min}`)
        },
        stringToMin : (s) => {
            
            return s.split(':').map(e=>parseInt(e)).reduce((a,b)=>a*60+b)
        }
    }

    getMeetingList = (day) => {
        let list = this.meetings.filter(m=>m.day === day)
        list.sort((a,b)=>a.meetingStart < b.meetingStart ? -1 : 1)
        
        return list || []
    }


    clickTest = (meeting) => {
        let newState = this.state
        newState.popupMeeting = (meeting._id === newState.popupMeeting) ? undefined : meeting._id;
        this.setState(newState)
    }

    generateCourseTags = (meetingList, minHeight = 2, day = 1, startHour = 9) => {
        let tags = []
        let dayStartTime = startHour * 60;
        let dayTime =  dayStartTime  /** current time in min */
        let {displayMode} = this.props
        let tagIndex = 0
        let conflicts = []
        meetingList.forEach(meeting => {
            let startTime = meeting.meetingStart.split(':').map(e=>parseInt(e)).reduce((a,b)=>a*60+b)
            let endTime = meeting.meetingEnd.split(':').map(e=>parseInt(e)).reduce((a,b)=>a*60+b)
            

            /** NOTE handling gap message */
            if (dayTime < startTime) {
                let gapHeight = `${minHeight * (startTime - dayTime)}px`
                let tagBlockStyle = {
                    position: 'absolute',
                    height: gapHeight,
                    left: 0,
                    right: 0,
                    top: `${minHeight * (dayTime - dayStartTime)}px`
                }
                let gapTag = (
                    <div className="p-0 m-0" style={tagBlockStyle} key={tagIndex++}>
                        <div className="h-100" style={{textAlign: "center", lineHeight: gapHeight}}>
                            {(dayTime != startHour * 60 && (displayMode === 'L' || displayMode === 'M')) ? `${(startTime - dayTime) / 60} hour(s) gap` : ''}
                            {(dayTime != startHour * 60 && displayMode === 'S') ? `${(startTime - dayTime) / 60} h gap` : ''}
                        </div>
                    </div>
                )
                tags.push(gapTag)
            }

            /** NOTE handling course message */            
            let courseHeight = minHeight * (endTime - startTime) 
            let courseBlockStyle = {
                height: `${courseHeight}px`,
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${minHeight * (startTime - dayStartTime)}px`
            }            
            let courseTagStyle = {}
            let courseContentStyle = {}
            let expanded = meeting._id === this.state.popupMeeting
            if (expanded) {// && meeting._id != this.preState.preMeeting
                courseTagStyle = {
                    // background: '#18ffff',
                    position: 'absolute',
                    left: '0px',
                    right: '0px',
                    top: '0px',
                    height: `${minHeight * (endTime - startTime) + 120}px`,
                    zIndex: 5
                }
                courseContentStyle = {
                    minHeight: `${minHeight * (endTime - startTime) - 5}px`,
                    background: meeting.colors.dark,
                    color: 'white'
                    // height: '90%'
                }
                this.preState.preMeeting = meeting._id
            } else {
                courseTagStyle = {
                    // background: '#ffffff',
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    right: '0px',
                    paddingLeft: '2px',
                    paddingRight: '2px',
                    height: `${minHeight * (endTime - startTime)}px`,
                    zIndex: 0
                }
                courseContentStyle = {
                    minHeight: `${minHeight * (endTime - startTime) - 5}px`,
                    // background: '#ffffff',
                    background: `${meeting.colors.medium}`,
                    color: 'black',
                    // border: `${meeting.colors.normal} 1px solid`
                    // height: '90%'
                }
                // if (this.preState.preMeeting == meeting._id) this.preState.preMeeting = undefined
            }
            
            let meetingTypeStyle = {
                
            }
            switch (meeting.meetingType) {
                case 'LEC':
                    meetingTypeStyle.background = getColor('lightblue', 600)
                    break;
                case 'TUT':
                    meetingTypeStyle.background = getColor('amber', 600)
                    break;
                case 'PRA':
                    meetingTypeStyle.background = getColor('pink', 600)
                    break;
                default:
                    break;
            }


            let courseTag = (
                <div className="p-1 " style={courseBlockStyle} onClick={()=>this.clickTest(meeting)} key={tagIndex++}>
                    <div className='time-block-container' style={courseTagStyle}>
                        <div className="time-block w-100" style={courseContentStyle}>
                            <p className='m-0'>{(displayMode === 'M' || displayMode === 'L') ? meeting.courseCode : meeting.courseCode.substr(0,6)}</p>
                            <p className="badge badge-pill badge-info m-0" style={meetingTypeStyle}>{meeting.meetingType}</p>
                            <p>
                                {((expanded || (courseHeight > 50))) ? <span>{meeting.meetingCode.substr(3)}<br></br></span> : ''}
                                {(expanded || (courseHeight > 100 && displayMode == 'L')) ? <span>{meeting.meetingStart} - {meeting.meetingEnd}<br></br></span> : ''}
                                {(expanded) ? <span>{meeting.meetingLocation}</span> : ''}
                            </p>
                        </div>
                    </div>
                </div>
            )
            tags.push(courseTag)
            
            /** NOTE capture conflicts */
            if (dayTime > startTime) {
                // CONFLICTED
                conflicts.push({
                    startTime: startTime,
                    endTime: (dayTime > endTime) ? endTime: dayTime
                })
            }

            dayTime = (dayTime < endTime) ? endTime: dayTime;
        });

        /** NOTE handling the conflicts */
        if (conflicts.length > 0) {
            conflicts = conflicts.map(c=>c.startTime * 24*60 + c.endTime)
                                .filter((value, index, array)=>array.indexOf(value) === index)
                                .map(c=>{return{startTime: parseInt(c/24/60), endTime: c % (24*60)}})
            conflicts.forEach(conflict=>{

                // let conflict = {_id: `${day}-${startTime}-${endTime}`}      // create an id for expansion
                let {startTime, endTime} = conflict
                conflict._id = `${day}-${startTime}-${endTime}`
                conflict.meetingInfo = []
                meetingList.filter(m=>this.helpers.stringToMin(m.meetingStart) <= startTime && this.helpers.stringToMin(m.meetingEnd) >= endTime)
                        .map(m=>{
                            conflict.meetingInfo.push({
                                name: `${displayMode == 'L' ? m.courseCode : m.courseCode.substr(0,6)}-${m.meetingCode}`,
                                type: m.meetingType
                            })
                        })

                let conflictHeight = minHeight * (endTime - startTime) 
                let conflictBlockStyle = {
                    height: `${conflictHeight}px`,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${minHeight * (startTime - dayStartTime)}px`
                }            
                let conflictTagStyle = {}
                let conflictContentStyle = {}
                let expanded = conflict._id === this.state.popupMeeting
                if (expanded) {
                    conflictTagStyle = {
                        position: 'absolute',
                        left: '0px',
                        right: '0px',
                        Height: `${minHeight * (endTime - startTime)+120}px`,
                        zIndex: 4
                    }
                    conflictContentStyle = {
                        background: '#EF5350',
                        minHeight: `${minHeight * (endTime - startTime)}px`,
                        color: 'white',
                        height: '90%'
                    }
                    this.preState.preMeeting = conflict._id
                } else {
                    conflictTagStyle = {
                        position: 'absolute',
                        left: '0px',
                        right: '0px',
                        height: `${minHeight * (endTime - startTime)}px`,
                        zIndex: 3
                    }
                    conflictContentStyle = {
                        background: '#FF7043',
                        minHeight: `${minHeight * (endTime - startTime)}px`,
                        color: 'white',
                        height: '90%'
                    }
                }

                let expandedHTML = []
                conflict.meetingInfo.forEach(m=>{
                    expandedHTML.push(<span key={m.name}>{m.name}<br></br></span>)
                })
    
                let conflictTag = (
                    <div className="p-0" style={conflictBlockStyle} onClick={()=>this.clickTest(conflict)} key={tagIndex++}>
                        <div  style={conflictTagStyle}>
                            <div className="time-block w-100" style={conflictContentStyle}>
                                <p className='m-0'>CONCLICT</p>
                                {/* <p className="badge badge-pill badge-info ml-2 mb-0">{meeting.meetingType}</p> */}
                                <p>
                                    {/* {conflict._id} */}
                                    {(expanded || (conflictHeight > 50 && displayMode == 'L')) ? 
                                        <span>{this.helpers.minToString(conflict.startTime)} - {this.helpers.minToString(conflict.endTime)}<br></br></span> : ''}
                             
                                    {(expanded) ? expandedHTML : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                )
                tags.push(conflictTag)
            })
        }
        
        return tags
    }

    renderClassLists = (minHeight = 2, startDay = 1, endDay = 5) => {
        let lists = []
        this.updateMeetings()
        for (let day = startDay; day <= endDay; day++) {
            let list = (
                <div className="col pl-0 pr-0" key={day}>
                    {this.generateCourseTags(this.getMeetingList(day), minHeight,    day)}
                </div>)
            lists.push(list)
        }
        return lists
    }

    render() { 
        let {minHeight} = this.props.dimension
        return ( 
        <div className="border w-100 h-100 p-0 m-0">
            <div className="row text-center w-100 m-0 p-0">
                {this.renderClassLists(minHeight)}
            </div>
        </div> );
    }
}
 
export default TableContent;