var chicken = document.getElementById('chicken');
var obstacleCeiling = document.getElementById('obstacleCeiling');
var obstacleFloor = document.getElementById('obstacleFloor');
var scoreElement = document.getElementById('score');
var gameOverMessage = document.getElementById('gameOverMessage'); // Added this line to select the game over message element
var counter = 0;
var isOnCeiling = false;
var isGameOver = false;
var lose;

function shiftGravity() {
    if (!isGameOver) {
        if (isOnCeiling) {
            chicken.style.transform = "rotate(0deg)";
            chicken.style.top = "190px";
            obstacleCeiling.style.left = "200%";
            obstacleFloor.style.left = "0";
            isOnCeiling = false;
        } else {
            chicken.style.transform = "rotate(180deg)";
            chicken.style.top = "50px";
            obstacleCeiling.style.left = "0";
            obstacleFloor.style.left = "100%";
            isOnCeiling = true;
        }
    }
}

lose = setInterval(function () {
    if (!isGameOver) {
        var chickenTop = parseInt(window.getComputedStyle(chicken).getPropertyValue("top"));
        var obstacleCeilingLeft = parseInt(window.getComputedStyle(obstacleCeiling).getPropertyValue("left"));
        var obstacleFloorLeft = parseInt(window.getComputedStyle(obstacleFloor).getPropertyValue("left"));

        var obstacleTop = isOnCeiling ? 50 : 200;
        var obstacleHeight = 50;

        if (
            (isOnCeiling && obstacleCeilingLeft < 60 && obstacleCeilingLeft > 0 && chickenTop <= obstacleTop + obstacleHeight && chickenTop + 60 >= obstacleTop) ||
            (!isOnCeiling && obstacleFloorLeft < 60 && obstacleFloorLeft > 0 && chickenTop + 60 >= obstacleTop && chickenTop <= obstacleTop + obstacleHeight)
        ) {
            obstacleCeiling.style.animation = "none";
            obstacleFloor.style.animation = "none";
            gameOverMessage.style.display = "block"; // Show the "Game Over" message
            gameOverMessage.textContent = "Game Over! Score: " + counter + ". Press SPACE to Retry"; // Set the message content
            isGameOver = true;
            clearInterval(lose);
        }

        if (obstacleCeilingLeft + 50 < 0) {
            obstacleCeiling.style.left = "100%";
        }

        if (obstacleFloorLeft + 50 < 0) {
            obstacleFloor.style.left = "100%";
        }

        scoreElement.textContent = "SCORE: " + counter;
    }
}, 10);

document.addEventListener("keydown", function (event) {
    if (isGameOver && event.code === "Space") {
        location.reload();
    } else if (!isGameOver && event.code === "Space") {
        shiftGravity();
        counter++;
    }
});
