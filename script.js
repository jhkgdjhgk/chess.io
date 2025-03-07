var board = null;
var game = new Chess();

function onDragStart(source, piece, position, orientation) {
    // Prevent movement if the game is over or it's not the player's turn
    if (game.game_over() || 
        (game.turn() === 'w' && piece.search(/^b/) !== -1) || 
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Promote pawn to Queen if it reaches the end
    });

    if (move === null) return 'snapback'; // Invalid move

    updateStatus();
}

function onSnapEnd() {
    board.position(game.fen()); // Update board after move
}

function updateStatus() {
    if (game.in_checkmate()) {
        alert('Game over: ' + (game.turn() === 'w' ? 'Black wins' : 'White wins'));
    } else if (game.in_draw()) {
        alert('Game over: Draw');
    }
}

// Initialize board (only once)
var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

board = Chessboard('board', config);
console.log(Chessboard);
console.log(Chess);
