from flask import Flask, jsonify, request
from flask_cors import CORS  # CORS 모듈 추가
from pyspark.sql import SparkSession
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.clustering import KMeans
from pyspark.ml.feature import StandardScaler
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, FloatType

# Flask 앱 생성
app = Flask(__name__)

# CORS 설정
CORS(app)  # 모든 경로에 대해 CORS 설정, 특정 경로만 허용하고 싶다면 resources={r"/recommendation": {"origins": "*"}} 추가 가능

# Spark 세션 설정
spark = SparkSession.builder.appName("SeoulRecommendation").getOrCreate()

# 데이터 스키마 정의 (schema1, schema2는 그대로 사용)
schema1 = StructType([
    StructField("gu", StringType(), True),
    StructField("dong", StringType(), True),
    StructField("singlePersonNum", IntegerType(), True),
    StructField("singlePersonRatio", FloatType(), True),
    StructField("기준_년분기_코드", StringType(), True),
    StructField("행정동_코드", StringType(), True),
    StructField("집객시설_수", IntegerType(), True),
    StructField("관공서_수", FloatType(), True),
    StructField("은행_수", FloatType(), True),
    StructField("종합병원_수", FloatType(), True),
    StructField("일반_병원_수", FloatType(), True),
    StructField("약국_수", FloatType(), True),
    StructField("유치원_수", IntegerType(), True),
    StructField("초등학교_수", IntegerType(), True),
    StructField("중학교_수", IntegerType(), True),
    StructField("고등학교_수", IntegerType(), True),
    StructField("대학교_수", FloatType(), True),
    StructField("백화점_수", FloatType(), True),
    StructField("슈퍼마켓_수", FloatType(), True),
    StructField("극장_수", FloatType(), True),
    StructField("숙박_시설_수", FloatType(), True),
    StructField("공항_수", FloatType(), True),
    StructField("철도_역_수", FloatType(), True),
    StructField("버스_터미널_수", FloatType(), True),
    StructField("지하철_역_수", FloatType(), True),
    StructField("버스_정거장_수", FloatType(), True),
    StructField("AvgWorkPop", FloatType(), True),
    StructField("보증금(만원)_전세", FloatType(), True),
    StructField("임대료(만원)_전세", FloatType(), True),
    StructField("임대면적_전세", FloatType(), True),
    StructField("보증금(만원)_월세", FloatType(), True),
    StructField("임대료(만원)_월세", FloatType(), True),
    StructField("임대면적_월세", FloatType(), True)
])

schema2 = StructType([
    StructField("대지위치", StringType(), True),
    StructField("cctvNum", IntegerType(), True),
    StructField("교통사고", IntegerType(), True),
    StructField("화재", IntegerType(), True),
    StructField("범죄", IntegerType(), True),
    StructField("생활안전", IntegerType(), True),
    StructField("자살", IntegerType(), True),
    StructField("감염병", IntegerType(), True),
    StructField("호수", IntegerType(), True)
])

# 기본 경로 설정 (index)
@app.route('/')
def index():
    return "Welcome to the Seoul Recommendation System!"

# 추천 경로 처리 (POST 요청)
@app.route('/recommendation', methods=['POST'])
def recommendation():
    print("POST 요청을 받았습니다!")  # 요청을 받았을 때 로그 출력

    user_data = request.get_json()

    # 사용자로부터 입력받은 데이터
    price = user_data['price']  # 가격 기준
    convenience = user_data['convenience']  # 집객시설 기준
    culture = user_data['culture']  # 문화시설 기준
    traffic = user_data['traffic']  # 교통 기준
    safety = user_data['safety']  # 안전 기준

    # 데이터 로딩
    df1 = spark.read.csv("data1.csv", header=True, schema=schema1)
    df2 = spark.read.csv("data2.csv", header=True, schema=schema2)

    # 결측값 처리
    df1 = df1.fillna(0)
    df2 = df2.fillna(0)

    # 데이터 조인
    df_joined = df1.join(df2, df1["gu"] == df2["대지위치"], "inner")

    # 필터링: 가격 조건에 맞는 데이터만 남김
    df_filtered = df_joined.filter(
        (df_joined['임대료(만원)_월세'] <= price * 100) | 
        (df_joined['보증금(만원)_전세'] <= price * 100)
    )

    # 특성 벡터화
    numerical_cols = [
        'singlePersonNum', 'singlePersonRatio', '집객시설_수', '관공서_수', '은행_수',
        '종합병원_수', '일반_병원_수', '약국_수', '유치원_수', '초등학교_수', '중학교_수', 
        '고등학교_수', '대학교_수', '백화점_수', '슈퍼마켓_수', '극장_수', '숙박_시설_수', 
        '공항_수', '철도_역_수', '버스_터미널_수', '지하철_역_수', '버스_정거장_수', 'AvgWorkPop', 
        '보증금(만원)_전세', '임대료(만원)_전세', '임대면적_전세', '보증금(만원)_월세', 
        '임대료(만원)_월세', '임대면적_월세'
    ]
    assembler = VectorAssembler(inputCols=numerical_cols, outputCol="features")
    df_transformed = assembler.transform(df_filtered)

    # 표준화
    scaler = StandardScaler(inputCol="features", outputCol="scaled_features")
    scaler_model = scaler.fit(df_transformed)
    df_scaled = scaler_model.transform(df_transformed)

    # KMeans 클러스터링
    kmeans = KMeans(k=4, seed=42, featuresCol="scaled_features", predictionCol="cluster")
    model = kmeans.fit(df_scaled)
    df_with_clusters = model.transform(df_scaled)

    # 각 지표별 점수 계산
    price_score = (df_with_clusters['임대료(만원)_월세'] * price + 
                   df_with_clusters['보증금(만원)_전세'] * price)

    convenience_score = (df_with_clusters['백화점_수'] * convenience + 
                         df_with_clusters['극장_수'] * convenience + 
                         df_with_clusters['숙박_시설_수'] * convenience + 
                         df_with_clusters['슈퍼마켓_수'] * convenience)

    safety_score = (df_with_clusters['범죄'] * safety + 
                    df_with_clusters['교통사고'] * safety + 
                    df_with_clusters['화재'] * safety + 
                    df_with_clusters['자살'] * safety)

    culture_score = (df_with_clusters['극장_수'] * culture + 
                     df_with_clusters['백화점_수'] * culture + 
                     df_with_clusters['숙박_시설_수'] * culture + 
                     df_with_clusters['슈퍼마켓_수'] * culture)

    # 총 점수 계산
    df_with_scores = df_with_clusters.withColumn(
        "score", 
        (price_score + convenience_score + safety_score + culture_score)
    )

    # 상위 3개 추천 지역
    top_3 = df_with_scores.orderBy("score", ascending=False).limit(3)

    result = top_3.select("gu", "dong", "score").collect()
    response = [{"gu": row["gu"], "dong": row["dong"], "score": row["score"]} for row in result]
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
