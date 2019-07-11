import React, { Component } from 'react';

class TableContent extends Component {
    state = {  }

    getMeetingList = (day) => {
        if (day == 1)
            return [
                {courseName: 'ECE302', courseTitle: 'probability', meetingType: 'LEC', meetingStart: '10:00', meeingEnd:'11:00'},
                {courseName: 'ECE302', courseTitle: 'probability', meetingType: 'TUT', meetingStart: '13:00', meeingEnd:'15:00'},
            ]
        else if (day == 4)
            return [
                {courseName: 'ECE302', courseTitle: 'probability', meetingType: 'LEC', meetingStart: '12:00', meeingEnd:'13:00'},
                {courseName: 'ECE302', courseTitle: 'probability', meetingType: 'TUT', meetingStart: '13:00', meeingEnd:'14:00'},
            ]
        else
            return []
    }

    generateCourseTags = (meetingList, minHeight = 2, startHour = 9) => {
        let tags = []
        let dayTime = startHour * 60;   /** current time in min */
        let {displayMode} = this.props
        meetingList.forEach(meeting => {
            let startTime = meeting.meetingStart.split(':').map(e=>parseInt(e)).reduce((a,b)=>a*60+b)
            let endTime = meeting.meeingEnd.split(':').map(e=>parseInt(e)).reduce((a,b)=>a*60+b)

            if (dayTime != startTime) {
                let gapHeight = `${minHeight * (startTime - dayTime)}px`
                let gapTag = (
                    <div className="p-0 m-0" style={{height: gapHeight}}>
                        <div className="h-100" style={{textAlign: "center", lineHeight: gapHeight}}>
                            {(dayTime != startHour * 60 && displayMode == 'L') ? `${(startTime - dayTime) / 60} hour(s) gap` : ''}
                            {(dayTime != startHour * 60 && displayMode == 'M') ? `${(startTime - dayTime) / 60} h` : ''}
                        </div>
                    </div>
                )
                tags.push(gapTag)
            }
            
            let courseHeight = minHeight * (endTime - startTime) 
            let clickTest = () => {alert('clicked')}
            let courseTag = (
                <div className="p-1" style={{height: `${courseHeight}px`}} onclick="clickTest">
                    <div className="time-block h-100 w-100">
                        <p className='m-0'>{meeting.courseName}</p>
                        <p className="badge badge-pill badge-info ml-2 mb-0">{meeting.meetingType}</p>
                        {(courseHeight > 100 && displayMode == 'L') ? <p>{meeting.meetingStart} - {meeting.meeingEnd}</p> : ''}
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
        for (let day = startDay; day < endDay; day++) {
            let list = (
                <div className="col pl-0 pr-0">
                    {this.generateCourseTags(this.getMeetingList(day), minHeight)}
                </div>)
            lists.push(list)
        }
        return lists
    }

    render() { 
        let {minHeight} = this.props.dimension
        return ( 
        <div className="border w-100 h-100 pl-3 pr-3">
            <div className="row text-center w-100">
                {this.renderClassLists(minHeight)}
            </div>
        </div> );
    }
}
 
export default TableContent;