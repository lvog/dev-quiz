# 💡 DevQuiz

**DevQuiz** is an interactive web application that allows users to test their programming knowledge through dynamic quizzes.

## 🚀 Live Demo

[Live Demo](https://lvog.github.io/dev-quiz)

## 🌐 Usage
1. Open the application
2. Choose a quiz
3. Answer the questions
4. View your results
5. Try again or explore other quizzes

## 📌 Features

- 📋 Quiz list with descriptions and difficulty levels
- 🎯 Interactive quiz flow with multiple questions
- 🔀 Randomized answer order for each question
- ⏱️ Built-in timer for tracking completion time
- 📊 Results summary (correct / incorrect answers)
- 💾 LocalStorage support for saving completed quiz results
- 🎞️ Smooth UI animations (on render and scroll)

## 🧠 JavaScript Architecture

```
src/js/
├── logic/
│   └── QuizEngine.js         # Handles quiz logic: saving answers, calculating results and summary
│
├── mappers/
│   └── mapData.js            # Transforms API data into a format suitable for the UI
│
├── modules/
│   ├── CarouselModule.js     # Controls quiz navigation (slides, progress)
│   ├── PopupModule.js        # Manages opening and closing of the quiz modal
│   ├── QuizModule.js         # Main application flow (load list, start quiz, handle interactions)
│   └── TimerModule.js        # Handles quiz timer (start, stop, update time)
│
├── services/
│   └── quizService.js        # Fetches quiz data from API
│
├── ui/
│   └── QuizUI.js             # Responsible for rendering UI elements and updating the DOM
│
├── utils/
│   ├── EventBus.js           # Event system for communication between modules
│   ├── getData.js            # Helper for making API requests
│   ├── quizResultsStorage.js # Saves and retrieves quiz results from localStorage
│   ├── ScrollAnimation.js    # Handles scroll-based animations (Intersection Observer)
│   ├── setYear.js            # Sets current year in the footer
│   └── shuffleArray.js       # Shuffles answers (Fisher–Yates algorithm)
│
├── app.js                    # Entry point: initializes all modules and starts the app
├── config.js                 # Application configuration (API URL)
├── data.js                   # Static data (quizzes, main info, error message)
└── state.js                  # Global state (questions, answers, current quiz)
```


## 🛠️ Tech Stack

- Webpack
- JavaScript (ES6+)
- HTML5
- SCSS
- QuizAPI



## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/lvog/dev-quiz.git
```

### 2. Navigate to the project folder
```bash
cd dev-quiz
```

### 3. Install dependencies

⚠️ Before installing dependencies, please review the [webpack-markup-starter](https://github.com/lvog/webpack-markup-starter) that is used in this project.

```bash
npm install
```

### 4. Create a `.env` file in the root directory

Add your API key:
```bash
API_KEY=your_api_key_here
```

You can get an API key by registering at [QuizAPI](https://quizapi.io)

### 5. Run the project
```bash
npm run dev
```

### 6. Build the project for production
```bash
npm run build
```
## 📄 License
Distributed under the MIT License. See  `LICENSE`  for more information.

## 📬 Contact
- Email: [levchuk.oleg21@gmail.com](mailto:levchuk.oleg21@gmail.com)  
- Website: [lvog.github.io](https://lvog.github.io)  
- LinkedIn: [in/oleg-levchuk-2098b2b7](https://www.linkedin.com/in/oleg-levchuk-2098b2b7)
