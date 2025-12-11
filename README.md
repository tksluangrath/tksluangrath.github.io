# Hi there, I'm Terrance 👋

## 💫 About Me

🌟 Data Scientist specializing in machine learning, AI-driven automation, and statistical modeling with a proven track record of delivering high-impact solutions across cybersecurity, fraud detection, and humanitarian analytics.

🎓 Currently pursuing an **M.S. in Data Science at the University of Virginia** (4.0 GPA, Class of 2026). Holds a **B.S. in Mathematics** with a minor in Data Analytics from James Madison University (2024).

💡 Passionate about leveraging data science to solve complex real-world problems, from detecting fraudulent transactions in millions of records to mapping disaster relief needs from aerial imagery.

⚡ Outside of data science, I'm a breakdancer who thrives on the intersection of creativity and precision, the same mindset I bring to finding patterns in complex datasets.

---

## 🎓 Education

**University of Virginia** | M.S. Data Science | *Expected August 2026*  
- **GPA:** 4.0/4.0
- **Relevant Coursework:** Bayesian Machine Learning, Statistical Learning, Linear Models for Data Science, Programming for Data Science, Computation for Data Science, Practice and Application for Data Science

**James Madison University** | B.S. Applied Mathematics | Minor: Data Analytics | *May 2024*  
- **Relevant Coursework:** Mathematical Modeling & Optimization, Data Analysis & Visualization, SAS Programming & Data Management

---

## 💼 Professional Experience

### **Graduate Student Researcher** | UVA DART Lab  
*March 2025 to Present | Charlottesville, VA*

- Pioneered research applying **large language models (LLMs)** to Security Operations Centers, developing automated alert analysis systems that uncover complex threat patterns and enhance detection capabilities
- Collaborated with cross-functional research teams to design and execute human-centric surveys, refining methodologies that improved study consistency and reliability across multiple research initiatives
- Identified critical workflow bottlenecks in SOC operations and implemented **LLM-based automation solutions** that reduced manual effort and increased operational efficiency for security analysts

### **Junior Data Analyst** | ACTFORE  
*June 2024 to May 2025 | Reston, VA*

- Analyzed and processed **1+ TB of sensitive data daily** while maintaining 99%+ accuracy rates and ensuring full compliance with PII, PHI, FERPA, and GDPR regulations
- Collaborated cross-functionally with product, engineering, and compliance teams to validate data accuracy and deliver actionable insights that accelerated business decision-making
- Demonstrated exceptional time management by successfully orchestrating multiple concurrent data processing workflows without compromising quality or compliance standards

---

## 🚀 Featured Projects

