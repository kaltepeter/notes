---
title: Intro to Machine Learning
date: 2024-01-23
tags:
- machine-learning
- course
- mammoth-interactive
---

## What is it?

- How can we build computer systems that automatically improve with experience?
- What are the laws that govern all learning processes?

## Example

- Data mine historical medical records to determine the best treatment
- Search engines that automatically customize to your interest

## When

- When software is too complex to manually design
- When software should change after it is released

## Branches

1. Supervised learning
    - learns a function to map an input to an output
    - uses sample input/output pairs
    - analyzes training data
    - infers a function
    - concept learning: parallel task in psychology.
    - apply knowledge across a variety of circumstances
    - steps
        1. determine the type of training examples
        1. gather training set, representative of real world use
        1. represent input features. affects accuracy. Transform the input into a feature vector
        1. determine the structure of the learned function and algorithm
        1. train the algorithm with training set
        1. evaluate the accurary with a testing set
        1. deploy the model
1. Unsupervised learning
    - examples
        - recommend purchases or videos
        - group customers based on attributes
        - genetic and species grouping
        - distinguish different kinds of tissues
        - make a customer persona
        - would customer buy a if bought b
        - detect bot activity
        - recognize handwriting, speech, create speech, tag parts of a speech, translate text
    - looks for new patterns in data with no pre-existing labels
    - minimal human supervision
    - principal component analysis
        - plot them on a graph
        - data is noisy
        - dimensionsality reduction
        - get each data point's first few important components
        - preserves as much variation
    - cluster analysis
        - find commonalities in data
        - reacts based on the presence or absence of the commonalities in every new input
        - helps detect data points that do not fit into any group
1. Reinforment learning (combo of the two)

## Workflow

- gather data
- preprocess data
- train data
- train model
    - model/parameter tuning loop
- test model
- deploy model

## Types of Models

### Clustering Models

- Group similar objects
- Help label data for supervixed machine learning
- e.g. K means, K means++, K medoids, Agglomerative clustering DBSCAN

### Regression Models

- output variable can take continuous values
- example: predict price based on features
- e.g. Linear regression, lasso regression, ridge regression, SVM regression, Decision Tree regression

### Deep Learning

- mimics the human brain with nerual network
- example: classify images
- e.g. computer vision, natural language processing, autonomous vehicles, image filtering, text generation

### classification models

- predict teh type of object within a number of options
- examples: check email for spam, check reviews for positive/negative, check species of a flower
- e.g. K-Nearest neighbors, naive bayes, logistic regression, SVM, decision tree, ensemble

#### K-Nearest Neighbors

- assumes similar things are near each other
- calculates the distance between points on a graph identify similar objects

#### Naive Bayes

- assumes the presence of a feature in a class is unrelated to other features
- a cat has whiskers, tail and nose, but each is independent

#### Logistic Regression

- used when the dependent variable (target) is categorical
- example: is a review positive or negative?, is an email spam or not

#### Support Vector Machine

- finds a plane that has the maximum distance between data points or both classes
-

## Handling Noise
- split training set into 70% learning and 30% validation
- build model on learning set
- iterate as long as acuracy increases
- weight are calculated based on information gain

## Tools

- Keras nural network in python, integrated in tensor flow. https://keras.io/guides/functional_api/
- tensorflow by google
- tensorflow math libray for nerual networks
- tensorflow-js: fast enough for deep learning, use GPU
- pandas: extract, transform, and load
    - handle missing data
    - mutate size
    - align data
    - convert data into dataframe objects
    - join datasets
    - pivot datasets
    - time series functionality
- matplotlib: data exploration
    - 2d plotting library
    - genrate plots, histograms, bar charts, charts, scatter plots
- numpy: data evaluation
    - scientific computing
    - powerful n-dimensional arrays
    - math functions
- scikit learn: data modeling
    - simple and efficient tools for predictive data analysis
    - models: classification, regression, clustering, dimensionality reduction, model selection, preprocessing
- plotly
    - build interactive images
    - open source
    - libraries for javascript, python and R
    - builds interactive plots as html
    - users can zoom, hover, etc
    - data is locked to exported state
- dash
    - create dashboard web apps
    - full dashboard
    - builds an app at a url
- tf lite
    - run ml on mobile, embedded and IOT devices
    - open source deep learning
    - little latency
    - privacy (no data leaves)
    - connectivity not required
    - size: smaller
    - power consumption
    - android, ios, linux+
    - hardware accelerated, high performance

## Steps

1. collect dataset
1. divide into training and testing sets
1. generate h(x) with traning set
1. measure % of examples of the testing set correctly classified by h(x)

## Watch out!

1. keep training and testing sets separate
1. An algorithm remembers the testing sets
1. Don't change the algorithm after testing and re-test on the same testing set
    - if the algorithm sees the same testing set twice it will have a higher accuracy than it should





