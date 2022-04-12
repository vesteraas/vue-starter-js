import AIHelpers from './AIHelpers.js';
import ComputerMove from './ComputerMove.js';

export default function GameStep(board, symbols, difficulty) {
    const gameState = {
        winner: null,
        board: null
    };

    function computeAIAfterBoard() {
        const bestMove = ComputerMove(board, symbols, difficulty);

        const newBoard = Array.from(board);
        if (bestMove !== undefined) {
            newBoard[bestMove] = symbols.aiPlayer;
        }

        return newBoard;
    }

    if (AIHelpers.isGameFinished(board, symbols)) {
        const winner = (() => {
            const humanWon = AIHelpers.playerWon(board, symbols.huPlayer);
            const computerWon = AIHelpers.playerWon(board, symbols.aiPlayer);
            if (humanWon) {
                return 'huPlayer';
            } else if (computerWon) {
                return 'aiPlayer';
            } else {
                return 'draw';
            }
        })();

        gameState.board = board;
        gameState.winner = winner;
    } else {
        const boardAIAfter = computeAIAfterBoard(board);
        if (AIHelpers.isGameFinished(boardAIAfter, symbols)) {
            const winner = AIHelpers.playerWon(boardAIAfter, symbols.aiPlayer) ? 'aiPlayer' : 'draw';

            gameState.board = boardAIAfter;
            gameState.winner = winner;
        } else {
            gameState.board = boardAIAfter;
        }
    }

    return gameState;
}