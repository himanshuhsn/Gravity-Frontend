let turns = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];
let turn = ""
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
            gameOn = false;
            console.log("success on make move");
            displayResponse(data);
        },
        error: (error) => {
            console.log(error);
        }
    })
}

function playerTurn(turn, id) {
    if(gameOn) {
        let spotTaken = $("#"+id).text();
        if(spotTaken === "") {
            makeMove(playerType, id.split("_")[0], id.split("_")[1]);
        }
    }
}

$(".space").click( function() {
    let slot = $(this).attr('id');
    playerTurn(turn, slot);
});

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