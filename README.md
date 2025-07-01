# 🏡 Linear Regression - House Price Predictor

A simple machine learning app that predicts house prices based on square footage using linear regression. Built with TensorFlow.js and React, the entire model runs in the browser — no backend, no server!

## ✨ Features

- Trains a linear regression model on a dataset of US home prices
- Uses TensorFlow.js for model creation and training
- Interactive UI to input square footage and get price predictions
- Real-time graph showing data points and prediction line
- Supports saving and loading the trained model using localStorage
- All computation happens in the browser

#### Live Preview - [https://prayagk.github.io/linear-regression](https://prayagk.github.io/linear-regression)

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- TensorFlow.js
- Zustand
- Tailwind CSS

## Getting Started

1. Clone the repo
   ```bash
   git clone https://github.com/prayagk/linear-regression.git
   cd linear-regression
   ```
2. Install dependencies
   ```bash
    npm install
   ```
3. Start the development server
   ```bash
    npm run dev
   ```

## Screenshots

<img src="/public/screenshots/image.png" width="300"/>
<img src="/public/screenshots/image-2.png" width="300"/>

## Data Source

This project uses the following dataset:

- **Dataset Name**: [House Sales in King County, USA](https://www.kaggle.com/datasets/harlfoxem/housesalesprediction)
- **Source**: Provided by [harlfoxem](https://www.kaggle.com/harlfoxem) on Kaggle
- **License**: CC0: Public Domain
