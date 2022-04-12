export default class AIHelpers {
    static playerWon(board, player )  {
        return (board[0] === player && board[1] === player && board[2] === player) ||
            (board[3] === player && board[4] === player && board[5] === player) ||
            (board[6] === player && board[7] === player && board[8] === player) ||
            (board[0] === player && board[3] === player && board[6] === player) ||
            (board[1] === player && board[4] === player && board[7] === player) ||
            (board[2] === player && board[5] === player && board[8] === player) ||
            (board[0] === player && board[4] === player && board[8] === player) ||
            (board[2] === player && board[4] === player && board[6] === player);
    }

    static isGameFinished(board, symbols) {
        if ( !this.isMovesLeft(board, symbols) ) {
            return true;
        }

        const { huPlayer, aiPlayer } = symbols;

        return !!(this.playerWon(board, huPlayer) || this.playerWon(board, aiPlayer));


    }

    static getEmptyIndexes(board, symbols)   {
        const { huPlayer, aiPlayer } = symbols;
        return  board.filter(s => s !== huPlayer && s !== aiPlayer);
    }

    static isMovesLeft(board, symbols) {
        return this.getEmptyIndexes(board, symbols).length !== 0;
    }
}