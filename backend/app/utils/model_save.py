import os
import tensorflow as tf

def save_trained_model(model, model_name="herbal_model"):

    model_dir = "app/model"
    os.makedirs(model_dir, exist_ok=True)

    if not model_name.endswith('.h5'):
        model_name = model_name + '.h5'

    filepath = os.path.join(model_dir, model_name)
    model.save(filepath)
    print(f"Model disimpan di: {filepath}")
    
    return filepath