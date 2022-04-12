import {createApp, ref} from 'vue'
import TicTacToe from './components/tic-tac-toe/tic-tac-toe.js';

const vue = createApp({
    setup() {
        // Reactive variables
        const board = ref(); // Refers to the tic-tac-toe component in the index.html with the property ref="board"
        const winner = ref(undefined);
        const nowPlaying = ref(undefined);

        const gameOver = (player) => {
            winner.value = player;
        }

        const whosTurn = (player) => {
            nowPlaying.value = player;
        }

        const reset = () => {
            winner.value = undefined;
            nowPlaying.value = undefined;
            board.value.init();
        }

        return {board, winner, nowPlaying, gameOver, whosTurn, reset};
    }, components: {
        TicTacToe
    }
});

if (document.getElementById('app')) {
    vue.mount('#app')
}