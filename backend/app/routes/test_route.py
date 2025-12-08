from flask import Blueprint, jsonify, request
from app.utils.predict import model_predict
from app.config import ALLOWED_EXTENSIONS, CURRENT_MODEL, class_names
from app.utils.list_model import list_saved_models

test_bp = Blueprint("test",__name__)

@test_bp.route('/predict',methods=['POST'])
def test_predict():
    try:
        image = request.files['image']
        model = request.form['models']
        result = model_predict(image,model,class_names)

        return jsonify({
            'success':True,
            'confidence': result[1],
            'class':result[0]
        })
    except Exception as e:
        print(f"Unexpected error in /predict: {str(e)}")
        return jsonify({
            'error': 'Internal server error during training',
            'details': str(e)
        }), 500

@test_bp.route('/models',methods=['GET'])
def models():
    try:
        models = list_saved_models()

        if not models:
            return jsonify({
                'success':False,
                'models':[],
                'total':0,
                'message':'models not found'
            })
        
        return jsonify({
            'success':True,
            'model':models,
            'total':len(models)
        })
    
    except Exception as e:
        print(f"unexpected error in /models: {str(e)}")
        return jsonify({
            'error':"internal server error",
            'detail':str(e)
        })
    
@test_bp.route('/load_model',methods=['GET'])
def load_model():
    try:
        model = request.form('model_file')
        return
    except Exception as e:
        return jsonify({
            'error':"error in the server",
            'message':str(e)
        })