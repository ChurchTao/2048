/**
 * Created by church on 17-2-3.
 */
function showNumWithAnimation(i,j,num) {
    var numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getColor(num));
    numberCell.css('color',getNumColor(num));
    numberCell.text(num);
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },200)
}