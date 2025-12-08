import numpy as np
import tensorflow as tf 
from tensorflow.keras.preprocessing.image import load_img, img_to_array

def model_predict(image_path, model, class_names):
    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    pred = model.predict(img_array)[0]

    predicted_class_index = np.argmax(pred)
    predicted_class = class_names[predicted_class_index]
    confidence = float(np.max(pred)) * 100

    return predicted_class, confidence