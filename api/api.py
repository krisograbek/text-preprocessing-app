from flask import Flask


app = Flask(__name__)

@app.route('/api/preprocess')
def get_val():
    return {'value': 'some other value'}
