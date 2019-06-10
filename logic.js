// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB9aEd5C0AzsAjgI5je-bURLzX1dflT7ao",
    authDomain: "bootcamp-test-45f3f.firebaseapp.com",
    databaseURL: "https://bootcamp-test-45f3f.firebaseio.com",
    projectId: "bootcamp-test-45f3f",
    storageBucket: "bootcamp-test-45f3f.appspot.com",
    messagingSenderId: "476593449186",
    appId: "1:476593449186:web:531fc5603d9d69ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name = "";
var destination = "";
var startTime = "";
var frequency = 0;
var timeTill = 0;
var currTime = moment();
var nextTrain = "";

$("#submit-data").on("click", function (event) {

    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    startTime = moment($("#start-time").val().trim(), "HH:mm").subtract(1, "years");
    frequency = $("#frequency").val().trim();
    timeTill = frequency - (currTime.diff(moment(startTime), "minutes") % frequency);
    nextTrain = moment().add(timeTill, "minutes");

    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime.format("HH:mm"),
        frequency: frequency,
    });
});

database.ref().on("child_added", function (snapshot) {

    newRow = $("#table").append($("<tr>"));

    name = snapshot.val().name;
    destination = snapshot.val().destination;
    startTime = moment(snapshot.val().startTime, "HH:mm");
    frequency = snapshot.val().frequency;
    timeTill = frequency - (currTime.diff(moment(startTime), "minutes") % frequency);
    nextTrain = moment().add(timeTill, "minutes");

    newRow.append($("<td>").html(name));
    newRow.append($("<td>").html(destination));
    newRow.append($("<td>").html(nextTrain.format("HH:mm")));
    newRow.append($("<td>").html(frequency));
    newRow.append($("<td>").html(timeTill));

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});