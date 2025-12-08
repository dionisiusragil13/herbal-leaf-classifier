from tensorflow import keras
from app.utils.training_state import training_state


class ProgressCallback(keras.callbacks.Callback):
    def __init__(self, total_epochs):
        super().__init__()
        self.total_epochs = total_epochs
    
    def on_epoch_begin(self, epoch, logs=None):
        training_state['current_epoch'] = epoch + 1
        training_state['current_batch'] = 0
    
    def on_batch_end(self, batch, logs=None):
        training_state['current_batch'] = batch + 1
        if hasattr(self.params, 'steps'):
            training_state['total_batches'] = self.params['steps']
            epoch_progress = (batch + 1) / self.params['steps']
            total_progress = ((self.current_epoch - 1) + epoch_progress) / self.total_epochs
            training_state['progress'] = int(total_progress * 100)
    
    def on_epoch_end(self, epoch, logs=None):
        training_state['current_epoch'] = epoch + 1
        training_state['progress'] = int(((epoch + 1) / self.total_epochs) * 100)
        training_state['loss'] = float(logs.get('loss', 0))
        training_state['accuracy'] = float(logs.get('accuracy', 0))
        training_state['val_loss'] = float(logs.get('val_loss', 0)) if 'val_loss' in logs else None
        training_state['val_accuracy'] = float(logs.get('val_accuracy', 0)) if 'val_accuracy' in logs else None
        
        training_state['history'].append({
            'epoch': epoch + 1,
            'loss': training_state['loss'],
            'accuracy': training_state['accuracy'],
            'val_loss': training_state['val_loss'],
            'val_accuracy': training_state['val_accuracy']
        })