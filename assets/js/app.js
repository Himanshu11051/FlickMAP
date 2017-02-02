$(document).ready(function(){
    setTimeout(function(){  setMapHeight(); }, 1000);
    setMapHeight();
    
});
$(window).load(function(){
    setMapHeight();
});
$(window).resize(function(){
    setMapHeight();
});
function setMapHeight(){
    var mapHeight = $(window).height() - 56 - 10;
    $('#map').css('height',mapHeight);
}