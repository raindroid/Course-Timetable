var xhttp = new XMLHttpRequest()
var courseList = []

class Course{
    constructor(doc) {
        let parentThis = this
        this._name = doc.courseName
        this._title = doc.courseTitle
        this._desc = doc.courseDescription

        this._meetings = {}
        doc.meetings.forEach((meeting, index) => {
            // console.log(meeting)
            let type = meeting.meetingType
            if (parentThis._meetings[type]) {
                // add new to original list
                parentThis._meetings[type].push(meeting)
            } else {
                parentThis._meetings[type] = [meeting]
            }
        })
    }

    toHttp() {
        let parentThis = this
        let buttonHtmls = ''
        for (let type in this._meetings){
            let typeButtonsHtml = `<div><span class="mr-2">${type}</span>`
            let typeMeetings = this._meetings[type]
            typeMeetings.forEach((meeting, index)=>{
                var btnHtml = `<button onclick="onMeetingClick('${parentThis._name}', '${meeting.meetingName}')" class="btn btn-outline-info m-1 btn-sm ">${meeting.meetingName}</button>`
                typeButtonsHtml += btnHtml
            })
            buttonHtmls += `${typeButtonsHtml} </div>`
        }

        return `<div>` + 
            `<h3>Course ${this._name} ${this._title ? this._title : ''}</h3>` + 
            `<p>Desc: ${this._desc ? this._desc : 'Not Found'}</p>` + 
            buttonHtmls +
            `<div>`
    }    
}

var onMeetingClick = (courseName, meetingName) => {
    alert(`You have picked ${courseName} ${meetingName}`)
}

var formatCourses = (docs)=>{
    document.getElementById("demo").innerHTML = ''
    docs.forEach((doc, index, array)=>{
        console.log(doc)
        course = new Course(doc)
        courseList.push(course)
        document.getElementById("demo").innerHTML += course.toHttp()
    })
}

/* attach a submit handler to the form */
document.getElementById("courseForm").onsubmit = (function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    xhttp.onreadystatechange = ()=>{ 
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // document.getElementById("demo").innerHTML = xhttp.responseText;
            responseJson = JSON.parse(xhttp.responseText)
            formatCourses(responseJson)
        }
        console.log(xhttp)
    }
    xhttp.open('GET', '/API/courses?code=' + document.getElementById('code').value, true)
    xhttp.send()
    console.log('Get url=./API/courses?code=' + document.getElementById('code').value)
});