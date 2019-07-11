import React, { Component } from 'react';
import TimeLabels from './timeLabels';
import './costum.css'
import DayLabels from './dayLabels';
import TableContent from './tableContent';

class Table extends Component {
    state = { 
        dimension: {
            dayLabelHeight: '40px'
        }
    }
    render() { 
        let {dimension} = this.state
        return ( 
            <div className="border d-flex flex-row m-5">
                <TimeLabels dimension={dimension}></TimeLabels>
                <div class = "mx-auto pt-3 d-flex flex-column justify-content-start flex-grow-1" id='col-mon'>
                    <DayLabels dimension={dimension}></DayLabels>
                    <TableContent></TableContent>
                </div>
            </div>
        );
    }
}
 
export default Table;