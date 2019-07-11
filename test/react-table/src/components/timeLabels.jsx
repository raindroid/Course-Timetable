import React, { Component } from 'react';

class TimeLabels extends Component {
    state = { 
        startHour: 9,   /** hour */
        endHour: 21,    /** hour */
        interval: 30    /** in min */
    }

    tagStyle = {
    }

    createLabels = (dimension, minHeight = 2 /** px per miniutes */) => {
        const {startHour, endHour, interval} = this.state
        // const {tagHeight} = dimension;
        this.tagStyle.height = `${(dimension.minHeight || 2) * interval}px`
        let tagStyle = this.tagStyle

        let labels = []
        for (let hour = startHour; hour < endHour; hour++) {
            for (let min = 0; min < 60; min += interval) {
                let label = (
                    <div className="w-100 mb-time time-text text-right m-0 p-0" style={tagStyle}>
                        {`${hour}:` + `${min}`.padStart(2, '0')}
                    </div>)
                labels.push(label)
            }
        }
        // add the last one
        labels.push((
            <div className="w-100 mb-time time-text text-right" style={tagStyle}>
                {`${endHour}:00`}
            </div>
        ))
        return labels
    }

    render() { 
        let {dayLabelHeight} = this.props.dimension
        let dim = {
            tagHeight: '50px'
        }
        return (
            <div className="p-2" style={{marginTop: dayLabelHeight}}>
                {this.createLabels(dim)}
            </div> 
        );
    }
}
 
export default TimeLabels;