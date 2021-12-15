from flask import Flask, request
import re
import string
from nltk.corpus import wordnet as wn
from nltk.corpus import stopwords
from nltk import pos_tag
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer, PorterStemmer, SnowballStemmer
from collections import defaultdict
import unidecode

app = Flask(__name__)

tag_map = defaultdict(lambda : wn.NOUN)
tag_map['V'] = wn.VERB
tag_map['J'] = wn.ADJ
tag_map['R'] = wn.ADV



def handle_reducer(text, reducer):
    tokens = word_tokenize(text)

    if reducer == "lemmatization":
        lemmatizer = WordNetLemmatizer()
        lemmas = [lemmatizer.lemmatize(token, tag_map[tag[0]]) for token, tag in pos_tag(tokens)]
        text = " ".join(lemmas)

    elif reducer == "porterStemmer":
        ps = PorterStemmer()
        stemms = [ps.stem(w) for w in tokens]
        text = " ".join(stemms)

    elif reducer == "snowballStemmer":
        sno = SnowballStemmer('english')
        stemms = [sno.stem(w) for w in tokens]
        text = " ".join(stemms)

    return text

def remove_emojis(text):
    emojis_pattern = re.compile(pattern="["
                    u"\U0001F600-\U0001F64F"  # emoticons
                    u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                    u"\U0001F680-\U0001F6FF"  # transport & map symbols
                    u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                    u"\U00002500-\U00002BEF"  # chinese char
                    u"\U00002702-\U000027B0"
                    u"\U00002702-\U000027B0"
                    u"\U000024C2-\U0001F251"
                    u"\U0001f926-\U0001f937"
                    u"\U00010000-\U0010ffff"
                    u"\u2640-\u2642"
                    u"\u2600-\u2B55"
                    u"\u200d"
                    u"\u23cf"
                    u"\u23e9"
                    u"\u231a"
                    u"\ufe0f"  # dingbats
                    u"\u3030"
                "]+", flags = re.UNICODE)

    text = emojis_pattern.sub(r'', text)
    return text

def remove_stopwords(text):
    stop_words = stopwords.words('english')
    tokens = word_tokenize(text)
    filtered = [w for w in tokens if w.lower() not in stop_words]
    text = " ".join(filtered)

    return text

def correct_spelling(text):
    from autocorrect import Speller
    speller = Speller(lang='en')
    text = speller(text)

    return text

def handle_removal(text, operations):
    if operations["removeHTML"]:
        text = re.sub(r'<[^<]+?>', '', text)
    
    if operations["removeNewlines"]:
        text = re.sub(r'\s+', ' ', text)

    if operations["removeNumbers"]:
        text = text.translate(str.maketrans('', '', string.digits))

    if operations["removeEmojis"]:
        text = remove_emojis(text)
    
    if operations["removeUrls"]:
        text = re.sub(r'http\S+', '', text)
    
    if operations["spellcheck"]:
        text = correct_spelling(text)

    if operations["removeStopwords"]:
        text = remove_stopwords(text)

    if operations["removePunctuation"]:
        text = text.translate(str.maketrans('', '', string.punctuation))
    
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
