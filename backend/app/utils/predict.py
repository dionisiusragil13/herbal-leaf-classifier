from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array
import io
import numpy as np

def model_predict(image_bytes, model, class_names):
    img = load_img(io.BytesIO(image_bytes), target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    
    pred = model.predict(img_array)[0]
    predicted_class_index = np.argmax(pred)
    
    predicted_class = class_names[predicted_class_index]
    confidence = float(np.max(pred)) * 100

    return predicted_class, confidence
