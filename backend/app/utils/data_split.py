import tensorflow as tf

def split_data(params,data_dir):
    split_ratio = params.get("split",80)/100
    train_dataset = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        image_size=(224,224),
        batch_size=32,
        validation_split=split_ratio,
        subset="training",
        seed=42
    )

    val_dataset = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        image_size=(224,224),
        batch_size=32,
        validation_split=split_ratio,
        subset="validation",
        seed=42
    )
    
    return train_dataset, val_dataset