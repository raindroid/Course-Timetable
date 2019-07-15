import React, { Component } from 'react';

class DayLabels extends Component {
    state = {}   

    dayNames = {
        L: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        M: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        S: ['Mon', 'Tue', "Wed", "Thu", 'Fri'],
        XS: ['M', 'T', "W", "T", "F"]
    }

    renderDayNames = (displayMode) => {
        let dayLabels = []
        for (let day = 0; day < 5; day ++) {
            
            let label = (
                <div className="col p-0" key={day}>
                    {this.dayNames[displayMode][day]}
                </div>
            )
            dayLabels.push(label)
        }
        return dayLabels
    }

    render() { 
        let {dayLabelHeight} = this.props.dimension
        let {displayMode} = this.props

        return ( 
            <div className="" style={{height: dayLabelHeight}}>
                <div className="row text-center h-100 align-items-end p-0 m-0">
                    {this.renderDayNames(displayMode)}
                </div>
            </div>
         );
    }
}
 
export default DayLabels;