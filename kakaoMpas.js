function kakaoMap(){
  var mapcontainer = document.getElementById('map');
var mapoptions = {
  center: new kakao.maps.LatLng(37.5846465, 126.9251874),
  level: 3
};
var markerPosition  = new kakao.maps.LatLng(37.5846465, 126.9251874); 
var map = new kakao.maps.Map(mapContainer, mapOption);
var marker = new kakao.maps.Marker({
  position: markerPosition
});
marker.setMap(map);
};

$(function(){
  kakaoMap();
})
