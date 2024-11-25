import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Question1 from './pages/question_1';
import Question2 from './pages/question_2';
import Question3 from './pages/question_3';
import Question4 from './pages/question_4';
import Question5 from './pages/question_5';
import Result from './pages/Result';

function App() {
  const [answers, setAnswers] = useState({
    question1: '', // Question1에서 선택한 값을 저장
    question2: '', // Question2에서 선택한 값을 저장
    question3: '', // Question3에서 선택한 값을 저장
    question4: '', // Question4에서 선택한 값을 저장
    question5: '', // Question5에서 선택한 값을 저장
  });

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/question_1"
            element={
              <Question1
                onAnswerChange={(value) => handleAnswerChange('question1', value)}
              />
            }
          />
          <Route
            path="/question_2"
            element={
              <Question2
                onAnswerChange={(value) => handleAnswerChange('question2', value)}
              />
            }
          />
          <Route
            path="/question_3"
            element={
              <Question3
                onAnswerChange={(value) => handleAnswerChange('question3', value)}
              />
            }
          />
          <Route
            path="/question_4"
            element={
              <Question4
                onAnswerChange={(value) => handleAnswerChange('question4', value)}
              />
            }
          />
          <Route
            path="/question_5"
            element={
              <Question5
                onAnswerChange={(value) => handleAnswerChange('question5', value)}
              />
            }
          />
          <Route path="/Result" element={<Result answers={answers} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
