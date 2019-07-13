import React, { Component } from 'react';
import TimeLabels from './timeLabels';
import './custom.css'
import DayLabels from './dayLabels';
import TableContent from './tableContent';

class Table extends Component {
    state = { 
        dimension: {
            dayLabelHeight: '40px',
            minHeight: 1
        },
        displayMode: 'L'
    }

    handleResize = () => {
        let currentState = this.state
        if (window.innerWidth < 300) {
            currentState.displayMode = 'S'
        } else if (window.innerWidth < 550 ) {
            currentState.displayMode = 'M'            
        } else {
            currentState.displayMode = 'L'            
        }
        this.setState(currentState)
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    render() { 
        let {dimension, displayMode} = this.state
        return ( 
            <div className="d-flex flex-row m-0">
                <TimeLabels dimension={dimension} ></TimeLabels>
                <div className="mx-auto pt-3 d-flex flex-column justify-content-start flex-grow-1" id='col-mon'>
                    <DayLabels dimension={dimension} displayMode={displayMode}></DayLabels>
                    <TableContent dimension={dimension} displayMode={displayMode}></TableContent>
                </div>
            </div>
        );
    }
}
 
export default Table;