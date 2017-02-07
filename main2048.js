/**
 * Created by church on 17-2-3.
 */
var board = new Array();
var score = 0;
var hasConflicted=new Array();

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
        hasConflicted[i]=new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j]=false;
        }
    }
    updateBoardView();
    score=0;
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
                //theNumberCell.text(board[i][j]);
                switch( board[i][j] ){
                    case 2:theNumberCell.text("小白");break;
                    case 4:theNumberCell.text("实习生");break;
                    case 8:theNumberCell.text("程序员");break;
                    case 16:theNumberCell.text("项目经理");break;
                    case 32:theNumberCell.text("架构师");break;
                    case 64:theNumberCell.text("技术经理");break;
                    case 128:theNumberCell.text("高级经理");break;
                    case 256:theNumberCell.text("技术副总监");break;
                    case 512:theNumberCell.text("技术总监");break;
                    case 1024:theNumberCell.text("副总裁");break;
                    case 2048:theNumberCell.text("CTO");break;
                    case 4096:theNumberCell.text("总裁");break;
                    case 8192:theNumberCell.text("无敌");break;
                }
            }
            hasConflicted[i][j]=false;
        }
}
function newOneNum() {
    if (nospace(board))return false;

    //随机一个位置 0-4
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));

    var times=0;

    while (times<50){
        if (board[randx][randy]==0)
            break;
         randx=parseInt(Math.floor(Math.random()*4));
         randy=parseInt(Math.floor(Math.random()*4));
        times++;
    }
    if (times==50){
        for( var i = 0 ; i < 4 ; i ++ ) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j]==0){
                    randx=i;
                    randy=j;
                }
            }
        }
    }
    //随机一个数字
    var num = Math.random()<0.5?2:4;
    //显示数字
    board[randx][randy]=num;
    showNumWithAnimation(randx,randy,num);
    return true;
}

$(document).keydown(function (event) {
    switch( event.keyCode ){
        case 37: //left
            if( moveLeft() ){
                setTimeout("newOneNum()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout("newOneNum()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout("newOneNum()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout("newOneNum()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default: //default
            break;
    }
});
function isGameOver(){
    if( nospace( board ) && nomove( board ) ){
        gameover();
    }
}

function gameover(){
    alert('gameover!');
}

function moveLeft() {

    if (!canMoveLeft(board)){
        return false;
    }
    for( var i = 0 ; i < 4 ; i ++ ) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j]!=0){
                for (var k=0;k<j;k++)
                {
                    if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)) {
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if (board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
                        //move
                        //add
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][k]+board[i][j];
                        board[i][j]=0;

                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }

        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}
function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board )&&!hasConflicted[i][k]){
                        showMoveAnimation( i , j , i , k);
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board )&&!hasConflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}
function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board )&&!hasConflicted[k][j]  ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}