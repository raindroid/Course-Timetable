(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t){var a={searchCache:{}};document.globalVar=a,t.globalVar=a},70:function(e,t,a){e.exports=a(92)},75:function(e,t,a){},76:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},77:function(e,t,a){},78:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(7),i=a.n(s),o=(a(75),a(76),a(77),a(53),a(16)),c=a(17),l=a(19),d=a(18),u=a(20),f=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(s)))).state={startHour:9,endHour:21,interval:60},a.tagStyle={},a.createLabels=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=a.state,s=n.startHour,i=n.endHour,o=n.interval,c={height:"".concat((t||2)*o,"px")},l=[],d=s;d<i;d++)for(var u=0;u<60;u+=o){var f=r.a.createElement("div",{className:"w-100 mb-time time-text text-right m-0 p-0",style:c,key:d+""+u},"".concat(d,":")+"".concat(u).padStart(2,"0"));l.push(f)}return l.push(r.a.createElement("div",{className:"w-100 mb-time time-text text-right",style:c,key:"lastOne"},"".concat(i,":00"))),l},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.dimension,t=e.dayLabelHeight,a=e.minHeight;return r.a.createElement("div",{className:"p-2",style:{marginTop:t}},this.createLabels({tagHeight:"50px"},a))}}]),t}(n.Component),m=(a(78),function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(s)))).state={},a.dayNames={L:["Monday","Tuesday","Wednesday","Thursday","Friday"],M:["Monday","Tuesday","Wednesday","Thursday","Friday"],S:["Mon","Tue","Wed","Thu","Fri"],XS:["M","T","W","T","F"]},a.renderDayNames=function(e){for(var t=[],n=0;n<5;n++){var s=r.a.createElement("div",{className:"col p-0",key:n},a.dayNames[e][n]);t.push(s)}return t},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.dimension.dayLabelHeight,t=this.props.displayMode;return r.a.createElement("div",{className:"",style:{height:e}},r.a.createElement("div",{className:"row text-center h-100 align-items-end p-0 m-0"},this.renderDayNames(t)))}}]),t}(n.Component)),p=a(28),h=a.n(p),g={red:{50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",a100:"#ff8a80",a200:"#ff5252",a400:"#ff1744",a700:"#d50000"},pink:{50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",a100:"#ff80ab",a200:"#ff4081",a400:"#f50057",a700:"#c51162"},purple:{50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",a100:"#ea80fc",a200:"#e040fb",a400:"#d500f9",a700:"#aa00ff"},deeppurple:{50:"#ede7f6",100:"#d1c4e9",200:"#b39ddb",300:"#9575cd",400:"#7e57c2",500:"#673ab7",600:"#5e35b1",700:"#512da8",800:"#4527a0",900:"#311b92",a100:"#b388ff",a200:"#7c4dff",a400:"#651fff",a700:"#6200ea"},indigo:{50:"#e8eaf6",100:"#c5cae9",200:"#9fa8da",300:"#7986cb",400:"#5c6bc0",500:"#3949ab",600:"#3949ab",700:"#303f9f",800:"#283593",900:"#1a237e",a100:"#8c9eff",a200:"#536dfe",a400:"#3d5afe",a700:"#304ffe"},blue:{50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",a100:"#82b1ff",a200:"#448aff",a400:"#2979ff",a700:"#2962ff"},lightblue:{50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",a100:"#80d8ff",a200:"#40c4ff",a400:"#00b0ff",a700:"#0091ea"},cyan:{50:"#e0f7fa",100:"#b2ebf2",200:"#80deea",300:"#4dd0e1",400:"#26c6da",500:"#00bcd4",600:"#00acc1",700:"#0097a7",800:"#00838f",900:"#006064",a100:"#84ffff",a200:"#18ffff",a400:"#00e5ff",a700:"#00b8d4"},teal:{50:"#e0f2f1",100:"#b2dfdb",200:"#80cbc4",300:"#4db6ac",400:"#26a69a",500:"#009688",600:"#00897b",700:"#00796b",800:"#00695c",900:"#004d40",a100:"#a7ffeb",a200:"#64ffda",a400:"#1de9b6",a700:"#00bfa5"},green:{50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",a100:"#b9f6ca",a200:"#69f0ae",a400:"#00e676",a700:"#00c853"},lightgreen:{50:"#f1f8e9",100:"#dcedc8",200:"#c5e1a5",300:"#aed581",400:"#9ccc65",500:"#8bc34a",600:"#7cb342",700:"#689f38",800:"#558b2f",900:"#33691e",a100:"#ccff90",a200:"#b2ff59",a400:"#76ff03",a700:"#64dd17"},lime:{50:"#f9fbe7",100:"#f0f4c3",200:"#e6ee9c",300:"#dce775",400:"#d4e157",500:"#cddc39",600:"#c0ca33",700:"#afb42b",800:"#9e9d24",900:"#827717",a100:"#f4ff81",a200:"#eeff41",a400:"#c6ff00",a700:"#aeea00"},yellow:{50:"#fffde7",100:"#fff9c4",200:"#fff59d",300:"#fff176",400:"#ffee58",500:"#ffeb3b",600:"#fdd835",700:"#fbc02d",800:"#f9a825",900:"#f57f17",a100:"#ffff8d",a200:"#ffff00",a400:"#ffea00",a700:"#ffd600"},amber:{50:"#fff8e1",100:"#ffecb3",200:"#ffe082",300:"#ffd54f",400:"#ffca28",500:"#ffc107",600:"#ffb300",700:"#ffa000",800:"#ff8f00",900:"#ff6f00",a100:"#ffe57f",a200:"#ffd740",a400:"#ffc400",a700:"#ffab00"},orange:{50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",a100:"#ffd180",a200:"#ffab40",a400:"#ff9100",a700:"#ff6d00"},deeporange:{50:"#fbe9e7",100:"#ffccbc",200:"#ffab91",300:"#ff8a65",400:"#ff7043",500:"#ff5722",600:"#f4511e",700:"#e64a19",800:"#d84315",900:"#bf360c",a100:"#ff9e80",a200:"#ff6e40",a400:"#ff3d00",a700:"#dd2c00"},brown:{50:"#efebe9",100:"#d7ccc8",200:"#bcaaa4",300:"#a1887f",400:"#8d6e63",500:"#795548",600:"#6d4c41",700:"#5d4037",800:"#4e342e",900:"#3e2723"},bluegrey:{50:"#eceff1",100:"#cfd8dc",200:"#b0bec5",300:"#90a4ae",400:"#78909c",500:"#607d8b",600:"#546e7a",700:"#455a64",800:"#37474f",900:"#263238"}};function b(e,t){if(parseInt(e)!==e)return g[e][""+t];var a=parseInt(e);for(var n in g)if(!a--)return g[n][""+t]}var v=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(s)))).state={popupMeeting:void 0},a.preState={preMeeting:void 0},a.fakeMeetingLists=[[{_id:h()(),courseCode:"ECE302",courseName:"probability",meetingCode:"",meetingType:"LEC",meetingStart:"10:00",meetingEnd:"11:00",meetingLocation:"GB244"},{_id:h()(),courseCode:"ECE302",courseName:"probability",meetingCode:"",meetingType:"TUT",meetingStart:"13:00",meetingEnd:"15:00",meetingLocation:"GB243"}],[],[],[{_id:h()(),courseCode:"ECE302",courseName:"probability",meetingType:"LEC",meetingStart:"12:00",meetingEnd:"13:00",meetingLocation:"GB244"},{_id:h()(),courseCode:"ECE302",courseName:"probability",meetingType:"TUT",meetingStart:"13:00",meetingEnd:"14:00",meetingLocation:"GB243"}],[]],a.meetings=[],a.updateMeetings=function(){a.meetings=[];var e=0,t=a.props,n=t.selectedMeetings,r=t.selectedCourses;n.forEach(function(t){var n=t.courseCode,s=t.meetingCode,i=t.meetingType,o=r.find(function(e){return e.courseName===n}),c=o.meetings[i].find(function(e){return e.meetingName===s}).detail,l={courseCode:n,courseName:o.courseTitle,courseType:o.courseType,meetingCode:s,meetingType:i,colors:o.colors};a.props.filter.find(function(e){return e===o.courseType})&&c.forEach(function(t){l._id="".concat(e++),l.meetingStart=t.meetingStartTime,l.meetingEnd=t.meetingEndTime,l.meetingLocation=t.meetingLocation||t.assignedRoom1,l.day=t.meetingDay;var n=a.meetings.find(function(e){return e.meetingStart===l.meetingStart&&e.meetingEnd===l.meetingEnd&&e.day==l.day&&e.courseCode===l.courseCode&&e.meetingCode===l.meetingCode});n?n.meetingLocation+=" / "+l.meetingLocation:a.meetings.push(Object.assign({},l))})})},a.helpers={minToString:function(e){e=parseInt(e);var t=parseInt(e/60);return e%=60,(t<10?"0".concat(t):"".concat(t))+":"+(e<10?"0".concat(e):"".concat(e))},stringToMin:function(e){return e.split(":").map(function(e){return parseInt(e)}).reduce(function(e,t){return 60*e+t})}},a.getMeetingList=function(e){var t=a.meetings.filter(function(t){return t.day===e});return t.sort(function(e,t){return e.meetingStart<t.meetingStart?-1:1}),t||[]},a.clickTest=function(e){var t=a.state;t.popupMeeting=e._id===t.popupMeeting?void 0:e._id,a.setState(t)},a.generateCourseTags=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:9,i=[],o=60*s,c=o,l=a.props.displayMode,d=0,u=[];return e.forEach(function(e){var n=e.meetingStart.split(":").map(function(e){return parseInt(e)}).reduce(function(e,t){return 60*e+t}),f=e.meetingEnd.split(":").map(function(e){return parseInt(e)}).reduce(function(e,t){return 60*e+t});if(c<n){var m="".concat(t*(n-c),"px"),p={position:"absolute",height:m,left:0,right:0,top:"".concat(t*(c-o),"px")},h=r.a.createElement("div",{className:"p-0 m-0",style:p,key:d++},r.a.createElement("div",{className:"h-100",style:{textAlign:"center",lineHeight:m}},c==60*s||"L"!==l&&"M"!==l?"":"".concat((n-c)/60," hour(s) gap"),c!=60*s&&"S"===l?"".concat((n-c)/60," h gap"):""));i.push(h)}var g=t*(f-n),b={height:"".concat(g,"px"),position:"absolute",left:0,right:0,top:"".concat(t*(n-o),"px")},v={},y={},x=e._id===a.state.popupMeeting;x?(v={position:"absolute",left:"0px",right:"0px",top:"0px",height:"".concat(t*(f-n)+120,"px"),zIndex:5},y={minHeight:"".concat(t*(f-n)-5,"px"),background:e.colors.dark,color:"white"},a.preState.preMeeting=e._id):(v={position:"absolute",left:"0px",top:"0px",right:"0px",paddingLeft:"2px",paddingRight:"2px",height:"".concat(t*(f-n),"px"),zIndex:0},y={minHeight:"".concat(t*(f-n)-5,"px"),background:"".concat(e.colors.medium),color:"black"});var E={background:a.props.typeColors[e.meetingType]},C=r.a.createElement("div",{className:"p-1 ",style:b,onClick:function(){return a.clickTest(e)},key:d++},r.a.createElement("div",{className:"time-block-container",style:v},r.a.createElement("div",{className:"time-block w-100",style:y},r.a.createElement("p",{className:"m-0"},"M"===l||"L"===l?e.courseCode:e.courseCode.substr(0,6)),r.a.createElement("p",{className:"badge badge-pill badge-info m-0",style:E},e.meetingType),r.a.createElement("p",null,x||g>50?r.a.createElement("span",null,e.meetingCode.substr(3),r.a.createElement("br",null)):"",x||g>100&&"L"==l?r.a.createElement("span",null,e.meetingStart," - ",e.meetingEnd,r.a.createElement("br",null)):"",x?r.a.createElement("span",null,e.meetingLocation):""))));i.push(C),c>n&&u.push({startTime:n,endTime:c>f?f:c}),c=c<f?f:c}),u.length>0&&(u=u.map(function(e){return 24*e.startTime*60+e.endTime}).filter(function(e,t,a){return a.indexOf(e)===t}).map(function(e){return{startTime:parseInt(e/24/60),endTime:e%1440}})).forEach(function(s){var c=s.startTime,u=s.endTime;s._id="".concat(n,"-").concat(c,"-").concat(u),s.meetingInfo=[],e.filter(function(e){return a.helpers.stringToMin(e.meetingStart)<=c&&a.helpers.stringToMin(e.meetingEnd)>=u}).map(function(e){s.meetingInfo.push({name:"".concat("L"==l?e.courseCode:e.courseCode.substr(0,6),"-").concat(e.meetingCode),type:e.meetingType})});var f=t*(u-c),m={height:"".concat(f,"px"),position:"absolute",left:0,right:0,top:"".concat(t*(c-o),"px")},p={},h={},g=s._id===a.state.popupMeeting;g?(p={position:"absolute",left:"0px",right:"0px",Height:"".concat(t*(u-c)+120,"px"),zIndex:4},h={background:"#EF5350",minHeight:"".concat(t*(u-c),"px"),color:"white",height:"90%"},a.preState.preMeeting=s._id):(p={position:"absolute",left:"0px",right:"0px",height:"".concat(t*(u-c),"px"),zIndex:3},h={background:"#FF7043",minHeight:"".concat(t*(u-c),"px"),color:"white",height:"90%"});var b=[];s.meetingInfo.forEach(function(e){b.push(r.a.createElement("span",{key:e.name},e.name,r.a.createElement("br",null)))});var v=r.a.createElement("div",{className:"p-0",style:m,onClick:function(){return a.clickTest(s)},key:d++},r.a.createElement("div",{style:p},r.a.createElement("div",{className:"time-block w-100",style:h},r.a.createElement("p",{className:"m-0"},"CONCLICT"),r.a.createElement("p",null,g||f>50&&"L"==l?r.a.createElement("span",null,a.helpers.minToString(s.startTime)," - ",a.helpers.minToString(s.endTime),r.a.createElement("br",null)):"",g?b:""))));i.push(v)}),i},a.renderClassLists=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,s=[];a.updateMeetings();for(var i=t;i<=n;i++){var o=r.a.createElement("div",{className:"col pl-0 pr-0",key:i},a.generateCourseTags(a.getMeetingList(i),e,i));s.push(o)}return s},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.dimension.minHeight;return r.a.createElement("div",{className:"border w-100 h-100 p-0 m-0"},r.a.createElement("div",{className:"row text-center w-100 m-0 p-0"},this.renderClassLists(e)))}}]),t}(n.Component),y=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={dimension:{dayLabelHeight:"40px",minHeight:1.23}},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state.dimension,t=this.props,a=t.selectedCourses,n=t.selectedMeetings,s=t.displayMode,i=t.type,o=t.filter,c=t.typeColors;return r.a.createElement("div",{className:"d-flex flex-row m-0",id:"time-table"},r.a.createElement(f,{dimension:e}),r.a.createElement("div",{className:"mx-auto pt-3 d-flex flex-column justify-content-start flex-grow-1",id:"col-mon"},r.a.createElement(m,{dimension:e,displayMode:s}),r.a.createElement(v,{type:i,filter:o,dimension:e,typeColors:c,displayMode:s,selectedCourses:a,selectedMeetings:n})))}}]),t}(n.Component),x=a(22),E=a.n(x),C=a(29),M=a(9),k=a(26),w=a.n(k),N=a(33),O=a(135),T=a(125),j=a(127),S=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={searchInput:"",display:"cart",searchList:[]},a.handleInput=a.handleInput.bind(Object(M.a)(a)),a.fetchSearchResult=a.fetchSearchResult.bind(Object(M.a)(a)),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"handleInput",value:function(e){this.setState({searchInput:e.target.value}),""==e.target.value?this.setState({display:"cart"}):(this.setState({display:"loading"}),this.fetchSearchResult(e.target.value))}},{key:"fetchSearchResult",value:function(){var e=Object(C.a)(E.a.mark(function e(t){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!N.globalVar.searchCache[t]){e.next=4;break}this.setState({display:"search"}),e.next=7;break;case 4:return e.next=6,fetch(this.props.host+"/API/courses?limit=10&code=".concat(t,"&detail=1&limit=10"),{mode:"cors"}).then(function(e){return e.json()}).then(function(e){N.globalVar.searchCache[t]=e}).catch(function(e){console.error("Error",e)});case 6:this.state.searchInput==t&&"loading"==this.state.display&&this.setState({display:"search"});case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t="",a=[];switch(this.state.display){case"cart":var n=!0,s=!1,i=void 0;try{for(var o,c=this.props.selectedCourses[Symbol.iterator]();!(n=(o=c.next()).done);n=!0){var l=o.value;a.push(r.a.createElement(L,{position:"cart",courseCode:l.courseName,key:l.courseName+" pill",courseObj:l,removeCourse:this.props.removeCourse,detail:l,addMeeting:this.props.addMeeting,removeMeeting:this.props.removeMeeting,selectedMeetings:this.props.selectedMeetings}))}}catch(g){s=!0,i=g}finally{try{n||null==c.return||c.return()}finally{if(s)throw i}}t=r.a.createElement("div",{className:"d-flex flex-column"},r.a.createElement("div",{className:"cart-title mx-2 mb-3 border-bottom "},"Selected Courses"),r.a.createElement("div",{className:""},0!=a.length?a:r.a.createElement("div",{className:"font-italic mb-3 text-center text-secondary"},"No selected courses"),r.a.createElement("hr",null)));break;case"search":var d=!0,u=!1,f=void 0;try{for(var m,p=N.globalVar.searchCache[this.state.searchInput][Symbol.iterator]();!(d=(m=p.next()).done);d=!0){var h=m.value;a.push(r.a.createElement(L,{position:"search",courseCode:h.courseName,key:h.courseName+"-searchPill",selectedCourses:this.props.selectedCourses,courseObj:h,addCourse:this.props.addCourse,detail:h}))}}catch(g){u=!0,f=g}finally{try{d||null==p.return||p.return()}finally{if(u)throw f}}t=r.a.createElement("div",{className:"d-flex flex-column"},r.a.createElement("div",{className:""},0!=a.length?a:r.a.createElement("div",{className:"font-italic mb-3 text-center text-secondary"},"No result")));break;case"detail":break;case"loading":t=r.a.createElement("div",{className:"d-flex flex-column"},r.a.createElement("div",{className:"d-flex flex-column theme-neutral-text"},r.a.createElement("i",{className:"fas fa-spinner mx-auto loading-logo mb-3 ani-spin"}),r.a.createElement("div",{className:"d-flex mx-auto"},"Searching...")))}return r.a.createElement("div",{className:"container-card  shadow d-flex flex-column flex-grow-1 p-4"},r.a.createElement("div",{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"form-label-group mb-0 flex-grow-1"},r.a.createElement("input",{type:"text",id:"courseCode",className:"form-control h-auto px-3 pill-left",placeholder:"Course code",name:"courseCode",value:this.state.searchInput,onChange:this.handleInput,onClick:this.handleInput}),r.a.createElement("label",{htmlFor:"courseCode",className:"px-3 d-flex"},r.a.createElement("i",{className:"fas fa-search my-auto mr-1"}),"Course code")),r.a.createElement("div",{className:"d-flex px-3 pill-right cart-number theme-primary-action",onClick:function(){e.setState({display:"cart"})}},r.a.createElement("i",{className:"fas fa-shopping-cart my-auto ml-auto mr-1"}),r.a.createElement("div",{className:"my-auto mr-auto"},this.props.selectedCourses.length))),t)}}]),t}(r.a.Component),L=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).generateMeetings=a.generateMeetings.bind(Object(M.a)(a)),a.state={expanded:!1},a.switchExpansion=a.switchExpansion.bind(Object(M.a)(a)),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"generateMeetings",value:function(e){var t=this,a=[],n=this.props.selectedMeetings,s=function(s){var i=e.meetings[s],o=[];i.forEach(function(a,i){if(n.find(function(t){return t.courseCode===e.courseName&&t.meetingCode===a.meetingName})){var c=r.a.createElement("button",{onClick:function(){return t.props.removeMeeting(e.courseName,a.meetingName)},className:"btn btn-info m-1 btn-sm",key:i},a.meetingName);o.push(c)}else{var l=r.a.createElement("button",{onClick:function(){return t.props.addMeeting(e.courseName,a.meetingName,s)},className:"btn btn-outline-info m-1 btn-sm",key:i},a.meetingName);o.push(l)}}),a.push(r.a.createElement("div",{key:h()()},r.a.createElement("span",{className:"mr-2"}),o," "))};for(var i in e.meetings)s(i);return a}},{key:"switchExpansion",value:function(){var e=this.state.expanded;e=!e,this.setState({expanded:e})}},{key:"render",value:function(){var e=this;if("cart"==this.props.position){var t=this.props.detail;return r.a.createElement(O.a,{onChange:this.switchExpansion,className:"card",style:{margin:"0",marginBottom:"10px",padding:"0",borderRadius:"2rem",boxShadow:"none",border:"none"}},r.a.createElement(T.a,{"aria-controls":"panel1a-content",id:"panel1a-header",style:{padding:"0",margin:"0"}},r.a.createElement("div",{className:"d-flex flex-row m-0 course-pill w-100 p-0"},r.a.createElement("div",{className:"d-flex pill-left theme-neutral flex-grow-1 course-pill-code px-3 text-left h-100"},r.a.createElement("div",{className:"m-auto"},this.props.courseCode)),r.a.createElement("div",{className:"d-flex pill-right theme-danger-action pl-2 pr-3 h-100",onClick:function(){e.props.removeCourse(e.props.courseCode)}},r.a.createElement("i",{className:"fas fa-trash-alt m-auto"})))),r.a.createElement(j.a,{style:{boxShadow:"0 1px 15px rgba(0, 0, 0, 0.089), 0 8px 12px rgba(0, 0, 0, 0.041)"}},r.a.createElement("div",{className:"h-100"},r.a.createElement("h3",null,t.courseTitle||"<Unknown>"),this.generateMeetings(t),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.courseDescription||"Not Found"}}))))}var a=r.a.createElement("div",{className:"d-flex pill-right theme-primary-action pl-2 pr-3 h-100",onClick:function(){e.props.addCourse(e.props.courseObj)}},r.a.createElement("i",{className:"fas fa-cart-plus m-auto"})),n=!0,s=!1,i=void 0;try{for(var o,c=this.props.selectedCourses[Symbol.iterator]();!(n=(o=c.next()).done);n=!0){if(o.value.courseName==this.props.courseCode){a=r.a.createElement("div",{className:"d-flex pill-right theme-success pl-2 pr-3 h-100"},r.a.createElement("i",{className:"fas fa-cart-arrow-down m-auto"}));break}}}catch(l){s=!0,i=l}finally{try{n||null==c.return||c.return()}finally{if(s)throw i}}return r.a.createElement("div",{className:"d-flex flex-row mb-3 course-pill"},r.a.createElement("div",{className:"d-flex pill-left theme-neutral flex-grow-1 course-pill-code px-3 text-left h-100"},r.a.createElement("div",{className:"m-auto"},this.props.courseCode)),a)}}]),t}(r.a.Component);var I=a(65),R=a(128),H=a(129),F=a(95),W=a(130),B=a(64),_=a.n(B),D=a(134),z=a(131),A=a(132),G=a(133),P=new I.a;document.cookies=P;r.a.Component;var U=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).handleDrawerOpen=function(){a.setState({drawerOpen:!0})},a.handleDrawerClose=function(){a.setState({drawerOpen:!1})},a.state={selectedCourses:[],selectedMeetings:[],timetableRange:"Fall",highlightCourse:"",host:"http://yucanwu.com:3000",displayMode:"L",drawerOpen:!1,typeColors:{LEC:b("lightblue",600),TUT:b("amber",600),PRA:b("pink",600)}},a.colorList=[],a.addCourse=a.addCourse.bind(Object(M.a)(a)),a.removeCourse=a.removeCourse.bind(Object(M.a)(a)),a.addMeeting=a.addMeeting.bind(Object(M.a)(a)),a.removeMeeting=a.removeMeeting.bind(Object(M.a)(a)),a.randomColorIndex=a.randomColorIndex.bind(Object(M.a)(a)),a.changeTimetableRange=a.changeTimetableRange.bind(Object(M.a)(a)),a.cookiesPrepared=!1,a.updateCookies=a.updateCookies.bind(Object(M.a)(a)),a.restoreCourses=a.restoreCourses.bind(Object(M.a)(a)),a.resotreMeetings=a.resotreMeetings.bind(Object(M.a)(a)),a.handleResize=a.handleResize.bind(Object(M.a)(a)),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResize)}},{key:"handleResize",value:function(){var e=this.state;window.innerWidth<300?e.displayMode="XS":window.innerWidth<500?e.displayMode="S":window.innerWidth<900?e.displayMode="M":e.displayMode="L",this.setState(e)}},{key:"componentDidMount",value:function(){var e=Object(C.a)(E.a.mark(function e(){var t,a,n=this;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.handleResize(),window.addEventListener("resize",this.handleResize),t=P.get("updateTime"),a=this.state.host+"/api/couses/updatetime",this.cookiesPrepared){e.next=7;break}return e.next=7,fetch(a,{mode:"cors"}).then(function(e){return e.json()}).then(function(){var e=Object(C.a)(E.a.mark(function e(a){var r,s,i;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=a.time,t==r){e.next=7;break}P.set("updateTime",r),P.set("courses",[]),P.set("meetings",[]),e.next=12;break;case 7:return s=P.get("courses")||[],i=P.get("meetings")||[],e.next=11,n.restoreCourses(s);case 11:n.resotreMeetings(i);case 12:n.cookiesPrepared=!0;case 13:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){console.error("Error",e)});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"resotreMeetings",value:function(e){for(var t in e){var a=e[t];this.addMeeting(a.courseCode,a.meetingCode,a.meetingType)}}},{key:"restoreCourses",value:function(){var e=Object(C.a)(E.a.mark(function e(t){var a,n,r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=E.a.keys(t);case 1:if((e.t1=e.t0()).done){e.next=10;break}return a=e.t1.value,n=t[a],e.next=6,this.loadDetail(n);case 6:r=e.sent,this.addCourse(r),e.next=1;break;case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"updateCookies",value:function(){this.cookiesPrepared&&(P.set("courses",this.state.selectedCourses.map(function(e){return e.courseName})),P.set("meetings",this.state.selectedMeetings))}},{key:"componentDidUpdate",value:function(){document.selectedCourses=this.state.selectedCourses,document.selectedMeetings=this.state.selectedMeetings,this.updateCookies()}},{key:"changeTimetableRange",value:function(e){var t=e;this.setState({timetableRange:t})}},{key:"loadDetail",value:function(){var e=Object(C.a)(E.a.mark(function e(t){var a,n;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.state.host+"/API/courses?limit=1&code=".concat(t,"&detail=1"),n={},e.next=4,fetch(a,{mode:"cors"}).then(function(e){return e.json()}).then(function(e){document.newCourse=e[0],n=e[0]}).catch(function(e){console.error("Error",e)});case 4:return e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"addMeeting",value:function(e,t,a){var n=this.state.selectedMeetings;n.push({courseCode:e,meetingCode:t,meetingType:a}),this.setState({selectedMeetings:n})}},{key:"removeMeeting",value:function(e,t){var a=this.state.selectedMeetings;a=a.filter(function(a){return a.courseCode!==e||a.meetingCode!==t}),this.setState({selectedMeetings:a})}},{key:"randomColorIndex",value:function(){for(var e=Object.keys(g).length,t=Math.floor(Math.random()*e);this.colorList.length<e&&this.colorList.find(function(e){return e==t});)t=Math.floor(Math.random()*e);return this.colorList.push(t),t}},{key:"addCourse",value:function(e){var t=this.randomColorIndex();e.colors={light:b(t,50),medium:b(t,100),normal:b(t,300),dark:b(t,800)};var a=this.state.selectedCourses;a.push(e),this.setState({selectedCourses:a})}},{key:"removeCourse",value:function(e){for(var t=this.state.selectedCourses,a=0;a<t.length;a++)if(t[a].courseName==e){t.splice(a,1);break}var n=this.state.selectedMeetings;n=n.filter(function(t){return t.courseCode!==e}),this.setState({selectedCourses:t}),this.setState({selectedMeetings:n})}},{key:"render",value:function(){var e=this,t="d-flex px-3 ml-auto pill-left pill "+("Fall"===this.state.timetableRange?"selected":"unselected"),a="d-flex px-3 pill-middle pill "+("Both"===this.state.timetableRange?"selected":"unselected"),n="d-flex px-3 pill-right pill "+("Winter"===this.state.timetableRange?"selected":"unselected"),s=this.state.displayMode,i="d-flex flex-grow-1 open-san "+("Lp"===s?"flex-row":"flex-column"),o={root:{display:"flex",flexGrow:1},appBar:{},iconMenu:{display:this.state.drawerOpen?"none":"",marginRight:"8px"},drawer:{flexShrink:0},title:{flexGrow:1},btnGroup:{boxShadow:"none"}};return r.a.createElement("div",{className:"d-flex flex-column h-100"},r.a.createElement("div",{className:i},function(){var i=r.a.createElement("span",null),c=r.a.createElement("span",null),l=r.a.createElement("i",{className:"fas fa-calendar-alt"});return"L"!=s&&(c=r.a.createElement(F.a,{edge:"start",color:"inherit","aria-label":"Open drawer",onClick:e.handleDrawerOpen,style:o.iconMenu},r.a.createElement(_.a,null)),i=r.a.createElement(D.a,{anchor:"left",open:e.state.drawerOpen,onClose:e.handleDrawerClose,onOpen:e.handleDrawerOpen},r.a.createElement("div",{style:o.drawer},r.a.createElement("div",{className:"d-flex flex-column p-0 info-section",style:{width:"20rem"}},r.a.createElement(S,{selectedCourses:e.state.selectedCourses,addCourse:e.addCourse,removeCourse:e.removeCourse,addMeeting:e.addMeeting,removeMeeting:e.removeMeeting,selectedMeetings:e.state.selectedMeetings,host:e.state.host,displayMode:e.state.displayMode}))))),"S"===s&&(l=r.a.createElement("span",null)),r.a.createElement("div",{style:o.root},r.a.createElement(R.a,{style:o.appBar,position:"fixed"},r.a.createElement(H.a,null,c,r.a.createElement(W.a,{variant:"h6",style:o.title},l," \xa0 Timetable"),r.a.createElement(z.a,{item:!0},r.a.createElement(A.a,{style:o.btnGroup,variant:"contained",color:"primary","aria-label":"Full-width contained primary button group"},r.a.createElement(G.a,{className:t,onClick:function(){return e.changeTimetableRange("Fall")}},"Fall"),r.a.createElement(G.a,{className:a,onClick:function(){return e.changeTimetableRange("Both")}},"Both"),r.a.createElement(G.a,{className:n,onClick:function(){return e.changeTimetableRange("Winter")}},"Winter"))))),i,r.a.createElement("hr",{style:{}}))}(),function(){var t=r.a.createElement("div",null);"L"==s&&(t=r.a.createElement("div",{className:"d-flex flex-column p-0 info-section",style:{width:"20rem"}},r.a.createElement("hr",{style:{height:"30px"}}),r.a.createElement(S,{selectedCourses:e.state.selectedCourses,addCourse:e.addCourse,removeCourse:e.removeCourse,addMeeting:e.addMeeting,removeMeeting:e.removeMeeting,selectedMeetings:e.state.selectedMeetings,host:e.state.host,displayMode:e.state.displayMode})));var a=[];return"Fall"!==e.state.timetableRange&&"Both"!==e.state.timetableRange||a.push(r.a.createElement(y,{typeColors:e.state.typeColors,key:"fallTable",type:"Fall",filter:["F","Y"],selectedCourses:e.state.selectedCourses,selectedMeetings:e.state.selectedMeetings,displayMode:e.state.displayMode})),"Winter"!==e.state.timetableRange&&"Both"!==e.state.timetableRange||a.push(r.a.createElement(y,{typeColors:e.state.typeColors,key:"winterTable",type:"Winter",filter:["S","Y"],selectedCourses:e.state.selectedCourses,selectedMeetings:e.state.selectedMeetings,displayMode:e.state.displayMode})),r.a.createElement("div",null,r.a.createElement("div",{className:"d-flex flex-row"},t,r.a.createElement("div",{className:"d-flex flex-column flex-grow-1 p-1 pt-4 ",style:{}},a)))}()))}}]),t}(r.a.Component);var V=function(){return r.a.createElement(U,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[70,1,2]]]);
//# sourceMappingURL=main.b4704822.chunk.js.map