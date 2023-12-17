export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [10, 11, 12, 13],
        [11, 12, 13, 14],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
        [0, 5, 10, 15],
        [5, 10, 15, 20],
        [1, 6, 11, 16],
        [6, 11, 16, 21],
        [2, 7, 12, 17],
        [7, 12, 17, 22],
        [3, 8, 13, 18],
        [8, 13, 18, 23],
        [4, 9, 14, 19],
        [9, 14, 19, 24],
        [3, 7, 11, 15],
        [4, 8, 12, 16],
        [8, 12, 16, 20],
        [0, 6, 12, 18],
        [6, 12, 18, 24],
        [1, 7, 13, 19],
        [5, 11, 17, 23],
        [2, 8, 14, 20],
        [4, 10, 16, 22]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
            return squares[a];
        }
    }
    return null;
}

var concat = function(a, b, c, d, board) {
    var result = board[a] + board[b] + board[c] + board[d];
    
    switch (result) {
        case "xxxx":
            return board[d] === null ? ["x", d] : null;
        case "xxxnull":
            return board[c] === null ? ["x", c] : null;
        case "xxnullx":
            return board[b] === null ? ["x", b] : null;
        case "xnullxx":
            return board[a] === null ? ["x", a] : null;
        case "nullxxx":
            return board[d] === null ? ["x", d] : null;
        case "nullxx":
            return board[c] === null ? ["x", c] : null;
        case "nulx":
            return board[b] === null ? ["x", b] : null;
        case "nullx":
            return board[a] === null ? ["x", a] : null;
        case "oooo":
            return board[d] === null ? ["o", d] : null;
        case "ooonull":
            return board[c] === null ? ["o", c] : null;
        case "oonullo":
            return board[b] === null ? ["o", b] : null;
        case "onull":
            return board[a] === null ? ["o", a] : null;
        case "nullooo":
            return board[d] === null ? ["o", d] : null;
        case "nulloo":
            return board[c] === null ? ["o", c] : null;
        case "nullo":
            return board[b] === null ? ["o", b] : null;
        case "null":
            return board[a] === null ? ["o", a] : null;
        default:
            // Возвращаем null, если нет возможности сделать ход
            return null;
    }
 }
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    //Максимум не включается, минимум включается
}
export function getNextStep(board) {
    var result;
 
    // Проверяем горизонтальные линии
    for (var i = 0; i < 25; i += 5) {
        for (var j = 0; j < 2; j++) { // Двигаемся по горизонтали
            result = concat(i + j, i + j + 1, i + j + 2, i + j + 3, board);
            if (result) return result[1];
        }
    }
 
    // Проверяем вертикальные линии
    for (i = 0; i < 5; i++) {
        for (var k = 0; k < 10; k += 5) { // Двигаемся по вертикали
            result = concat(i + k, i + k + 5, i + k + 10, i + k + 15, board);
            if (result) return result[1];
        }
    }
 
    // Проверяем диагонали
    result = concat(0, 6, 12, 18, board);
    if (result) return result[1];
    
    result = concat(1, 7, 13, 19, board);
    if (result) return result[1];
 
    result = concat(4, 8, 12, 16, board);
    if (result) return result[1];
    
    result = concat(3, 7, 11, 15, board);
    if (result) return result[1];
 
    // Если нет возможности победить или блокировать победу противника,
    // то ставим фишку в первую свободную клетку снизу вверх
    for (i = 20; i >= 0; i--) {
        if (board[i] === null && (i >= 20 || board[i + 5] !== null)) {
            return i;
        }
    }
 
    // Если все клетки заняты, возвращаем null
    return null;
 }
 
/*
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}*/