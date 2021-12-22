import time
from flask import Flask, request
from text_helpers import handle_operations, handle_reducer


# basic flask app
# app = Flask(__name__)

# flask app serving static html files
app = Flask(__name__, static_folder="./client", static_url_path="/")

# add default file to read
# we can get rid of index.html from
# https://localhost:5000/index.html
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/preprocess', methods = ["POST"])
def get_text_and_functions():
    req_data = request.get_json()
    operations = req_data["operations"]
    reducer = req_data["reducer"]
    # print("Operations: ", operations)
    input_text = req_data["text"]
    output_text = handle_operations(input_text, operations)
    # print("Reducers", reducer)
    if reducer != "None":
        output_text = handle_reducer(output_text, reducer)
    # print(output_text)
    return {'text': output_text}


@app.route('/api/time')
def get_time():
    return {"time": time.time()}
