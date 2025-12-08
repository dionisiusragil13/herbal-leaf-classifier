from flask import Blueprint, jsonify, request
#from app.utils.train_model import training
#from app.utils.data_split import split_data
#from app.utils.pipeline import create_training_pipeline
#from app.utils.model_save import save_trained_model
import threading
from app.utils.training_state import training_state
from app.utils.training import train_in_background

train_bp = Blueprint("train",__name__)

@train_bp.route('/result', methods=['GET'])
def get_result():
    if training_state['status'] != 'completed':
        return jsonify({
            'success': False,
            'message': f"Training not completed. Current status: {training_state['status']}",
            'current_progress': training_state['progress']
        }), 400
    
    if training_state['final_results'] is None:
        return jsonify({
            'success': False,
            'message': 'No results available'
        }), 404
    
    response = training_state['final_results'].copy()
    response['history'] = training_state['history']
    
    return jsonify(response)


@train_bp.route('/reset', methods=['POST'])
def reset_training():
    """Reset training state"""
    
    if training_state['is_training']:
        return jsonify({
            'success': False,
            'message': 'Cannot reset while training is in progress'
        }), 400
    
    training_state['is_training'] = False
    training_state['progress'] = 0
    training_state['current_epoch'] = 0
    training_state['total_epochs'] = 0
    training_state['current_batch'] = 0
    training_state['total_batches'] = 0
    training_state['loss'] = None
    training_state['accuracy'] = None
    training_state['val_loss'] = None
    training_state['val_accuracy'] = None
    training_state['status'] = 'idle'
    training_state['history'] = []
    training_state['error'] = None
    training_state['final_results'] = None
    
    return jsonify({
        'success': True,
        'message': 'Training state reset'
    })

@train_bp.route('/start', methods=['POST'])
def start():
    if training_state['is_training']:
        return jsonify({
            'success': False,
            'message': 'Training is already in progress'
        }), 400
    
    try:
        data_dir = "./app/dataset/train"
        data = request.get_json()
        
        required_params = ['optimizer', 'learning_rate', 'epochs', 'split_data']
        missing_params = [p for p in required_params if p not in data]
        
        if missing_params:
            return jsonify({
                'success': False,
                'error': f'Missing required parameters: {", ".join(missing_params)}'
            }), 400
        
        training_state['is_training'] = True
        training_state['progress'] = 0
        training_state['current_epoch'] = 0
        training_state['total_epochs'] = data.get('epochs', 10)
        training_state['current_batch'] = 0
        training_state['total_batches'] = 0
        training_state['loss'] = None
        training_state['accuracy'] = None
        training_state['val_loss'] = None
        training_state['val_accuracy'] = None
        training_state['status'] = 'starting'
        training_state['history'] = []
        training_state['error'] = None
        training_state['final_results'] = None
        
        thread = threading.Thread(target=train_in_background, args=(data, data_dir))
        thread.daemon = True
        thread.start()
        
        return jsonify({
            'success': True,
            'message': 'Training started',
            'config': {
                'optimizer': data.get('optimizer'),
                'learning_rate': data.get('learning_rate'),
                'epochs': data.get('epochs'),
                'split_data': data.get('split_data'),
                'model_name': data.get('model_name', 'herbal_model')
            }
        })
        
    except Exception as e:
        print(f"Unexpected error in /start: {str(e)}")
        training_state['is_training'] = False
        training_state['status'] = 'error'
        training_state['error'] = str(e)
        return jsonify({
            'error': 'Internal server error during training',
            'details': str(e)
        }), 500


@train_bp.route('/progress', methods=['GET'])
def progress():
    return jsonify({
        'is_training': training_state['is_training'],
        'status': training_state['status'],
        'progress': training_state['progress'],
        'current_epoch': training_state['current_epoch'],
        'total_epochs': training_state['total_epochs'],
        'current_batch': training_state['current_batch'],
        'total_batches': training_state['total_batches'],
        'metrics': {
            'loss': training_state['loss'],
            'accuracy': training_state['accuracy'],
            'val_loss': training_state['val_loss'],
            'val_accuracy': training_state['val_accuracy']
        },
        'error': training_state['error']
    })