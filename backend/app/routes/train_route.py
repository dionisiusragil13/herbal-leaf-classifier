from flask import Blueprint, jsonify
from app.utils.training import training

train_bp = Blueprint("train",__name__)

@train_bp.route('/api/train',methods=['POST'])
def train():
    return
@train_bp.route('api/progress',methods=['GET'])
def progress():
    training()
    return