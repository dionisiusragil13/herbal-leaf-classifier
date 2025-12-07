import tensorflow as tf

def create_training_pipeline(dataset):
    data_augmentation = tf.keras.Sequential([
        tf.keras.layers.RandomRotation(0.2),
        tf.keras.layers.RandomTranslation(height_factor=0.2, width_factor=0.2),
        tf.keras.layers.RandomShear(0.2),
        tf.keras.layers.RandomZoom(0.2),
        tf.keras.layers.RandomFlip("horizontal"),
    ])

    return dataset.map(lambda x, y: (data_augmentation(x, training=True), y), num_parallel_calls=tf.data.AUTOTUNE)