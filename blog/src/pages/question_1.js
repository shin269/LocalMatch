import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catsImage from '../images/price.png'; // 이미지 파일 import

function Question1({ onAnswerChange }) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onAnswerChange(value); // 선택한 값을 상위(App.js)로 전달
  };

  const handleNext = () => {
    if (selectedValue) {
      navigate('/question_2'); // 선택된 값이 있으면 다음 페이지로 이동
    } else {
      alert('값을 선택해주세요!'); // 값이 선택되지 않은 경우 경고 메시지
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#e6f2ff', // 연한 하늘색 배경
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center', // 가운데 정렬
        alignItems: 'center',
        position: 'relative', // "안녕하세요" 위치 설정을 위한 기준
        padding: '0', // 불필요한 패딩 제거
      }}
    >
      {/* 흰색 카드 위쪽 "안녕하세요" */}
      <h2
        style={{
          position: 'absolute',
          top: '1%', // 글자를 더 위로 올림
          fontSize: '48px', // 글자 크기
          color: '#6CA0DC', // "계속하기" 버튼과 동일한 색상
          fontWeight: 'bold', // 두껍게 설정
          textAlign: 'center', // 텍스트 중앙 정렬
        }}
      >
        #질문 1.
      </h2>

      {/* 흰색 카드 박스 */}
      <div
        style={{
          backgroundColor: '#ffffff', // 흰색 배경
          width: '80%',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // 부드러운 그림자 효과
          display: 'flex',
          overflow: 'hidden',
          height: '500px', // 세로 길이 증가
        }}
      >
        {/* 왼쪽 이미지 */}
        <div
          style={{
            flex: 1,
            backgroundImage: `url(${catsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* 오른쪽 선택 섹션 */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f5f8fc',
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
            #1. 해당 지역의 가격(집값, 생활비 등)이 얼마나 중요한가요?
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
                  transition: 'transform 0.2s, background-color 0.2s, box-shadow 0.2s', // 부드러운 효과
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e6f7ff'; // 호버 시 밝은 파랑색 배경
                  e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)'; // 약간의 그림자
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff'; // 기본 흰색 배경으로 복원
                  e.target.style.boxShadow = 'none';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'scale(0.95)'; // 클릭 시 살짝 작아짐
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'scale(1)'; // 기본 크기로 복원
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
                    accentColor: '#6CA0DC', // 체크 색상
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

      {/* 메인 버튼 */}
      <button
        onClick={() => navigate('/')}
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
          e.target.style.backgroundColor = '#ffd633'; // 호버 시 더 밝아짐
          e.target.style.transform = 'scale(1.1)'; // 살짝 확대
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#ffcc00'; // 원래 색상 복원
          e.target.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)'; // 클릭 시 살짝 작아짐
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        처음으로..
      </button>

      {/* 계속하기 버튼 */}
      <button
        onClick={handleNext}
        style={{
          position: 'absolute', // 부모 요소 기준으로 위치 설정
          bottom: '30px', // 화면 하단에서 살짝 위로 이동
          left: '50%', // 화면 가로 중앙
          transform: 'translateX(-50%)', // 버튼 자체 너비 기준으로 중앙 정렬
          backgroundColor: '#6CA0DC', // 밝은 파랑색
          border: 'none',
          padding: '18px 80px', // 버튼 크기 조정
          fontSize: '20px',
          fontWeight: 'bold',
          borderRadius: '10px',
          color: 'white', // 텍스트 색상
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // 버튼에 그림자 효과
          transition: 'transform 0.2s, background-color 0.2s', // 부드러운 효과 추가
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#4682B4'; // 호버 시 더 짙은 파랑
          e.target.style.transform = 'scale(1.1)'; // 살짝 확대
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#6CA0DC'; // 기본 색상 복원
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

        {/* 다음 버튼 */}
        <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '20px',
          backgroundColor: '#32CD32', // 초록색 버튼
          border: 'none',
          padding: '15px 30px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '10px',
          color: 'white',
          cursor: 'pointer',
          transition: 'transform 0.2s, background-color 0.2s', // 부드러운 효과 추가
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#228B22'; // 호버 시 짙은 초록색
          e.target.style.transform = 'scale(1.1)'; // 살짝 확대
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#32CD32'; // 기본 색상 복원
          e.target.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)'; // 클릭 시 살짝 작아짐
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        다음
      </button>
    </div>
  );
}

export default Question1;
