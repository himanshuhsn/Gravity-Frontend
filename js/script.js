let turns = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];
let gameOn = false;
let gameEnded = false;
let prevent = false; // prevent repeated clicks

function displayResponse(data) {
    if(data.status === "NEW") {
        replay();
    }
    let board = data.board;
    for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
            let id = i + "_" + j;
            if(board[i][j] == 1) {
                turns[i][j] = 'X';
                $("#"+id).append("<div class='x'>X</div>");
            } else if(board[i][j] == 2) {
                turns[i][j] = 'O';
                $("#"+id).append("<div class='o'>O</div>");
            }
        }
    }

    if(data.winner.winner !== null) {
        data.winner.winningCells.forEach(cell => {
            colorCell(cell.x, cell.y);
        });
        setTimeout(() => { alert("Winner is " + data.winner.winner); }, 500);
    }

    if(data.status === "FINISHED") {
        gameEnded = true;
    }

    // running prevent logic
    if(prevent == true) prevent = false;
    else gameOn = !gameOn;
}

function colorCell(x,y) {
    let id = x+"_"+y;
    $("#"+id).css("background-color", "#c6f68d");
}

function makeMove(type, xCoordinate, yCoordinate) {
    gameOn = false;
    prevent = true;
    $.ajax({
        url: url + "/api/game/gameplay",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            "type": type,
            "xCoordinate": xCoordinate,
            "yCoordinate": yCoordinate,
            "gameId": gameId
        }),
        success: (data) => {
            // No need to catch this as data will receive through socket
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function playerTurn(id) {
    if(gameId === undefined) {
        console.log("Not connected to any game");
        alert("You are not connected to any game");
    }
    else if(gameOn) {
        if(isValidMove(id)) {
            let spotTaken = $("#"+id).text();
            if(spotTaken === "") {
                makeMove(playerType, id.split("_")[0], id.split("_")[1]);
            }
        } else {
            console.log("Invalid Move");
            alert("Invalid Move");
        }
    } else {
        console.log("other player turn");
        alert("other player turn");
    }
}

$(".space").click( function() {
    let slot = $(this).attr('id');
    if(!gameEnded) {
        playerTurn(slot);
    } else {
        console.log("Game Ended!");
        alert("Game Ended!");
    }
});

function isValidMove(id) {
    let x = parseInt(id.split("_")[0]);
    let y = parseInt(id.split("_")[1]);

    if(x === turns.length-1) return true;
    return !(turns[x+1][y] === "");
}

function replay() {
    turns = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ];
    $(".space").text("");
    $(".space").css("background-color", "white");
    gameEnded = false;
}
