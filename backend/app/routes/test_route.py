from flask import Blueprint, jsonify, request
from app.utils.predict import predict
from app.utils.preprocess import preprocess

test_bp = Blueprint("test",__name__)

@test_bp.route('/predict',methods=['POST'])
def test_predict():
    try:
        data = request.get_jsonify()
        target = preprocess(data)
        result = predict(target)
        return jsonify(result)
    except Exception as e:
        print(f"Unexpected error in /predict: {str(e)}")
        return jsonify({
            'error': 'Internal server error during training',
            'details': str(e)
        }), 500

@test_bp.route('/result', methods=['GET'])
def test_result():
    try:
        return
    except Exception as e:
        print(f"Unexpected error in /result: {str(e)}")
        return jsonify({
            'error': 'Internal server error during training',
            'details': str(e)
        }), 500