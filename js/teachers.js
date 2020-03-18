var teacherMap = new Map();
var cellList = new Map();
var startTime;
var endTime;
var user;
var students;
var teachers;
var userId;
var ready = false;
$(document).ready(function () {
    console.log("ready!");
    user = localStorage.getItem('userName');
    document.getElementById("helloUser").innerHTML = "Hello, Teacher " + user;
    initDataBase();

});

function hideLoading() {
    let loader = document.getElementById("loading");
    let allElements = document.getElementById("allElements");
    if (loader.style.display === "none") {
        loader.style.display = "block";
    } else {
        loader.style.display = "none";
    }
    allElements.style.display = "block";
    ready = true;

}
function writeTheHourToHtmlPage() {
    for (let hour = this.startTime; hour < this.endTime; hour++) {
        document.getElementById("table").innerHTML += "<tr id='" + hour + "00'" + "></th>";
        document.getElementById("table").innerHTML += "<tr id='" + hour + "20'" + "></th>";
        document.getElementById("table").innerHTML += "<tr id='" + hour + "40'" + "></th>";
    }

}
function addTheHoursCol() {
    document.getElementById("teachers").innerHTML += "<th>Time</th>";
    for (let hour = this.startTime; hour < this.endTime; hour++) {
        document.getElementById(hour + "00").innerHTML += "<td>" + hour + "00" + "</td>";
        document.getElementById(hour + "20").innerHTML += "<td>" + hour + "20" + "</td>";
        document.getElementById(hour + "40").innerHTML += "<td>" + hour + "40" + "</td>";
    }
}

function buildTable() {
    $("#allElements").css("width", "100%");
    $("#myTable").css("width", "inherit");
    document.getElementById("teachers").innerHTML += "<th>" + "List" + "</th>";
    for (let hour = this.startTime; hour < this.endTime; hour++) {
        cellList.set(hour + "00", new Cell(this.name, hour + "00"));
        cellList.set(hour + "20", new Cell(this.name, hour + "20"));
        cellList.set(hour + "40", new Cell(this.name, hour + "40"));
    }
}

function initEvnet() {
    let teacherMeeting = teachers[user].list;
    for (var key in teacherMeeting) {
        let time = document.getElementById('-' + teacherMeeting[key].time);
        time.style.backgroundColor = "red";
        time.innerHTML = teacherMeeting[key].name;
        console.log("Teacher: " + time)
        // let cell = cellList.get(time);
        // cell.markCell("green");
    }
}

function initDataBase() {
    var firebaseConfig = {
        apiKey: "AIzaSyAisF9DxbrZJv2yB0TkLjFTephoNWlY9-U",
        authDomain: "scheduleproject-f7ca1.firebaseapp.com",
        databaseURL: "https://scheduleproject-f7ca1.firebaseio.com",
        projectId: "scheduleproject-f7ca1",
        storageBucket: "scheduleproject-f7ca1.appspot.com",
        messagingSenderId: "886389423020",
        appId: "1:886389423020:web:1510d86fa70d38cfe5d809",
        measurementId: "G-40Z048RQ98"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize Firebase
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = user;
        }
        
    });
    var ref = firebase.database().ref("teacher");
    firebase.database().ref().on('value', function(snapshot) {
        if(ready)
        location.reload();
    });
    firebase.database().ref('//').once('value').then(function (snapshot) {
        students = snapshot.val().student;
        startTime = snapshot.val().hour.start;
        endTime = snapshot.val().hour.end;
        teachers = snapshot.val().teacher;
        writeTheHourToHtmlPage();
        addTheHoursCol();
        buildTable();
        initEvnet();
        hideLoading();
    });


}