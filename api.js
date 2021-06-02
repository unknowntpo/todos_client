document.addEventListener('DOMContentLoaded', function () {
    fetch("http://localhost:4000/v1/tokens/authentication", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'alice@example.com',
                password: 'pa55word'
            })
        })
        .then(
            function (response) {
                response.text()
                    .then(function (text) {
                        //document.getElementById("output").innerHTML = text;
                        // send /v1/tasks with token
                        const respObj = JSON.parse(text);
                        let token = respObj["authentication_token"]["token"];
                        console.log(token);
                        // get actual tasks list with token
                        fetchTasks(token);
                    });
            },
            function (err) {
                document.getElementById("output")
                    .innerHTML = err;
            }
        );
});


function showTasks(tasks) {
    const taskList = document.querySelector(".list")
    for (i = 0; i < tasks.length; i++) {
        console.log(tasks[i]);
        const element = document.createElement("article");
        const taskDetail = document.createElement("ul");
        const taskID = document.createElement("li");
        const content = document.createElement("li");
        const done = document.createElement("li");

        // Set title for element 
        element.textContent = tasks[i]["title"];
        taskID.textContent = "ID: " + tasks[i]["id"];
        content.textContent = "Content: " + tasks[i]["content"];
        done.textContent = "Done: " + tasks[i]["done"];

        // append to newly create task element.
        taskDetail.appendChild(taskID);
        taskDetail.appendChild(content);
        taskDetail.appendChild(done);

        element.appendChild(taskDetail);
        // append to taskList.
        taskList.appendChild(element);
    }
}

function fetchTasks(token) {
    fetch("http://localhost:4000/v1/tasks", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(
            function (response) {
                response.text()
                    .then(function (text) {
                        // document.getElementById("output").innerHTML = text;
                        let tasks = JSON.parse(text)["tasks"];
                        showTasks(tasks);
                    })
            },
            function (err) {
                document.getElementById("output")
                    .innerHTML = err;
            }
        )
}
