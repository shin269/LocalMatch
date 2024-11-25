import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Result({ answers }) {
  const navigate = useNavigate();

  // Flask로 데이터를 전송하는 함수
  const sendToBackend = async () => {
    try {
      // Flask 서버로 POST 요청 보내기
      const response = await axios.post('http://127.0.0.1:5000/api/submit-answers', answers);
      alert(`백엔드에 데이터 전송 성공: ${response.data.message}`);
    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('백엔드로 데이터 전송 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Poppins', sans-serif",
        color: '#ffffff',
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          color: '#4A90E2',
          fontWeight: 'bold',
          marginBottom: '40px',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        🎉 결과 페이지 🎉
      </h1>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
          padding: '30px',
          width: '90%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            marginBottom: '20px',
            color: '#333333',
            fontWeight: 'bold',
          }}
        >
          당신의 선택
        </h2>
        <ul
          style={{
            listStyleType: 'none',
            padding: '0',
            margin: '0',
            fontSize: '18px',
            color: '#555555',
            lineHeight: '1.8',
            textAlign: 'left',
          }}
        >
          <li>
            <span style={{ fontWeight: 'bold', color: '#4A90E2' }}>질문 1:</span>{' '}
            {answers.question1 || '응답 없음'}
          </li>
          <li>
            <span style={{ fontWeight: 'bold', color: '#4A90E2' }}>질문 2:</span>{' '}
            {answers.question2 || '응답 없음'}
          </li>
          <li>
            <span style={{ fontWeight: 'bold', color: '#4A90E2' }}>질문 3:</span>{' '}
            {answers.question3 || '응답 없음'}
          </li>
          <li>
            <span style={{ fontWeight: 'bold', color: '#4A90E2' }}>질문 4:</span>{' '}
            {answers.question4 || '응답 없음'}
          </li>
          <li>
            <span style={{ fontWeight: 'bold', color: '#4A90E2' }}>질문 5:</span>{' '}
            {answers.question5 || '응답 없음'}
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
        <button
          onClick={sendToBackend}
          style={{
            background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
            border: 'none',
            padding: '15px 50px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '30px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          📤 백엔드로 전송
        </button>

        <button
          onClick={() => navigate('/')} // Main.js로 이동
          style={{
            background: 'linear-gradient(45deg, #4A90E2, #357ABD)',
            border: 'none',
            padding: '15px 50px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '30px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(42, 121, 194, 0.4)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          🚀 처음으로 돌아가기 🚀
        </button>
      </div>
    </div>
  );
}

export default Result;
