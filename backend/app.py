from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # React와의 CORS 문제 해결

@app.route('/')
def home():
    return "Flask 서버가 실행 중입니다!"

@app.route('/api/submit-answers', methods=['GET', 'POST'])
def submit_answers():
    if request.method == 'POST':
        # React에서 보낸 JSON 데이터 받기
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        # 데이터를 출력 (터미널에서 확인 가능)
        print("Received answers:", data)

        # 성공 메시지 반환
        return jsonify({"success": True, "message": "Answers received successfully"}), 200

    # GET 요청 처리 (브라우저에서 접속 시 안내 메시지 표시)
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Flask API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 50px;
            }
            h1 {
                color: #4A90E2;
            }
            p {
                color: #555;
            }
        </style>
    </head>
    <body>
        <h1>📋 Flask API</h1>
        <p>이 API는 POST 요청으로 데이터를 처리합니다.</p>
        <p>React에서 데이터를 전송하면 처리 결과를 반환합니다.</p>
    </body>
    </html>
    """
    return render_template_string(html_template)

if __name__ == '__main__':
    app.run(debug=True)
