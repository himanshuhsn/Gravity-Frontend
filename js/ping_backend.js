let INTERVAL = 10 * 60 * 1000; // 10 min
let PING_URL = url + '/api/game/';

function checkData() {
    $.ajax({
        type: "GET",
        url: PING_URL,
        success: function (data) {
            console.log("pinged the backend server")
            // console.log(data);
        }
    });
}

setInterval(checkData, INTERVAL);