import {ComputerMove, GameStep} from './engine';
import {onMounted} from 'vue';
import {clearBoard, clickedPos, drawBoard, occupied} from './board-utils.js';

export default {
    props: ['difficulty'],
    emits: ['gameOver', 'whosTurn'],
    setup(props, context) {
        const huPlayer = "X";
        const aiPlayer = "O";

        const symbols = {
            huPlayer,
            aiPlayer
        }

        let aiPlaying = Math.random() < 0.5;

        const difficulty = props.difficulty;
        let board;

        const init = () => {
            board = clearBoard();

            if (aiPlaying) {
                context.emit('whosTurn', 'aiPlayer');
                setTimeout(() => {
                    const pos = ComputerMove(board, symbols, difficulty);
                    board[pos] = aiPlayer;
                    drawBoard(board);
                    aiPlaying = false;
                    context.emit('whosTurn', 'huPlayer');
                }, 1000);
            } else {
                context.emit('whosTurn', 'huPlayer');
            }
        }

        const clicked = (event) => {
            if (aiPlaying) {
                return;
            }

            const pos = clickedPos(event);

            console.log(pos);

            if (!occupied(board, pos)) {
                aiPlaying = false;
                board[pos] = huPlayer;
                drawBoard(board);

                const game = GameStep(board, symbols, difficulty);
                board = game.board;

                if (game.winner) {
                    drawBoard(board);
                    context.emit('gameOver', game.winner);
                } else {
                    setTimeout(() => {
                        drawBoard(board);
                        aiPlaying = false;
                        context.emit('whosTurn', 'huPlayer');
                    }, 1000);
                }
            }
        }

        onMounted(() => {
            init();
        });

        return {aiFirst: aiPlaying, init, clicked};
    },
    template: `
      <table>
      <tbody @click="clicked">
      <tr>
        <td pos="0" id="pos0"></td>
        <td pos="1" id="pos1"></td>
        <td pos="2" id="pos2"></td>
      </tr>
      <tr>
        <td pos="3" id="pos3"></td>
        <td pos="4" id="pos4"></td>
        <td pos="5" id="pos5"></td>
      </tr>
      <tr>
        <td pos="6" id="pos6"></td>
        <td pos="7" id="pos7"></td>
        <td pos="8" id="pos8"></td>
      </tr>
      </tbody>
      </table>
    `
}