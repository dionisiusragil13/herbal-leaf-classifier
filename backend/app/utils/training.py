import tensorflow as tf
from app.utils.training_state import training_state
from app.utils.training_callbacks import ProgressCallback
from app.utils.data_split import split_data
from app.utils.pipeline import create_training_pipeline
from app.utils.train_model import training
from app.utils.model_save import save_trained_model


def train_in_background(data, data_dir):
    try:
        # Extract parameters from data
        optimizer = data.get('optimizer', 'adam')
        learning_rate = data.get('learning_rate', 0.001)
        epochs = data.get('epochs', 10)
        
        training_state['status'] = 'preparing_data'
        
        if optimizer.lower() == 'rmsprop':
            optimizer = tf.keras.optimizers.RMSprop(learning_rate=learning_rate)
        elif optimizer.lower() == 'adam':
            optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)
        elif optimizer.lower() == 'sgd':
            optimizer = tf.keras.optimizers.SGD(learning_rate=learning_rate)
        else:
            optimizer = tf.keras.optimizers.RMSprop(learning_rate=learning_rate)
        train_dataset, val_dataset = split_data(
            params=data,
            data_dir=data_dir
        )
        
        training_state['status'] = 'preprocessing'
        train_dataset = create_training_pipeline(train_dataset)
        
        training_state['status'] = 'building_model'
        model = training(data)
        
        training_state['status'] = 'training'
        training_state['total_epochs'] = epochs
        
        history = model.fit(
            train_dataset,
            validation_data=val_dataset,
            epochs=epochs,
            callbacks=[ProgressCallback(epochs)],
            verbose=1
        )
        
        training_state['status'] = 'saving_model'
        
        final_val_acc = history.history['val_accuracy'][-1]
        best_val_acc = max(history.history['val_accuracy'])
        
        model_name = data.get('model_name', 'herbal_model')
        model_path = save_trained_model(model, model_name)
        
        training_state['final_results'] = {
            'success': True,
            'results': {
                'final_val_acc': float(final_val_acc),
                'best_val_acc': float(best_val_acc),
            },
            'model_saved': {
                'path': model_path,
                'name': model_name
            }
        }
        
        training_state['status'] = 'completed'
        training_state['is_training'] = False
        training_state['progress'] = 100
        
    except Exception as e:
        print(f"Error during training: {str(e)}")
        training_state['status'] = 'error'
        training_state['error'] = str(e)
        training_state['is_training'] = False
