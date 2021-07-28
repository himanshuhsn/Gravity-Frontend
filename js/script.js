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

function displayResponse(data) {
    let board = data.board;
    for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
            if(board[i][j] == 1) {
                turns[i][j] = 'X';
            } else if(board[i][j] == 2) {
                turns[i][j] = 'O';
            }
            let id = i + "_" + j;
            $("#"+id).text(turns[i][j]);
        }
    }

    if(data.winner !== null) {
        alert("Winner is " + data.winner);
    }

    gameOn = true;
}

function makeMove(type, xCoordinate, yCoordinate) {
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
            displayResponse(data);
            gameOn = false;
        },
        error: (error) => {
            console.log(error);
        }
    })
}

function playerTurn(id) {
    if(gameOn) {
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
    playerTurn(slot);
});

function isValidMove(id) {
    let x = parseInt(id.split("_")[0]);
    let y = parseInt(id.split("_")[1]);

    if(x === turns.length-1) return true;
    return !(turns[x+1][y] === "");
}

function reset() {
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
}

$("#reset").click(function () {
    reset();
});