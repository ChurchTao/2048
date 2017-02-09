/**
 * Created by church on 17-2-3.
 */
function showNumWithAnimation(i,j,num) {
    var numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getColor(num));
    numberCell.css('color',getNumColor(num));
    //numberCell.text(num);
    switch( num ){
        case 2:numberCell.text("小白");break;
        case 4:numberCell.text("实习生");break;
    }
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },200)
}
function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell=$('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}
function updateScore(score) {
    $('#score').text(score);
}