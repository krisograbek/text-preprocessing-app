from flask import Flask, request
import re
import string


app = Flask(__name__)


def handle_operations(text, operations):
    if operations["lowercase"]:
        text = text.lower()
    if operations["lowercase"]:
        text = text.lower()
    return text


@app.route('/api/preprocess', methods = ["POST"])
def get_text_and_functions():
    req_data = request.get_json()
    operations = req_data["operations"]
    print("Operations: ", operations)
    input_text = req_data["text"]
    output_text = handle_operations(input_text, operations)
    print(output_text)
    return {'text': output_text}
