import React, { Component } from 'react';
import TimeLabels from './timeLabels';
import './custom.css'
import DayLabels from './dayLabels';
import TableContent from './tableContent';

class Table extends Component {
    state = { 
        dimension: {
            dayLabelHeight: '40px',
            minHeight: 1.23
        }
    }

    
    render() { 
        let {dimension} = this.state
        let {selectedCourses, selectedMeetings, displayMode, type, filter} = this.props
        return ( 
            <div className="d-flex flex-row m-0" id="time-table">
                <TimeLabels dimension={dimension} ></TimeLabels>
                <div className="mx-auto pt-3 d-flex flex-column justify-content-start flex-grow-1" id='col-mon'>
                    <DayLabels dimension={dimension} displayMode={displayMode}></DayLabels>
                    <TableContent 
                        type={type}
                        filter={filter}
                        dimension={dimension} 
                        displayMode={displayMode}
                        selectedCourses={selectedCourses}
                        selectedMeetings={selectedMeetings}
                        ></TableContent>
                </div>
            </div>
        );
    }
}
 
export default Table;