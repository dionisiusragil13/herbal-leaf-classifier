from app import create_app

app = create_app()  # This creates ALL blueprints
app.run(port=5000)