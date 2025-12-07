from flask import Flask
from app.routes.train_route import train_bp
from app.routes.test_route import test_bp

# Create the app
def create_app():
    app = Flask(__name__)
    app.register_blueprint(train_bp, url_prefix='/api/train')
    app.register_blueprint(test_bp,url_prefix='/api/test')

    return app
