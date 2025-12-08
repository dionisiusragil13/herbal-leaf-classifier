import tensorflow as tf
from app.lib.state import test_state
from app.utils.list_model import list_saved_models
from datetime import datetime
import os

def load_models(model_name, models_dir="./app/models"):
    try:
        available_models = list_saved_models(models_dir)
        
        if not available_models:
            return {
                'success': False,
                'message': 'No models found in directory'
            }
        model_info = None
        for model in available_models:
            if model['name'] == model_name:
                model_info = model
                break
        
        if not model_info:
            return {
                'success': False,
                'message': f'Model "{model_name}" not found',
                'available_models': [m['name'] for m in available_models]
            }
        
        if not os.path.exists(model_info['path']):
            return {
                'success': False,
                'message': f'Model file not found at {model_info["path"]}'
            }
        
        print(f"Loading model from: {model_info['path']}")
        
        # Load the model
        model = tf.keras.models.load_model(model_info['path'])
        
        print(f"Model loaded successfully: {model_name}")
        
        # Update global test_state
        test_state['current_model'] = model
        test_state['model_name'] = model_info['name']
        test_state['model_path'] = model_info['path']
        test_state['loaded_at'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        test_state['model_format'] = model_info['format']
        
        return {
            'success': True,
            'message': f'Model "{model_name}" loaded successfully',
            'model_info': {
                'name': model_info['name'],
                'path': model_info['path'],
                'size_mb': model_info['size_mb'],
                'format': model_info['format'],
                'loaded_at': test_state['loaded_at']
            }
        }
        
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        import traceback
        traceback.print_exc()
        
        return {
            'success': False,
            'message': 'Failed to load model',
            'error': str(e)
        }