from tensorflow.keras import layers, Model
from tensorflow.keras.applications import MobileNetV2
import tensorflow as tf
from app.utils.attention_block import se_block

def training(params):
    learning_rate = params.get('learning-rate',0.01)
    optimizer = params.get('optimizer', 'RMSProp')

    if optimizer.lower() == 'rmsprop':
        optimizer = tf.keras.optimizers.RMSprop(learning_rate=learning_rate)
    elif optimizer.lower() == 'adam':
        optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)
    elif optimizer.lower() == 'sgd':
        optimizer = tf.keras.optimizers.SGD(learning_rate=learning_rate)
    else:
        optimizer = tf.keras.optimizers.RMSprop(learning_rate=learning_rate)
    
    base_model = MobileNetV2(
        input_shape=(224,224,3),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False
    
    inputs = layers.Input(shape=(224,224,3))
    x = base_model(inputs, training=False)
    x = se_block(x)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.2)(x)
    outputs = layers.Dense(10, activation='softmax')(x)
    
    model = Model(inputs=inputs, outputs=outputs)

    model.compile(
        optimizer=optimizer,
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    return model