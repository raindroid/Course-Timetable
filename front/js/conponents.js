globalVar;
import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';

export class ControlPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchInput : '',
            display: 'cart'
        }
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(event) {
        this.setState({searchInput: event.target.value});
    }
    render(){
        let displayInfo = '';
        let courseList = '';
        if (this.state.display == 'cart'){
            displayInfo = 
            <div className = "d-flex flex-column">
                <div className = "cart-title mx-2 mt-3 border-bottom">
                    Selected Courses
                </div>
                <div className = "">
                    {courseList}
                </div>
            </div>;
        }
        else{

        }
        return(
            <div className = "container-card pill shadow d-flex flex-column flex-grow-1 p-4">
                <div className = "d-flex flex-row">
                    <div className="form-label-group mb-0 flex-grow-1">
                        <input type="text" id="courseCode" className="form-control h-auto px-3 pill-left" placeholder="Course code" maxlength="30" name = "courseCode" value = {this.state.searchInput} onChange = {this.handleInput}/>
                        <label for="courseCode" className = "px-3 d-flex"><i className = "fas fa-search my-auto mr-1"/>Course code</label>
                    </div>
                    <div className = "d-flex px-3 pill-right cart-number"><i className = "fas fa-shopping-cart my-auto ml-auto mr-1"/><div className = "my-auto mr-auto">0</div></div>
                </div>
                {displayInfo}
            </div>
        )
    }
}
class CoursePill extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        
        return(
        <div className = "d-flex flex-column">

        </div>);
    }
}