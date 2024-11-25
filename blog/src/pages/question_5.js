import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catsImage from '../images/cats.jpg'; // 이미지 파일 import

function Question5({ onAnswerChange }) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onAnswerChange(value); // 선택한 값을 상위(App.js)로 전달
  };

  const handleNext = () => {
    if (selectedValue) {
      navigate('/result'); // 결과 페이지로 이동
    } else {
      alert('값을 선택해주세요!');
    }
  };

  const handlePrevious = () => {
    navigate('/question_4'); // 이전 페이지로 이동
  };

  return (
    <div
      style={{
        backgroundColor: '#E6CCFF', // 밝은 보라색 배경
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center', // 가운데 정렬
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
          color: '#6CA0DC',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        안녕하세요
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
            backgroundColor: '#F5E6FF',
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
            #5. 000의 중요도를 선택하세요:
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
                  e.target.style.backgroundColor = '#EBD9FF';
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
                    accentColor: '#6CA0DC',
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
          transition: 'transform 0.2s, background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#ffd633';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#ffcc00';
          e.target.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        이전
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '20px',
          backgroundColor: '#32CD32',
          border: 'none',
          padding: '15px 30px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '10px',
          color: 'black',
          cursor: 'pointer',
          transition: 'transform 0.2s, background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#ffd633';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#ffcc00';
          e.target.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        다음
      </button>

      {/* 계속하기 버튼 */}
      <button
        onClick={handleNext}
        style={{
          position: 'absolute', // 부모 요소 기준으로 위치 설정
          bottom: '30px', // 화면 하단에서 살짝 위로 이동
          left: '50%', // 화면 가로 중앙
          transform: 'translateX(-50%)', // 버튼 자체 너비 기준으로 중앙 정렬
          backgroundColor: '#800080', // 찐한 보라색
          border: 'none',
          padding: '18px 80px', // 버튼 크기 조정
          fontSize: '20px',
          fontWeight: 'bold',
          borderRadius: '10px',
          color: 'white', // 텍스트 색상
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // 버튼에 그림자 효과
          transition: 'transform 0.2s, background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#4B0082'; // 호버 시 더 어두운 보라색
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#800080'; // 기본 보라색 복원
          e.target.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)'; // 클릭 시 살짝 작아짐
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        계속하기
      </button>
    </div>
  );
}

export default Question5;
