class_names = ['Belimbing Wuluh', 'Jambu Biji', 'Jeruk Nipis', 'Kemangi', 'Lidah Buaya', 'Nangka', 'Pandan', 'Pepaya', 'Seledri', 'Sirih']

training_state = {
    'is_training': False,
    'progress': 0,
    'current_epoch': 0,
    'total_epochs': 0,
    'current_batch': 0,
    'total_batches': 0,
    'loss': None,
    'accuracy': None,
    'val_loss': None,
    'val_accuracy': None,
    'status': 'idle',
    'history': [],
    'error': None,
    'final_results': None
}

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

CURRENT_MODEL = ""