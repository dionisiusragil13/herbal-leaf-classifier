from flask import Flask
from app.routes.train_route import train_bp

# Create the app
def create_app():
    app = Flask(__name__)
    app.register_blueprint(train_bp, url_prefix='/api/train')

    return app

# That's it! Nothing else needed.