import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { IoMdSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from 'axios';

// Get all patterns from intents for suggestions
const allPatterns = [
  {
    tag: 'admission',
    patterns: [
      "How can I apply for admission",
      "What is the admission process",
      "I want to admit my child",
      "Grade 1 admission",
      "Grade 6 admission",
      "New student registration"
    ]
  },
  {
    tag: 'facilities',
    patterns: [
      "What facilities do you have",
      "Tell me about school facilities",
      "Do you have sports facilities",
      "Is there a library",
      "Computer lab facilities",
      "Science lab"
    ]
  },
  {
    tag: 'curriculum',
    patterns: [
      "What curriculum do you follow",
      "Tell me about the syllabus",
      "Which subjects are taught",
      "Education system",
      "Medium of instruction"
    ]
  },
  {
    tag: 'achievements',
    patterns: [
      "School achievements",
      "Academic performance",
      "Exam results",
      "Sports achievements",
      "Student accomplishments"
    ]
  },
  {
    tag: 'extracurricular',
    patterns: [
      "What are the extra activities",
      "Sports activities",
      "School clubs",
      "After school activities",
      "Cultural activities"
    ]
  }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Ayubowan! Welcome to Mathurata Maha Vidyalaya. How can I help you? Start typing to see suggestions.",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentIntent, setCurrentIntent] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const chatbotRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add click event listener to handle outside clicks
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add the event listener when the chatbot is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Function to find matching suggestions based on input
  const findSuggestions = (input) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const inputLower = input.toLowerCase();
    const matches = [];

    allPatterns.forEach(category => {
      category.patterns.forEach(pattern => {
        if (pattern.toLowerCase().includes(inputLower) || 
            inputLower.split(' ').some(word => 
              pattern.toLowerCase().includes(word) && word.length > 2
            )) {
          if (!matches.includes(pattern)) {
            matches.push(pattern);
          }
        }
      });
    });

    setSuggestions(matches.slice(0, 5)); // Limit to 5 suggestions
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputMessage(value);
    findSuggestions(value);
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    handleSend(question);
    setSuggestions([]);
  };

  const handleSend = async (questionText = inputMessage) => {
    if (questionText.trim() === '') return;

    const userMessage = {
      text: questionText,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setSuggestions([]);
    setShowFeedback(false);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: questionText
      });

      const botMessage = {
        text: response.data.response,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      setCurrentIntent(response.data.intent);
      setConfidence(response.data.confidence);
      setShowFeedback(true);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting to the server.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (isCorrect) => {
    if (!isCorrect) {
      // Show intent selection dialog
      const correctIntent = window.prompt('What was the correct topic?');
      if (correctIntent) {
        try {
          await axios.post('http://localhost:5000/api/chat', {
            message: messages[messages.length - 2].text, // User's message
            feedback: {
              correct: false,
              intent: correctIntent
            }
          });
        } catch (error) {
          console.error('Error sending feedback:', error);
        }
      }
    }
    setShowFeedback(false);
  };

  return (
    <div className="chatbot-container" ref={chatbotRef}>
      {!isOpen && (
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <FaRobot size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>
              <FaRobot style={{ marginRight: '8px' }} />
              School Assistant
            </h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-section">
            {suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-button"
                    onClick={() => handleSuggestedQuestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                aria-label="Send message"
              >
                <IoMdSend size={20} />
              </button>
            </div>
          </div>

          {showFeedback && (
            <div className="feedback-container">
              <p>Was this response helpful?</p>
              <div className="feedback-buttons">
                <button onClick={() => handleFeedback(true)}>👍</button>
                <button onClick={() => handleFeedback(false)}>👎</button>
              </div>
              {confidence < 0.5 && (
                <p className="low-confidence">
                  I'm not very confident about this response. 
                  Please let me know if it's not what you were looking for.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot; 