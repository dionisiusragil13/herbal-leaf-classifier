from flask import Blueprint, jsonify, request
from app.utils.train_model import training
from app.utils.data_split import split_data
from app.utils.pipeline import create_training_pipeline

train_bp = Blueprint("train",__name__)

@train_bp.route('/result',methods=['GET'])
def train_result():
    try:
        return
    except Exception as e:
        print(f"Unexpected error in /result: {str(e)}")
        return jsonify({
            'error': 'Internal server error during training',
            'details': str(e)
        }), 500
    
@train_bp.route('api/progress',methods=['GET'])
def progress():
    try:
        return
    except Exception as e:
        print(f"Unexpected error in /progress: {str(e)}")
        return jsonify({
            'error': 'Internal server error during training',
            'details': str(e)
        }), 500

@train_bp.route('/start',methods=['POST'])
def start():
    try:
        data_dir = "./app/dataset/train"
        data = request.get_json()

        train_dataset, val_dataset = split_data(data,
                data_dir=data_dir
            )
        train_dataset = create_training_pipeline(train_dataset)
        model = training(data)
        history = model.fit(
                train_dataset,
                validation_data=val_dataset,
                epochs=data.get('epochs'),
                verbose=1
            )
        final_val_acc = history.history['val_accuracy'][-1]
        best_val_acc = max(history.history['val_accuracy'])
            
            # Return JSON response
        return jsonify({
                'success': True,
                'results': {
                    'final_val_acc': final_val_acc,
                    'best_val_acc': best_val_acc,
                }
            })
    except Exception as e:
        print(f"Unexpected error in /train: {str(e)}")
        return jsonify({
            'error': 'Internal server error during training',
            'details': str(e)
        }), 500