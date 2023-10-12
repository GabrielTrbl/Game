export const keys = {};

window.addEventListener ("keydown", function(e) {
    keys[e.key] = true;
});
window.addEventListener ("keyup", function(e) {
    keys[e.key] = false
});

export function movePlayerPosition (player) {
    if (player.x < 0) {
    player.x = 0;
    }
    if (player.y < 0) {
    player.y = 0;
    }
    if (player.y > 545) {
        player.y = 545;
    }
    if (player.x > 425) {
        player.x = 425;
    }
    if (keys["ArrowLeft"]){
        player.x -= 5;
    }
    if (keys["ArrowRight"]) {
        player.x += 5;
    }
    if (keys["ArrowUp"]){
        player.y -= 5;
    }
    if (keys["ArrowDown"]){
        player.y += 5;
    }
}

