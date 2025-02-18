import numpy as np
import json
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, Dropout, LSTM
from tensorflow.keras.optimizers import Adam
import nltk
from nltk.stem import WordNetLemmatizer
import pickle
import os
import datetime

class ChatbotTrainer:
    def __init__(self):
        nltk.download('punkt')
        nltk.download('wordnet')
        self.lemmatizer = WordNetLemmatizer()
        self.model_path = 'chatbot_model.h5'
        self.words_path = 'words.pkl'
        self.classes_path = 'classes.pkl'
        self.training_data_path = 'training_data.pkl'
        
        # Load or initialize model and data
        if os.path.exists(self.model_path):
            self.model = load_model(self.model_path)
            self.words = pickle.load(open(self.words_path, 'rb'))
            self.classes = pickle.load(open(self.classes_path, 'rb'))
            if os.path.exists(self.training_data_path):
                self.training_data = pickle.load(open(self.training_data_path, 'rb'))
            else:
                self.training_data = []  # Initialize as empty if the file doesn't exist
                # Optionally, create an empty training_data.pkl file
                with open(self.training_data_path, 'wb') as f:
                    pickle.dump(self.training_data, f)
        else:
            self.model = None
            self.words = []
            self.classes = []
            self.training_data = []  # Initialize as empty if the model doesn't exist

    def preprocess_data(self, intents):
        for intent in intents['intents']:
            for pattern in intent['patterns']:
                word_list = nltk.word_tokenize(pattern)
                self.words.extend(word_list)
                self.training_data.append((word_list, intent['tag']))
                if intent['tag'] not in self.classes:
                    self.classes.append(intent['tag'])

        self.words = [self.lemmatizer.lemmatize(word.lower()) for word in self.words if word not in ['?', '!', '.', ',']]
        self.words = sorted(list(set(self.words)))
        self.classes = sorted(list(set(self.classes)))

    def create_training_data(self):
        training = []
        output_empty = [0] * len(self.classes)

        for doc in self.training_data:
            bag = []
            pattern_words = doc[0]
            pattern_words = [self.lemmatizer.lemmatize(word.lower()) for word in pattern_words]
            
            for word in self.words:
                bag.append(1) if word in pattern_words else bag.append(0)
            
            output_row = list(output_empty)
            output_row[self.classes.index(doc[1])] = 1
            training.append([bag, output_row])

        # Ensure that the training data is homogeneous
        training = np.array(training, dtype=object)  # Use dtype=object to handle variable-length lists
        return training

    def build_model(self):
        model = Sequential([
            Dense(128, input_shape=(len(self.words),), activation='relu'),
            Dropout(0.5),
            Dense(64, activation='relu'),
            Dropout(0.5),
            Dense(len(self.classes), activation='softmax')
        ])
        model.compile(optimizer=Adam(learning_rate=0.01), 
                     loss='categorical_crossentropy', 
                     metrics=['accuracy'])
        return model

    def train(self, intents, epochs=200):
        # Preprocess data
        self.preprocess_data(intents)
        
        # Create training data
        training = self.create_training_data()
        train_x = np.array([item[0] for item in training])
        train_y = np.array([item[1] for item in training])

        # Build and train model
        self.model = self.build_model()
        history = self.model.fit(
            train_x, train_y,
            epochs=epochs,
            batch_size=5,
            verbose=1
        )

        # Save the model and data
        self.save_model()
        return history

    def save_model(self):
        self.model.save(self.model_path)
        pickle.dump(self.words, open(self.words_path, 'wb'))
        pickle.dump(self.classes, open(self.classes_path, 'wb'))
        pickle.dump(self.training_data, open(self.training_data_path, 'wb'))

    def learn_from_conversation(self, user_message, intent_tag):
        """Learn from user interactions"""
        word_list = nltk.word_tokenize(user_message)
        self.training_data.append((word_list, intent_tag))
        
        # Retrain the model with new data
        training = self.create_training_data()
        train_x = np.array([item[0] for item in training])
        train_y = np.array([item[1] for item in training])
        
        self.model.fit(train_x, train_y, epochs=5, verbose=0)
        self.save_model()

if __name__ == '__main__':
    # Load intents
    with open('intents.json') as file:
        intents = json.load(file)

    # Initialize and train
    trainer = ChatbotTrainer()
    history = trainer.train(intents)
    print("Training completed and model saved!") 