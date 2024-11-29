import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../images/home-icon.png'; // 집 아이콘 이미지 (추가)

function Main() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#FFF5E1', // 부드러운 따뜻한 배경색
        padding: '20px',
        overflow: 'hidden', // 스크롤바 제거
      }}
    >
      {/* 상단 헤더 */}
      <h1
        style={{
          fontSize: '60px',
          color: '#FF4500', // 강렬한 오렌지 색상
          fontWeight: 'bold',
          marginBottom: '10px',
          textShadow: '4px 4px 10px rgba(255, 69, 0, 0.5)', // 더 부드러운 그림자
          fontFamily: 'Arial, sans-serif', // 심플한 폰트
        }}
      >
        우리집 찾기 서비스
      </h1>
      <p
        style={{
          fontSize: '22px',
          color: '#FF6347', // 따뜻한 코랄 색상
          marginBottom: '30px',
          fontWeight: '500',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        당신의 꿈의 집을 찾아드립니다! 😊
      </p>

      {/* 중앙 카드 */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          width: '90%',
          height: '450px', // 높이 증가
          borderRadius: '30px',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)', // 더 강렬한 그림자 효과
          padding: '50px',
          textAlign: 'center',
          marginBottom: '30px',
          overflow: 'hidden', // 카드 내 스크롤바 제거
          position: 'relative', // 배경 장식 추가를 위해
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            backgroundColor: '#FFD700', // 밝은 노란색 장식
            borderRadius: '50%',
            filter: 'blur(100px)',
            zIndex: 0,
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            right: '-50px',
            width: '250px',
            height: '250px',
            backgroundColor: '#FFA07A', // 따뜻한 주황색 장식
            borderRadius: '50%',
            filter: 'blur(150px)',
            zIndex: 0,
          }}
        ></div>

        {/* 콘텐츠 */}
        <div
          style={{
            position: 'relative',
            zIndex: 1, // 배경 장식 위로
          }}
        >
          <img
            src={homeIcon}
            alt="Home Icon"
            style={{
              width: '80px',
              height: '80px',
              marginBottom: '20px',
            }}
          />
          <p
            style={{
              fontSize: '20px',
              color: '#333333',
              lineHeight: '2', // 텍스트 간격 조정
              marginBottom: '30px', // 문단 간 간격
            }}
          >
            다양한 선호도를 선택하여<br />
            당신의 완벽한 집을 찾아보세요!
          </p>
          <ul
            style={{
              textAlign: 'left',
              color: '#555',
              fontSize: '16px',
              lineHeight: '2', // 항목 간 간격 조정
              paddingLeft: '40px',
            }}
          >
            <li>🚪 가격: "해당 지역의 가격(집값, 생활비 등)이 얼마나 중요한가요?" </li>
            <li>🏘️ 편의시설: "해당 지역의 편의시설(상점, 병원, 학교 등)이 얼마나 중요한가요?"</li>
            <li>💰 문화시설: "해당 지역의 문화시설(박물관, 영화관, 공연장 등)이 얼마나 중요한가요?"</li>
            <li>🛠️ 교통: "해당 지역의 교통편(버스, 지하철 등)이 얼마나 중요한가요?"</li>
            <li>🥰 안전: "해당 지역의 안전(치안, 범죄율 등)이 얼마나 중요한가요?"</li>
          </ul>
        </div>
      </div>

      {/* 시작 버튼 */}
      <button
        onClick={() => navigate('/question_1')}
        style={{
          backgroundColor: '#32CD32', // 생동감 있는 라임색 버튼
          color: '#FFFFFF',
          border: 'none',
          padding: '20px 70px',
          fontSize: '26px',
          fontWeight: 'bold',
          borderRadius: '50px', // 완전히 둥근 모서리
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)', // 버튼 그림자
          transition: 'transform 0.3s, background-color 0.3s', // 부드러운 애니메이션 효과
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#2E8B57'; // 호버 시 짙은 녹색
          e.target.style.transform = 'scale(1.1)'; // 살짝 확대
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#32CD32'; // 기본 색상 복원
          e.target.style.transform = 'scale(1)'; // 원래 크기로 복원
        }}
      >
        시작하기 🚀
      </button>
    </div>
  );
}

export default Main;
