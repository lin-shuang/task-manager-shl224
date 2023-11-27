/*
Updated to fit GitHub Pages
No Node.js, no express, no ajax.
*/

/*
Imported & updated ajax.js
*/
//Route load
$(document).ready(function () {
    loadTasks(); // Call the function directly
});

//Route add
$(function () {
    $('#addButton').click(function () {
        addTask();
        $("#taskForm")[0].reset(); //reset form for next use
    });
});

//Route delete
$(function () {
    $('#delButton').click(function () {
        deleteTasks();
    });
});

function checkTarget(option) {
    if (option == "Waiting" || option == "Talk") {
        $("#targetToggle").show();
    } else {
        $("#targetToggle").hide();
    }
}

// Function to load tasks
function loadTasks() {
    // empty then rebuild table
    $('#targetToggle').hide(); //hide target unless selected needs
    $('#table_body').empty();
    // Call the buildList function directly
    buildList();
}

// Function to add a task
function addTask() {
    let typeIn = "";
    if ($('#target_input').val()) {
        typeIn = $('#type_select').val() + ": " + $('#target_input').val();
    } else {
        typeIn = $('#type_select').val();
    }
    taskList[counter] = new task(counter++, $('#desc_input').val(), typeIn, $('#date_input').val());
    buildList();}

// Function to delete tasks
function deleteTasks() {
    // store indices of check boxes
    var indices = [];
    $("input:checkbox:checked").each(function () {
        indices.push($(this).attr("id"));
    });

    // confirm delete
    let confirmDel = confirm("Really delete??");
    if (confirmDel) {
        //delete specified tasks in the tasksList array
        for(let i = 0; i < indices.length; i++){
            if(i == 0){
            //deletes first item at their index
            taskList.splice(indices[i], 1);
            }
            else if(i > 0){
            //deletes other items at their index, -i because array shortens
            taskList.splice(indices[i]-i, 1);
            }
            counter--;
        }
        buildList();
    }
}

/* 
Imported & updated app.js
Removed dependencies on express and bodyParser
*/
// vars
let rows = "";
let counter = 0;
class task {
    constructor(count, desc, type, date) {
        this.count = count;
        this.desc = desc;
        this.type = type;
        this.date = date;
    }
}
let taskList = [];

// Functions //////////////////////////////////////////////////////////

function buildList() {
    // empty then rebuild list
    rows = "";
    for (let i = 0; i < taskList.length; i++) {
        rows += "<tr>" +
            "<td><input type='checkbox' id='" + i + "'></td>" +
            "<td>" + taskList[i].desc + "</td>" +
            "<td>" + taskList[i].type + "</td>" +
            "<td>" + taskList[i].date + "</td>" +
            "</tr>";
    }
    $('#table_body').empty();
    $('#table_body').append(rows);
}

// Set up initial tasks
taskList.push(new task(counter++, "Example 1 - Import to Portfolio", "Next Action", "2023-11-27"));
taskList.push(new task(counter++, "Example 2", "Talk: Bob", "2019-02-02"));

// Set up initial HTML
buildList();
