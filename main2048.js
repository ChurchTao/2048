/**
 * Created by church on 17-2-3.
 */
var board = new Array();
var score = 0;

$(document).ready(function () {
    newgame();

});
function newgame() {
    //初始化棋盘格
    //随机在两个格子生产数字
    init();
    newOneNum();
    newOneNum();
}
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));

        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    updateBoardView();
}
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            }
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getColor(board[i][j]));
                theNumberCell.css('color', getNumColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
}
function newOneNum() {
    if (nospace(board))return false;

    //随机一个位置 0-4
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    while (true){
        if (board[randx][randy]==0)
            break;
         randx=parseInt(Math.floor(Math.random()*4));
         randy=parseInt(Math.floor(Math.random()*4));
    }
    //随机一个数字
    var num = Math.random()<0.5?2:4;
    //显示数字
    board[randx][randy]=num;
    showNumWithAnimation(randx,randy,num);
    return true;
}