### 🐼 **Pandas vs Polars: Performance Benchmarking on NYC Taxi Data**
[🔗 View on GitHub](https://github.com/tksluangrath/pandas-vs-polars) | *Python | December 2025*

Conducted comprehensive performance analysis comparing Pandas and Polars DataFrame libraries using **50,000 NYC Yellow Taxi trip records** to evaluate real-world data processing capabilities.

**Key Achievements:**
- Benchmarked CSV loading, data cleaning, quality checks, feature engineering, and aggregations across both libraries over **100 runs** for statistical reliability
- Discovered **15× faster CSV loading** with Polars due to Rust-based multithreaded parsing (0.0032s vs 0.0463s)
- Validated **identical analytical outputs** across both libraries, ensuring correctness and reproducibility
- Measured **10% memory reduction** with Polars (8.34 MB vs 9.25 MB) leveraging Arrow-native columnar storage
- Created data-driven recommendations for library selection based on dataset size, performance needs, and use case requirements

**Technical Stack:** Python, pandas, Polars, Matplotlib, NYC Open Data API, sodapy

---

### 💳 **Fraud Detection Machine Learning System**
[🔗 View on GitHub](https://github.com/tksluangrath/fraud-detection-app/tree/main) | *Python | August – September 2025*

Engineered an end-to-end machine learning pipeline analyzing **6.3M+ financial transactions** to detect fraudulent activity in real-time.

**Key Achievements:**
- Achieved **95% recall on fraud detection** while maintaining 95% overall accuracy despite severe class imbalance (0.13% fraud rate)
- Implemented advanced class weighting techniques with logistic regression to address imbalanced dataset challenges
- Deployed interactive **Streamlit web application** enabling real-time fraud predictions on new transaction data
- Conducted comprehensive exploratory data analysis (EDA) to identify fraud patterns and feature relationships

**Technical Stack:** Python, pandas, NumPy, scikit-learn, XGBoost, Matplotlib, Seaborn, Streamlit, joblib

<div align="center">
  <img src="./assets/img/fraud_detection_app.png" alt="Fraud Detection App Screenshot" width="65%">
  <br>
  <em>Real-time fraud detection interface built with Streamlit for instant transaction analysis</em>
</div>

---

### ⚡ **Energy Demand Forecasting with XGBoost**
[🔗 View on GitHub](https://github.com/tksluangrath/energy-forecast-xgboost) | *Python*

Developed time series forecasting model predicting hourly electricity demand for **American Electric Power (AEP)** using gradient boosting.

**Key Achievements:**
- Trained on **14 years of hourly data** (2004–2018) comprising 121,000+ observations
- Achieved **RMSE of 1644.39 MW** through sophisticated time-based feature engineering
- Engineered temporal features (hour, day, month, lag variables) capturing seasonal patterns and demand cycles

**Technical Stack:** Python, pandas, scikit-learn, XGBoost, Matplotlib

---

### 🧩 **Haiti Disaster Relief: Humanitarian Analytics from Aerial Imagery**
[⬇️ Download Report (PDF)](./assets/docs/Haiti_Earthquake_Relief.pdf) | *R | May – August 2025*

Developed machine learning models to identify temporary shelters (blue tarps) from aerial imagery supporting post-earthquake disaster relief efforts.

**Key Achievements:**
- Processed and classified **pixel-level RGB data** to map displaced populations for resource allocation
- Addressed severe **class imbalance (≈3% minority class)** using SMOTE and threshold optimization techniques
- Compared six classification algorithms (LDA, QDA, KNN, Penalized Logistic Regression, Random Forest, SVM)
- Achieved **99% recall** on blue tarp detection with penalized logistic regression, enabling accurate identification with minimal false positives

**Technical Stack:** R, tidyverse, tidymodels, caret, themis (SMOTE), ggplot2

<div align="center">
  <img src="./assets/img/blue_tarps_confusion.png" alt="Model Performance Comparison" width="65%">
  <br>
  <em>Comparative analysis of six classification models for disaster relief shelter detection</em>
</div>

---

### 🎲 **Monte Carlo Simulation Framework (Python Package)**
[🔗 View on GitHub](https://github.com/tksluangrath/montecarlo) | *Python*

Built production-ready Python package implementing Monte Carlo simulation framework with modular, object-oriented design.

**Key Features:**
- Developed three core classes (**Die**, **Game**, **Analyzer**) enabling weighted dice simulation and statistical outcome analysis
- Implemented comprehensive error handling, input validation, and unit testing with pytest
- Published as **pip-installable package** with full documentation and setuptools integration

**Technical Stack:** Python, NumPy, pandas, pytest, setuptools

<div align="center">
  <img src="./assets/img/mermaid.png" alt="Package Architecture" width="80%">
  <br>
  <em>Object-oriented architecture showing data flow between simulation components</em>
</div>

---

## 🧰 Technical Skills

### **Programming Languages**
Python (Pandas, NumPy, SciPy, scikit-learn, Matplotlib, Seaborn) | R (tidyverse, caret, ggplot2, tidymodels) | SQL (joins, aggregations, subqueries, window functions, query optimization) | SAS | Java

### **Machine Learning & AI**
Supervised Learning (Logistic Regression, Decision Trees, Random Forests, SVM, KNN) | Deep Learning | Bayesian Machine Learning | Large Language Models (LLMs) | Statistical Modeling | Feature Engineering | Model Evaluation & Optimization | Hyperparameter Tuning

### **Data Science Techniques**
Big Data Analysis (1TB+ datasets) | Data Wrangling & Preprocessing | Exploratory Data Analysis (EDA) | Statistical Inference & Hypothesis Testing | A/B Testing | Time Series Forecasting | Imbalanced Classification | Data Visualization & Storytelling

### **Tools & Platforms**
Git/GitHub | Jupyter Notebooks | Streamlit | Excel (Advanced) | IBM SPSS Statistics | Azure (Fundamentals Certified 2022)

### **Domain Expertise**
Cybersecurity Analytics | Fraud Detection | Regulatory Compliance (PII, PHI, FERPA, GDPR) | Humanitarian Analytics | Energy Forecasting

---

## 📬 Let's Connect

**📧 Email:** [tksluangrath@gmail.com](mailto:tksluangrath@gmail.com)  
**💼 LinkedIn:** [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/terranceluangrath/)  
**👨‍💻 GitHub:** [![GitHub](https://img.shields.io/badge/GitHub-181717.svg?logo=github&logoColor=white)](https://github.com/tksluangrath)  
**📄 Resume:** [![Resume](https://img.shields.io/badge/Resume-Download-success.svg)](./assets/docs/Resume.pdf)

---

💡 *Open to data science opportunities, research collaborations, and innovative projects. Let's connect!*
