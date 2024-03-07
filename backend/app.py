import nltk
nltk.download('stopwords')
nltk.download('wordnet')

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib as joblib
import pickle
from flask import Flask, render_template,request,redirect,session
import os
import joblib
import pandas as pd
import re
import numpy as np
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from bs4 import BeautifulSoup

# Your TfidfVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf_vectorizer3 = TfidfVectorizer(stop_words='english', max_df=0.8, ngram_range=(1,3))

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

MODEL_PATH = 'passmodel.pkl'

TOKENIZER_PATH ='tfidfvectorizer.pkl'

DATA_PATH ='cleaned_data.csv'

SENTIMENT_TOKENIZER_PATH = 'sentimentvectorizer.pkl'

SENTIMENT_MODEL_PATH = 'passmodelSentiment.pkl'

# loading vectorizer
vectorizer = joblib.load(TOKENIZER_PATH)
# loading model
model = joblib.load(MODEL_PATH)
# loading sentiment vectorizer
sentiment_vectorizer = joblib.load(SENTIMENT_TOKENIZER_PATH)
# loading sentiment model
sentiment_model = joblib.load(SENTIMENT_MODEL_PATH)

#getting stopwords
stop = stopwords.words('english')
lemmatizer = WordNetLemmatizer()

@app.route('/', methods=['GET', 'POST'])
def handle_prediction():
    if request.method == 'GET':
        return jsonify({'message': 'Send a POST request with the form data to get predictions.'})
    
    comment = request.form.get('comment')
    #print(comment)
    if comment != "":
        clean_text = cleanText(comment)
        clean_lst = [clean_text]
        tfidf_vect = vectorizer.transform(clean_lst)
        tfidf_vect_sentiment = sentiment_vectorizer.transform(clean_lst)
        prediction = model.predict(tfidf_vect)
        sentiment_prediction = sentiment_model.predict(tfidf_vect_sentiment)

        if prediction is not None and not any(x == 'None' for x in prediction):
            if sentiment_prediction is not None and not any(y == 'None' for y in sentiment_prediction):
                predicted_cond = prediction[0]
                predicted_sent = int(sentiment_prediction[0].item())
                df = pd.read_csv(DATA_PATH)
                top_drugs = top_drugs_extractor(predicted_cond, df)
                result = {'condition': predicted_cond, 'top_drugs': top_drugs, 'predicted_sentiment': predicted_sent}
                #print(top_drugs[0], "second", top_drugs[1], 'third ', top_drugs[2])
                print("result:", result)
                return jsonify(result)
            #else:
               # return jsonify({'error': 'Unable to make a valid prediction'})
        else:
            return jsonify({'error': 'Unable to make a valid prediction'})


    return jsonify({'error': 'Empty comment'})

def cleanText(raw_review):
    # Check if raw_text is None, and provide an empty string as a default value
    raw_review = raw_review or ''

    # 1. Delete HTML 
    review_text = BeautifulSoup(raw_review, 'html.parser').get_text()
    # 2. Make a space
    letters_only = re.sub('[^a-zA-Z]', ' ', review_text)
    # 3. lower letters
    words = letters_only.lower().split()
    # 5. Stopwords 
    meaningful_words = [w for w in words if not w in stop]
    # 6. lemmitization
    lemmitize_words = [lemmatizer.lemmatize(w) for w in meaningful_words]
    # 7. space join words
    return( ' '.join(lemmitize_words))

def top_drugs_extractor(condition,df):
    df_top = df[(df['rating']>=9)&(df['usefulCount']>=100)].sort_values(by = ['rating', 'usefulCount'], ascending = [False, False])
    drug_lst = df_top[df_top['condition']==condition]['drugName'].head(3).tolist()
    return drug_lst


if __name__ == '__main__':
    app.run(port=5000)


'''def handle_prediction():
    comment = request.form.get('comment')
    print(comment)
    if comment != "":
        clean_text = cleanText(comment)
        clean_lst = [clean_text]
        tfidf_vect = vectorizer.transform(clean_lst)
        prediction = model.predict(tfidf_vect)
        predicted_cond = prediction[0]
        df = pd.read_csv(DATA_PATH)
        top_drugs = top_drugs_extractor(predicted_cond,df)
        result = {'condition': predicted_cond, 'top_drugs': top_drugs}
        print(top_drugs[0], "second",  top_drugs[1], 'third ',  top_drugs[2])
        return jsonify(result)
        
    #print(top_drugs[0], "second",  top_drugs[1], 'third ',  top_drugs[2])
    return jsonify({'result': 'Prediction result'}) '''

