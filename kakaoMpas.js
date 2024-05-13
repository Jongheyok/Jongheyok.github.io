function kakaoMap(){
  var container = document.getElementById('map');
var options = {
  center: new kakao.maps.LatLng(37.5846465, 126.9251874),
  lvel: 3
};

var map = new kakao.maps.Map(container, options);
};

$(function(){
  kakaoMap();
})
