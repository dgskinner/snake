# Rattlesnake

Rattlesnake is a game based on the classic arcade game Snake. The goal is to direct the snake toward the white squares (eggs). Ten points are awarded for each egg eaten. (live: http://dgskinner.github.io)
* The rattesnake grows with each egg eaten, making the game harder as it progresses.
* The snake also drops a mine each time it eats an egg.
* Game ends once the snake collides with a mine, itself, or the border of the grid
* Snake can turn once per time interval, but not in the direction opposite to its current direction
* Every square in the grid contains information whether it contains an egg, a mine, or a segment of the snake
* Each new time interval, the board is re-rendered with updated data
* After an egg is consumed, uses Math.floor() and Math.random() to randomly generate position of the next egg
* Uses event.keyCode to register appropriate turn and jQuery’s event.preventDefault() to stop arrow keys from scrolling the browser window

