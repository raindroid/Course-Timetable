import React, { Component } from 'react';
import {Card, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary} from '@material-ui/core';
import uniqid from 'uniqid'

class TableContent extends Component {
    state = { 
        popupMeeting: undefined,
    }

    preState = {
        preMeeting: undefined
    }

    meetingLists = [
        [
            {_id: uniqid(), courseName: 'ECE302', courseTitle: 'probability', meetingType: 'LEC', meetingStart: '10:00', meeingEnd:'11:00', meetingLocation: "GB244"},
            {_id: uniqid(), courseName: 'ECE302', courseTitle: 'probability', meetingType: 'TUT', meetingStart: '13:00', meeingEnd:'15:00', meetingLocation: "GB243"},
        ],
        [],
        [],
        [
            {_id: uniqid(), courseName: 'ECE302', courseTitle: 'probability', meetingType: 'LEC', meetingStart: '12:00', meeingEnd:'13:00', meetingLocation: "GB244"},
            {_id: uniqid(), courseName: 'ECE302', courseTitle: 'probability', meetingType: 'TUT', meetingStart: '13:00', meeingEnd:'14:00', meetingLocation: "GB243"},
        ],
        []]

    getMeetingList = (day) => {
        return this.meetingLists[day - 1]
    }


    clickTest = (meeting, forceDiable= false) => {
        // console.log(meeting)
        if (forceDiable && meeting._id != newState.popupMeeting) return
        let newState = this.state
        newState.popupMeeting = (meeting._id == newState.popupMeeting) ? undefined : meeting._id;
        this.setState(newState)
    }

    allCollapse = () => {
        let newState = this.state
        newState.popupMeeting = undefined
        this.setState(newState)
        this.preState.preMeeting = undefined
    }

    generateCourseTags = (meetingList, minHeight = 2, startHour = 9) => {
        let tags = []
        let dayTime = startHour * 60;   /** current time in min */
        let {displayMode} = this.props
        let tagIndex = 0
        meetingList.forEach(meeting => {
            let startTime = meeting.meetingStart.split(':').map(e=>parseInt(e)).reduce((a,b)=>a*60+b)
            let endTime = meeting.meeingEnd.split(':').map(e=>parseInt(e)).reduce((a,b)=>a*60+b)

            if (dayTime != startTime) {
                let gapHeight = `${minHeight * (startTime - dayTime)}px`
                let gapTag = (
                    <div className="p-0 m-0" style={{height: gapHeight}} key={tagIndex++}>
                        <div className="h-100" style={{textAlign: "center", lineHeight: gapHeight}}>
                            {(dayTime != startHour * 60 && displayMode == 'L') ? `${(startTime - dayTime) / 60} hour(s) gap` : ''}
                            {(dayTime != startHour * 60 && displayMode == 'M') ? `${(startTime - dayTime) / 60} h gap` : ''}
                        </div>
                    </div>
                )
                tags.push(gapTag)
            }
            
            let courseHeight = minHeight * (endTime - startTime) 
            let courseBlockStyle = {
                height: `${courseHeight}px`
            }
            let courseTagStyle = {}
            let courseContentStyle = {}
            let expanded = false
            if (meeting._id == this.state.popupMeeting) {// && meeting._id != this.preState.preMeeting
                expanded = true
                courseTagStyle = {
                    // background: '#18ffff',
                    position: 'absolute',
                    left: '0px',
                    right: '0px',
                    height: `${minHeight * (endTime - startTime) + 120}px`,
                    zIndex: 1
                }
                courseContentStyle = {
                    background: '#18ffff',
                    height: '90%'
                }
                this.preState.preMeeting = meeting._id
            } else {
                courseTagStyle = {
                    // background: '#ffffff',
                    position: 'absolute',
                    left: '0px',
                    right: '0px',
                    height: `${minHeight * (endTime - startTime)}px`,
                    zIndex: 0
                }
                courseContentStyle = {
                    background: '#ffffff',
                    height: '90%'
                }
                // if (this.preState.preMeeting == meeting._id) this.preState.preMeeting = undefined
            }

            let courseTag = (
                <div className="p-1" style={courseBlockStyle} onClick={()=>this.clickTest(meeting)} key={tagIndex++}>
                    <div  style={courseTagStyle}>
                        <div className="time-block w-100" style={courseContentStyle}>
                            <p className='m-0'>{meeting.courseName}</p>
                            <p className="badge badge-pill badge-info ml-2 mb-0">{meeting.meetingType}</p>
                            <p>
                                {(expanded || (courseHeight > 100 && displayMode == 'L')) ? <span>{meeting.meetingStart} - {meeting.meeingEnd}<br></br></span> : ''}
                                {(expanded) ? <span>{meeting.meetingLocation}</span> : ''}
                            </p>
                        </div>
                    </div>
                </div>
            )
            tags.push(courseTag)

            dayTime = endTime;
        });
        return tags
    }

    renderClassLists = (minHeight = 2, startDay = 1, endDay = 5) => {
        let lists = []
        for (let day = startDay; day <= endDay; day++) {
            let list = (
                <div className="col pl-0 pr-0" key={day}>
                    {this.generateCourseTags(this.getMeetingList(day), minHeight)}
                </div>)
            lists.push(list)
        }
        return lists
    }

    render() { 
        let {minHeight} = this.props.dimension
        return ( 
        <div className="border w-100 h-100 p-0 m-0" onClick={this.allCollapse}>
            <div className="row text-center w-100 m-0 p-0" onClick={this.allCollapse}>
                {this.renderClassLists(minHeight)}
            </div>
        </div> );
    }
}
 
export default TableContent;