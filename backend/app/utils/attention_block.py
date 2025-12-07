from tensorflow.keras import layers
import tensorflow as tf

def se_block(input_tensor, ratio=16):
    channel_axis = -1
    channels = input_tensor.shape[channel_axis]

    se_features = layers.GlobalAveragePooling2D()(input_tensor)
    se_features = layers.Reshape((1, 1, channels))(se_features) 
    se_features = layers.Dense(channels // ratio, activation='relu', kernel_initializer='he_normal', use_bias=False)(se_features)
    se_features = layers.Dense(channels, activation='sigmoid', kernel_initializer='he_normal', use_bias=False)(se_features)

    output_tensor = layers.multiply([input_tensor, se_features])
    return output_tensor