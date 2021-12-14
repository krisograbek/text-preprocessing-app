from flask import Flask, request
import re
import string
from nltk.corpus import wordnet as wn
from nltk import pos_tag
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from collections import defaultdict

app = Flask(__name__)

tag_map = defaultdict(lambda : wn.NOUN)
tag_map['V'] = wn.VERB
tag_map['J'] = wn.ADJ
tag_map['R'] = wn.ADV


def handle_normalization(text, operations):
    tokens = word_tokenize(text)
    
    if operations["lemmatize"]:
        lemmatizer = WordNetLemmatizer()
        lemmas = [lemmatizer.lemmatize(token, tag_map[tag[0]]) for token, tag in pos_tag(tokens)]
        text = " ".join(lemmas)


    return text

def handle_removal(text, operations):
    if operations["removeHTML"]:
        text = re.sub(r'<[^<]+?>', '', text)
    if operations["removePunctuation"]:
        text = text.translate(str.maketrans('', '', string.punctuation))
    if operations["removeNewlines"]:
        text = re.sub(r'\s+', ' ', text)
    if operations["removeNumbers"]:
        text = text.translate(str.maketrans('', '', string.digits))

    return text

def handle_operations(text, operations):
    if operations["lowercase"]:
        text = text.lower()

    # clean text
    text = handle_removal(text, operations)

    text = handle_normalization(text, operations)
    
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
