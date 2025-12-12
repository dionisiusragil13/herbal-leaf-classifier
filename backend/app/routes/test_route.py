from flask import Blueprint, jsonify, request
from app.utils.predict import model_predict
from app.config import class_names
from app.utils.list_model import list_saved_models
from app.utils.load_model import load_models
from app.lib.state import test_state
from app.utils.image_format import allowed_file

test_bp = Blueprint("test",__name__)

@test_bp.route('/predict',methods=['POST'])
def test_predict():
    try:
        image = request.files['image']
        if not image:
            return jsonify({
                'success':False,
                'message':'please input an image'
            })
        if not allowed_file(image.filename):
            return jsonify({
                'success':False,
                'messages':'image format should be JPG/PNG/JPEG'
            })

        model = test_state['current_model']
        if not model:
            return jsonify({
                'success':False,
                'message':'please select a model'
            })
        
        img_bytes = image.read()
        result = model_predict(img_bytes,model,class_names)

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
    
@test_bp.route('/load_model',methods=['POST'])
def load_model():
    try:
        data = request.get_json()
        
        if not data or 'model_name' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required parameter: model_name'
            }), 400
        
        model_name = data['model_name']
        models_dir = "./app/model"

        result = load_models(model_name, models_dir)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 404
            
    except Exception as e:
        print(f"Error in /load-model: {str(e)}")
        import traceback
        traceback.print_exc()
        
        return jsonify({
            'success': False,
            'error': 'Failed to load model',
            'details': str(e)
        }), 500