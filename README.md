# 🧠 Student Mental Health Prediction System

A Machine Learning-based web application that explores how students' daily habits, social media usage, sleep patterns, and academic routines relate to their mental well-being.

The application allows users to enter information about their daily lifestyle and receive an estimated mental health score using a trained Machine Learning model.

---

## 📌 About The Project

Students have different daily routines. Some spend several hours on social media, some have irregular sleeping schedules, while others spend more time studying or participating in physical activities.

This project uses Machine Learning to explore patterns between these lifestyle habits and students' reported mental health scores.

**In simple words:**

📝 Enter your lifestyle information → ⚙️ Machine Learning Analysis → 📊 Get your predicted mental health score.

## ✨ Features

- 🧠 **Machine Learning Prediction** – Estimates a student's mental health score using a trained ML model.
- 💻 **Interactive Web Interface** – Simple and user-friendly interface for entering student information.
- 📱 **Social Media Analysis** – Considers daily social media usage and phone unlock frequency.
- 📚 **Academic Routine Analysis** – Includes study hours and academic background.
- 😴 **Sleep & Lifestyle Factors** – Considers sleep duration and physical activity.
- ⚡ **Instant Results** – Displays predictions after submitting the required information.
- 🔌 **REST API Integration** – Uses FastAPI to connect the frontend with the ML model.

## 🔄 How Does It Work?

The application follows a simple workflow:

1. 📝 **Enter Information:** Provide details about your lifestyle, academic routine, and social media habits.
2. 📤 **Submit Details:** The frontend sends your information to the backend.
3. 🧠 **ML Processing:** The trained Machine Learning model processes the submitted information.
4. 📊 **View Results:** The application displays the estimated mental health score.

## 📋 Information Used for Prediction

The application considers different aspects of a student's daily life.

| Category | Information Collected |
|---|---|
| 👤 Personal Details | Age, Gender, Country |
| 📚 Education | Academic Level, Study Hours |
| 📱 Social Media | Most Used Platform, Daily Usage |
| 📞 Mobile Usage | Daily Phone Unlocks |
| 😴 Physical Health | Sleep Hours, Physical Activity |
| 🧘 Lifestyle | Purpose of Social Media Usage, Stress Level |

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| 🐍 Python | Main programming language |
| 🐼 Pandas | Data processing |
| 🔢 NumPy | Numerical operations |
| 🤖 Scikit-learn | Machine Learning |
| 💾 Joblib | Saving and loading the trained model |
| ⚡ FastAPI | Backend development |
| 📦 Pydantic | Input validation |
| 🌐 HTML & CSS | Frontend development |
| ⚙️ JavaScript | Frontend functionality and API communication |
| 🚀 Uvicorn | Running the backend server |

## 📂 Project Structure

```text
Mental_health_ml_proj/
│
├── 🧠 main.py
│
├── 💾 Mental_Health_Model.pkl
│
├── 📊 Student Social Media And Mental Health Impact.csv
│
├── 🌐 index.html
│
├── 🎨 style.css
│
├── ⚙️ script.js
│
├── 📦 requirements.txt
│
└── 📖 README.md
```

## 🚀 Getting Started

Follow these steps to run the project on your computer.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/RehanYusuf/Mental_health_ml_proj.git
```

### 2️⃣ Navigate to the Project Directory

```bash
cd Mental_health_ml_proj
```

### 3️⃣ Create a Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 4️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 5️⃣ Start the Backend Server

```bash
uvicorn main:app --reload
```

The backend will be available at:

🔗 http://127.0.0.1:8000

### 6️⃣ Access API Documentation

FastAPI automatically generates interactive API documentation.

📖 http://127.0.0.1:8000/docs

### 7️⃣ Open the Frontend

Open `index.html` in your browser using the VS Code Live Server extension.

Make sure the API URL in `script.js` points to your local backend:

```javascript
const API_URL = "http://127.0.0.1:8000/predict";
```

### 8️⃣ Get Your Prediction

- 📝 Enter the required student information.
- 📤 Submit the form.
- 🧠 Wait for the model to process your information.
- 📊 View the predicted mental health score.

## 📊 Understanding the Prediction

The Machine Learning model generates an estimated score based on patterns learned during training.

The result is an algorithmic prediction, not a verified measurement of someone's actual mental health.

## 🔮 Future Enhancements

- 📈 Add graphical visualizations of lifestyle patterns.
- 🔍 Introduce explainable AI to understand prediction factors.
- 👤 Add user authentication and prediction history.
- 🤖 Experiment with different Machine Learning algorithms.
- 📊 Build an analytics dashboard.
- 🌍 Expand the dataset to include more diverse student populations.

## ⚠️ Disclaimer

This project is developed for educational and learning purposes.

It explores relationships between student lifestyle habits and mental health-related scores using Machine Learning.

**Important:** This application is not a medical or psychological diagnostic tool. Its predictions should not be used to diagnose mental health conditions or replace advice from qualified healthcare professionals.

## 👨‍💻 Author

**Yusuf Rehan**

- 🐙 GitHub: [@RehanYusuf](https://github.com/RehanYusuf)
- 💼 LinkedIn: [Yusuf Rehan](https://www.linkedin.com/in/yusuf-rehan-10a611253/)

---

⭐ If you find this project interesting, consider giving the repository a star!
