import React, { useEffect } from 'react';
import './components/Map.css';

function Map() {
  useEffect(() => {
    const scriptElement = document.querySelector('script[data-api-key]');
    const apiKey = scriptElement ? scriptElement.getAttribute('data-api-key') : '';

    if (apiKey) {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            console.log("카카오 지도 API가 로드되었습니다.");
            const container = document.getElementById('map');
            const options = {
              center: new window.kakao.maps.LatLng(37.5846465, 126.9251874),
              level: 3
            };
            const map = new window.kakao.maps.Map(container, options);
            console.log("지도 객체가 생성되었습니다.");

            // 마커가 표시될 위치
            const markerPosition = new window.kakao.maps.LatLng(37.5846465, 126.9251874);
            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              position: markerPosition
            });
            marker.setMap(map);
            console.log("마커가 지도에 추가되었습니다.");
          });
        } else {
          console.error("카카오 지도 API가 로드되지 않았습니다.");
        }
      };

      script.onerror = () => {
        console.error("카카오 지도 API 스크립트를 로드하는 데 실패했습니다.");
      };

      return () => {
        document.head.removeChild(script);
      };
    } else {
      console.error("API 키가 제공되지 않았습니다.");
    }
  }, []);

  return (
    <div id="map" className="map" style={{ width: '800px', height: '500px' }}>
    </div>
  );
}

export default Map;
