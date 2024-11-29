import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catsImage from '../images/convenience.png'; // 이미지 파일 import

function Question2({ onAnswerChange }) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onAnswerChange(value); // 선택한 값을 상위(App.js)로 전달
  };

  const handleNext = () => {
    if (selectedValue) {
      navigate('/question_3'); // 다음 페이지로 이동
    } else {
      alert('값을 선택해주세요!');
    }
  };

  const handlePrevious = () => {
    navigate('/question_1'); // 이전 페이지로 이동
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFACD', // 밝은 노란색 배경
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '0',
      }}
    >
      <h2
        style={{
          position: 'absolute',
          top: '1%',
          fontSize: '48px',
          color: '#FF8C00', // 주황색 텍스트
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        #질문 2.
      </h2>

      <div
        style={{
          backgroundColor: '#ffffff',
          width: '80%',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          overflow: 'hidden',
          height: '500px',
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundImage: `url(${catsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div
          style={{
            flex: 1,
            backgroundColor: '#FFF8DC',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            #2. 편의시설(상점, 병원, 학교 등)이 얼마나 중요한가요?
          </p>
          {['매우 중요함', '중요함', '보통', '중요하지 않음', '매우 중요하지 않음'].map(
            (label, index) => (
              <label
                key={index}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  border: '1px solid #d1d9e6',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  backgroundColor: '#ffffff',
                  transition: 'transform 0.2s, background-color 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFFACD';
                  e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = 'none';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <input
                  type="radio"
                  name="importance"
                  value={label}
                  checked={selectedValue === label}
                  onChange={handleChange}
                  style={{
                    marginRight: '10px',
                    accentColor: '#FF8C00',
                  }}
                />
                {label}
              </label>
            )
          )}
          <small
            style={{
              marginTop: '10px',
              fontSize: '14px',
              color: '#7a8ca4',
            }}
          >
            * 각 항목에 대해 하나를 선택하세요.
          </small>
        </div>
      </div>

      {/* 이전 버튼 */}
      <button
        onClick={handlePrevious}
        style={{
          position: 'absolute',
          left: '20px',
          bottom: '20px',
          backgroundColor: '#ffcc00',
          border: 'none',
          padding: '15px 30px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '10px',
          color: 'black',
          cursor: 'pointer',
          transition: 'transform 0.2s, background-color 0.2s', // 부드러운 효과 추가
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#ffd633'; // 호버 시 더 밝은 노란색
          e.target.style.transform = 'scale(1.1)'; // 살짝 확대
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#ffcc00'; // 기본 노란색 복원
          e.target.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)'; // 클릭 시 살짝 작아짐
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        이전
      </button>

      {/* 계속하기 버튼 */}
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#FFA500', // 주황색
          border: 'none',
          padding: '18px 80px',
          fontSize: '20px',
          fontWeight: 'bold',
          borderRadius: '10px',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#FF7F00'; // 진한 주황색
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#FFA500'; // 기본 주황색
          e.target.style.transform = 'scale(1)';
        }}
      >
        계속하기
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '20px',
          backgroundColor: '#32CD32', // 초록색
          border: 'none',
          padding: '15px 30px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '10px',
          color: 'white',
          cursor: 'pointer',
          transition: 'transform 0.2s, background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#228B22'; // 짙은 초록색
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#32CD32'; // 기본 초록색
          e.target.style.transform = 'scale(1)';
        }}
      >
        다음
      </button>
    </div>
  );
}

export default Question2;
