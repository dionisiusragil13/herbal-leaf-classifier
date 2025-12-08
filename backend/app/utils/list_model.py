import os
from datetime import datetime


def list_saved_models(models_dir="./app/model"):

    if not os.path.exists(models_dir):
        os.makedirs(models_dir)
        return []
    
    models = []
    
    for filename in os.listdir(models_dir):

        if filename.endswith('.h5') or filename.endswith('.keras'):
            file_path = os.path.join(models_dir, filename)
            
            file_stats = os.stat(file_path)
            file_size_mb = file_stats.st_size / (1024 * 1024)
            modified_timestamp = file_stats.st_mtime
            modified_date = datetime.fromtimestamp(modified_timestamp)
            model_name = os.path.splitext(filename)[0]
            file_extension = os.path.splitext(filename)[1][1:]
            
            models.append({
                'name': model_name,
                'filename': filename,
                'path': file_path,
                'size_mb': round(file_size_mb, 2),
                'created_at': modified_date.strftime('%Y-%m-%d %H:%M:%S'),
                'format': file_extension
            })
    
    models.sort(key=lambda x: x['created_at'], reverse=True)
    
    return models