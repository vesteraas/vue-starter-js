export const clickedPos = (event) => parseInt(event.target.getAttribute('pos'));

export const occupied = (board, pos) => board[pos] == 'X' || board[pos] == 'O';

const setCell = (index, text) => {
    const element = document.getElementById('pos' + index);

    if (element) {
        element.innerText = text;
    }
}

export const clearBoard = () => {
    const board = [];

    for (let n = 0; n < 9; n++) {
        board.push(n);
        setCell(n, '');
    }

    return board;
}

export const drawBoard = (board) => {
    for (let n = 0; n < 9; n++) {
        if (board[n] === 'X') {
            setCell(n, 'X');
        } else if (board[n] === 'O') {
            setCell(n, 'O');
        }
    }
}
