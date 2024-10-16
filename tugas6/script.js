function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput === '') return;

    appendMessage(userInput, 'user-message');

    // Process message (for simplicity, just checking location and fetching weather)
    fetchWeather(userInput);
}

function appendMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${className}`;
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchWeather(location) {
    const apiKey = '9f7428d14c33458dbbf14259241610';  // Replace with your WeatherAPI key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data) {
            const temperature = data.current.temp_c;
            const temp_feels = data.current.feelslike_c;
            const humidity = data.current.humidity;
            const description = data.current.condition.text;

            const botResponse = `In ${data.location.name}, it's currently ${temperature}°C feels like ${temp_feels}°C with ${description}. Humidity is at ${humidity}%.`;
            appendMessage(botResponse, 'bot-message');

            // Provide recommendations
            const recommendation = getRecommendation(temperature);
            appendMessage(recommendation, 'bot-message');
        } else {
            appendMessage('Sorry, I couldn’t find the weather for that location.', 'bot-message');
        }
    } catch (error) {
        appendMessage('Error fetching weather data. Please try again later.', 'bot-message');
    }
}

function getRecommendation(temperature) {
    if (temperature > 30) {
        return "It's hot outside! Wear light clothing and stay hydrated.";
    } else if (temperature > 20) {
        return "The weather is pleasant. You can wear casual clothes.";
    } else if (temperature > 10) {
        return "It's a bit chilly. Consider wearing a jacket.";
    } else {
        return "It's cold outside! Wear warm clothes and stay cozy.";
    }
}
