var chicken = document.getElementById('chicken');
var obstacleCeiling = document.getElementById('obstacleCeiling');
var obstacleFloor = document.getElementById('obstacleFloor');
var scoreElement = document.getElementById('score');
var counter = 0;
var isOnCeiling = false;

function shiftGravity() {
    if (isOnCeiling) {
        chicken.style.transform = "rotate(0deg)";
        chicken.style.top = "190px";
        obstacleCeiling.style.left = "200%"; // Adjusted initial position for the ceiling obstacle
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

var lose = setInterval(function () {
    var chickenTop = parseInt(window.getComputedStyle(chicken).getPropertyValue("top"));
    var obstacleCeilingLeft = parseInt(window.getComputedStyle(obstacleCeiling).getPropertyValue("left"));
    var obstacleFloorLeft = parseInt(window.getComputedStyle(obstacleFloor).getPropertyValue("left"));

    var obstacleTop = isOnCeiling ? 50 : 200; // Adjusted top position for the ceiling obstacle
    var obstacleHeight = 50; // Adjusted height of the obstacle

    if (
        (isOnCeiling && obstacleCeilingLeft < 120 && obstacleCeilingLeft > 0 && chickenTop <= obstacleTop + obstacleHeight && chickenTop + 60 >= obstacleTop) ||
        (!isOnCeiling && obstacleFloorLeft < 120 && obstacleFloorLeft > 0 && chickenTop + 60 >= obstacleTop && chickenTop <= obstacleTop + obstacleHeight)
    ) {
        obstacleCeiling.style.animation = "none";
        obstacleCeiling.style.display = "none";
        obstacleFloor.style.animation = "none";
        obstacleFloor.style.display = "none";
        scoreElement.textContent = "SCORE: " + counter;
        counter = 0;
        clearInterval(lose);
    }

    // Check if obstacles are outside the visible area and reset their position
    if (obstacleCeilingLeft + 50 < 0) {
        obstacleCeiling.style.left = "100%"; // Adjusted to reset on the right side of the visible area
    }
    
    if (obstacleFloorLeft + 50 < 0) {
        obstacleFloor.style.left = "100%"; // Adjusted to reset on the right side of the visible area
    }

    scoreElement.textContent = "SCORE: " + counter;
}, 10);

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        shiftGravity();
        counter++;
    }
});
