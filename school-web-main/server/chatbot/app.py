from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer
import nltk
import json
import pickle
import random
from train_model import ChatbotTrainer

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Download required NLTK data
nltk.download('punkt')
nltk.download('wordnet')

# Load the trained model and data
model = load_model('chatbot_model.h5')
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
intents = json.load(open('intents.json'))

lemmatizer = WordNetLemmatizer()

# Initialize trainer
trainer = ChatbotTrainer()

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list

def get_response(intents_list, intents_json):
    if not intents_list:
        return "I'm not sure I understand. Could you please rephrase that?"
    
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    data = request.json
    user_message = data.get('message', '')
    feedback = data.get('feedback', None)
    
    try:
        ints = predict_class(user_message)
        response = get_response(ints, intents)
        
        # If feedback is provided, use it for learning
        if feedback and feedback.get('correct') == False:
            correct_intent = feedback.get('intent')
            if correct_intent:
                trainer.learn_from_conversation(user_message, correct_intent)
        
        return jsonify({
            'response': response,
            'intent': ints[0]['intent'] if ints else None,
            'confidence': float(ints[0]['probability']) if ints else 0
        })
    except Exception as e:
        print(f"Error processing message: {e}")
        return jsonify({
            'response': "I apologize, but I'm having trouble understanding. Could you please rephrase that?",
            'intent': None,
            'confidence': 0
        })

@app.route('/api/train', methods=['POST'])
def train():
    try:
        data = request.json
        new_intent = data.get('intent')
        new_patterns = data.get('patterns', [])
        new_responses = data.get('responses', [])
        
        # Add new intent to intents.json
        with open('intents.json', 'r+') as file:
            intents = json.load(file)
            intents['intents'].append({
                'tag': new_intent,
                'patterns': new_patterns,
                'responses': new_responses
            })
            file.seek(0)
            json.dump(intents, file, indent=2)
        
        # Retrain the model
        trainer.train(intents, epochs=50)
        
        return jsonify({'success': True, 'message': 'Model retrained successfully'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True) 