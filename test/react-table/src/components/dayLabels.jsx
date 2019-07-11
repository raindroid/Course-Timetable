import React, { Component } from 'react';

class DayLabels extends Component {
    state = {  }
    render() { 

        let {dayLabelHeight} = this.props.dimension
        return ( 
            <div className="" style={{height: dayLabelHeight}}>
                <div className="row text-center h-100 align-items-end p-0 m-0">
                    <div className="col-sm p-0">
                        Monday
                    </div>
                    <div className="col-sm p-0">
                        Tuesday
                    </div>
                    <div className="col-sm p-0">
                        Wednesday
                    </div>
                    <div className="col-sm p-0">
                        Thursday
                    </div>
                    <div className="col-sm p-0">
                        Friday
                    </div>
                </div>
            </div>
         );
    }
}
 
export default DayLabels;