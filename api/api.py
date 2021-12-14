from flask import Flask, request
import re
import string
from nltk.corpus import wordnet as wn
from nltk import pos_tag
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer, PorterStemmer
from collections import defaultdict
import unidecode

app = Flask(__name__)

tag_map = defaultdict(lambda : wn.NOUN)
tag_map['V'] = wn.VERB
tag_map['J'] = wn.ADJ
tag_map['R'] = wn.ADV


def handle_reducer(text, reducer):
    tokens = word_tokenize(text)


    print("Begin")
    print(text)
    
    if reducer == "lemmatization":
        lemmatizer = WordNetLemmatizer()
        lemmas = [lemmatizer.lemmatize(token, tag_map[tag[0]]) for token, tag in pos_tag(tokens)]
        text = " ".join(lemmas)

    elif reducer == "porterStemmer":
        ps = PorterStemmer()
        stemms = [ps.stem(w) for w in tokens]
        text = " ".join(stemms)

    print("End")
    print(text)

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
    if operations["accented"]:
        text = unidecode.unidecode(text)

    # clean text
    text = handle_removal(text, operations)
    
    return text


@app.route('/api/preprocess', methods = ["POST"])
def get_text_and_functions():
    req_data = request.get_json()
    operations = req_data["operations"]
    reducer = req_data["reducer"]
    print("Operations: ", operations)
    input_text = req_data["text"]
    output_text = handle_operations(input_text, operations)
    print("Reducers", reducer)
    if reducer != "None":
        output_text = handle_reducer(output_text, reducer)
    print(output_text)
    return {'text': output_text}
