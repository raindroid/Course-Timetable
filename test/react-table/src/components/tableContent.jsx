import React, { Component } from 'react';

class TableContent extends Component {
    state = {  }

    getMeetingList = (day) => {
        return [
            {courseName: 'ECE302', courseTitle: 'probability', meetingType: 'LEC', meetingStart: '10:00', meeingEnd:'11:00'},
            {courseName: 'ECE302', courseTitle: 'probability', meetingType: 'TUT', meetingStart: '13:00', meeingEnd:'15:00'},
        ]
    }

    generateCourseTags = (meetingList) => {
        let tags = []
        meetingList.forEach(meeting => {
            let tag = (
                <div className="time-block m-2">
                    <p className='m-0'>{meeting.courseName}</p>
                    <p className="badge badge-pill badge-info ml-2 mb-0">{meeting.meetingType}</p>
                </div>
            )
            tags.push(tag)
        });
        return tags
    }

    render() { 
        return ( 
        <div className="border w-100 h-100">
            <div className="row text-center w-100">
                <div className="col-sm">
                    {this.generateCourseTags(this.getMeetingList(1))}
                </div>
                <div className="col-sm">
                </div>
                <div className="col-sm">
                </div>
                <div className="col-sm">
                </div>
                <div className="col-sm">
                </div>
            </div>
        </div> );
    }
}
 
export default TableContent;