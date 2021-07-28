let url = "http://localhost:8080";
let stompClient;
let gameId;
let playerType;

function connectToSocket(gameId) {
    console.log("connecting to the game");
    let socket = new SockJS(url+"/gameplay");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
        console.log("connected to the frame: " + frame);
        stompClient.subscribe("/topic/game-progress/" + gameId, (response) => {
            let data = JSON.parse(response.body);
            console.log(data);
            displayResponse(data);
        });
    })
}

function createGame() {
    let login = document.getElementById("login").value;
    if(login === null || login === "") {
        alert("Please enter login");
    } else {
        $.ajax({
            url: url + "/api/game/start",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "login": login
            }),
            success: function (data) {
                gameId = data.gameId;
                playerType = 'X';
                reset();
                connectToSocket(gameId);
                alert("Your Game is Connected. Your Game ID is: " + data.gameId);
                gameOn =  true;
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}

function connectToRandom() {
    let login = document.getElementById("login").value;
    if(login === null || login === "") {
        alert("Please enter login");
    } else {
        $.ajax({
            url: url + "/api/game/connect/random",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "login": login
            }),
            success: (data) => {
                gameId = data.gameId;
                playerType = 'O';
                reset();
                connectToSocket(gameId);
                alert("Congrats You are playing with " + data.player1.login);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}

function conectToSpecificGame() {
    let login = document.getElementById("login").value;
    if(login === null || login === "") {
        alert("Please enter login");
    } else {
        let game_id = document.getElementById("game_id").value;
        if(game_id===null || game_id==='') {
            alert("Please enter gameId");
        }
        $.ajax({
            url: url + "/api/game/connect",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "player": {
                    "login": login
                },
                "gameId": game_id
            }),
            success: (data) => {
                gameId = data.gameId;
                playerType = 'O';
                reset();
                connectToSocket(gameId);
                alert("Congrats You are playing with " + data.player1.login);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}