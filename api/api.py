from flask import Flask, request
from text_helpers import handle_operations, handle_reducer

app = Flask(__name__)

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
