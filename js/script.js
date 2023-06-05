let player1Health = document.getElementById("player1Health");
let player2Health = document.getElementById("player2Health");
let result = document.getElementById("result");

// Updating the DOM
const updateGame = (player1, player2, gameState) => {
    // Initializing the player health
    player1Health.innerText = player1.health;
    player2Health.innerText = player2.health;
    //Chhecking the conditon for game over
    if (player1.health <= 0 || player2.health <= 0) {
        game.isOver = true;
        gameState = game.isOver;
        result.innerHTML = game.winner(game.isOver, player1, player2);
        return gameState;
    }
};
// Calculating the players health after the attack and heal
class Player {
    // Initializing the players name and health
    constructor(name, health) {
        this.name = name;
        this.health = health;
    }
    // Claculating and updating the damage amount after the player attack
    attack(player, enemy) {
        let damageAmount = Math.ceil(Math.random() * 15);
        enemy.health -= damageAmount;
        if (enemy.health < 0) {
            enemy.health = 0;
        }
        // Updating the player health by calling updateGame()
        updateGame(player1, player2, gameState);
        // Returning the message that 'player1/player2 attacks player2/player1 for random damage
        console.log(`${player.name} attacks ${enemy.name} for ${damageAmount} damage!`);
    }
    heal(player) {
        let healAmount = Math.ceil(Math.random() * 5);
        player.health += healAmount;
        // Updating the player health by calling updateGame()
        updateGame(player1, player2, gameState);
        // Returning the message that 'player1/player2 attacks player2/player1 for random damage
        console.log(`${player.name} heals for ${healAmount} HP!`);
    }
}
// This class consists of entire game update
class Game {
    constructor() {
        this.isOver = false;
    }
    // Checking the winner
    winner(isOver, player1, player2) {
        if (isOver == true && player1.health <= 0) {
            var message = `${player2.name} wins the game!`;
        } else if (isOver == true && player2.health <= 0) {
            var message = `${player1.name} wins the game!`;
        }
        document.getElementById("victory").play();
        return message;
    }
    // resetting the game
    reset(player1, player2) {
        player1.health = 100;
        player2.health = 100;
        this.isOver = false;
        result.innerText = "";
        updateGame(player1, player2);
    }
}

// Creating two player by creating objects to Player class
let player1 = new Player("player1", 100);
let player2 = new Player("player2", 100);

// Creating the Game class object
let game = new Game();
// Setting the game state
let gameState = game.isOver;
// Initializing the game by calling the updateGame()
updateGame(player1, player2);

// Adding functionality

// Player1 control
document.addEventListener("keydown", (e) => {
    if (e.key == "q" && player2.health > 0 && game.isOver == false) {
        player1.attack(player1, player2);
        document.getElementById("player1Attack").play();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key == "a" && player1.health < 100 && game.isOver == false) {
        player1.heal(player1);
        document.getElementById("player1Heal").play();
    }
});
// player2 control
document.addEventListener("keydown", (e) => {
    if (e.key == "o" && player1.health > 0 && game.isOver == false) {
        player2.attack(player2, player1);
        document.getElementById("player2Attack").play();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key == "l" && player2.health < 100 && game.isOver == false) {
        player2.heal(player2);
        document.getElementById("player2Heal").play();
    }
});
