import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Result({ answers }) {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // 응답 값 매핑
  const mapAnswerToValue = (answer) => {
    switch (answer) {
      case '매우 중요함':
        return 1;
      case '중요함':
        return 2;
      case '보통':
        return 3;
      case '중요하지 않음':
        return 4;
      case '매우 중요하지 않음':
        return 5;
      default:
        return 3; // 기본값: 보통
    }
  };

  // Flask로 데이터를 전송하는 함수
  const sendToBackend = async () => {
    setLoading(true); // 로딩 시작

    // answers를 서버로 보낼 형식으로 변환
    const dataToSend = {
      price: mapAnswerToValue(answers.question1),
      convenience: mapAnswerToValue(answers.question2),
      culture: mapAnswerToValue(answers.question3),
      traffic: mapAnswerToValue(answers.question4),
      safety: mapAnswerToValue(answers.question5),
    };

    try {
      // Flask 서버로 POST 요청 보내기
      const response = await axios.post('http://127.0.0.1:5000/recommendation', dataToSend);
      setRecommendations(response.data); // 서버에서 받은 추천 결과 저장
      setLoading(false); // 로딩 끝
    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('백엔드로 데이터 전송 중 오류가 발생했습니다.');
      setLoading(false); // 로딩 끝
    }
  };

  // 추천 결과 순위별로 정렬 (예: 가격 우선 순위)
  const sortedRecommendations = recommendations.sort((a, b) => a.rank - b.rank);

  return (
    <div
      style={{
        background: 'linear-gradient(45deg, #A8C0FF, #D4E1F2, #F6F8FC)', // 연한 파스텔톤으로 변경
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        fontFamily: "'Poppins', sans-serif",
        color: '#333', // 좀 더 부드러운 텍스트 색상
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          fontSize: '60px',
          color: '#4A90E2', // 좀 더 부드러운 파란색
          fontWeight: 'bolder',
          marginBottom: '40px',
          textShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // 좀 더 부드러운 그림자
          letterSpacing: '2px',
          textAlign: 'center',
        }}
      >
        🎉 결과 페이지 🎉
      </h1>

      <div
        style={{
          backgroundColor: '#F9F9F9', // 밝은 회색 배경
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // 부드러운 그림자
          padding: '40px',
          width: '90%',
          maxWidth: '700px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '32px', // 더 큰 제목 글자
            marginBottom: '30px', // 문단 간격 증가
            color: '#333',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}
        >
          당신의 선택
        </h2>

        <ul
          style={{
            listStyleType: 'none',
            padding: '0',
            margin: '0',
            fontSize: '22px', // 텍스트 크기 증가
            color: '#555', // 부드러운 회색 텍스트
            lineHeight: '2', // 줄 간격 조정
            textAlign: 'left',
            fontWeight: '500',
          }}
        >
          {[
            '가격',
            '편의',
            '문화',
            '교통',
            '안전',
          ].map((question, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: '20px', // 항목 간 간격 증가
                color: '#4A90E2', // 파란색 강조
                fontSize: '20px', // 항목 텍스트 크기 조정
                fontWeight: 'bold', // 텍스트 굵기 증가
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{question}:</span> {answers[`question${idx + 1}`] || '응답 없음'}
            </li>
          ))}
        </ul>
      </div>

      {/* 추천 결과 출력 */}
      {loading ? (
        <div
          style={{
            fontSize: '24px', // 텍스트 크기 증가
            marginTop: '40px',
            color: '#333',
            fontWeight: 'bold',
            animation: 'pulse 1s infinite',
          }}
        >
          로딩 중...
        </div>
      ) : (
        <div>
          <h2 style={{ marginTop: '40px', color: '#333', fontSize: '28px', fontWeight: 'bold' }}>[[ 추천 지역 ]]</h2>
          {sortedRecommendations.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {sortedRecommendations.map((rec, index) => {
                const rank = index + 1; // 순위를 1부터 시작
                return (
                  <li
                    key={index}
                    style={{
                      background: 'linear-gradient(45deg, #FF9E3D, #FF7F50)', // 부드러운 오렌지색 그라디언트
                      padding: '20px',
                      margin: '15px 0',
                      borderRadius: '12px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)', // 부드러운 그림자
                      color: '#fff',
                      fontSize: '22px', // 텍스트 크기 증가
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                  >
                    <strong>{rank}순위: {rec.gu} - {rec.dong}</strong>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p style={{ color: '#333', fontSize: '18px' }}>추천 결과가 없습니다.</p>
          )}
        </div>
      )}

      <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
        <button
          onClick={sendToBackend}
          style={{
            background: 'linear-gradient(45deg, #32CD32, #28A745)', // 밝은 초록색 그라디언트
            border: 'none',
            padding: '20px 60px',
            fontSize: '24px', // 버튼 글자 크기 증가
            fontWeight: 'bold',
            borderRadius: '50px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0px 6px 20px rgba(0, 255, 0, 0.2)', // 부드러운 그림자
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          📤 추천 결과 보기
        </button>

        <button
          onClick={() => navigate('/')}
          style={{
            background: 'linear-gradient(45deg, #B89AF1, #8A84FF)', // 부드러운 보라색 그라디언트
            border: 'none',
            padding: '20px 60px',
            fontSize: '24px', // 버튼 글자 크기 증가
            fontWeight: 'bold',
            borderRadius: '50px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0px 6px 20px rgba(42, 42, 121, 0.3)', // 부드러운 그림자
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          🚀 처음으로 돌아가기 🚀
        </button>
      </div>
    </div>
  );
}

export default Result;
