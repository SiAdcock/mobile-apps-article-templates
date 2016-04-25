/*global window,console,define */
define([
    'smoothScroll',
    'modules/ads',
    'modules/util'
], function (
    smoothScroll,
    Ads,
    util
) {
    'use strict';

    var modules = {
            init: function (quiz) {
                modules.numAnswered = 0;
                modules.questionCount = 0;
                modules.isPersonalityQuiz = document.querySelector('.quiz__buckets');
                modules.moveMPU = modules.IsAdBelowQuiz(quiz);
                
                if (modules.isPersonalityQuiz) {
                    quiz.classList.add('personality-quiz');
                    modules.setupPersonalityQuizBuckets();
                    modules.setupPersonalityQuizQuestions();
                    modules.removePersonalityQuizAnswers();
                    modules.buildResultsPanel(quiz);
                } else {
                    quiz.classList.add('news-quiz');
                    modules.score = 0;
                    modules.scoreMessages = modules.getScoreMessages();
                    modules.setupNewsQuizQuestions();
                    modules.removeNewsQuizAnswers();
                    modules.buildScoresPanel(quiz);
                }
            
                quiz.classList.add("loaded");
            },

            setupNewsQuizQuestions: function () {
                var i,
                    correctAnswers = modules.getCorrectAnswers(),
                    question,
                    questions = document.querySelectorAll('.quiz__question'),
                    questionObj;

                for (i = 0; i < questions.length; i++) {
                    question = questions[i];
                    questionObj = {};
                    questionObj.elem = question;
                    questionObj.wrapper = modules.wrapQuestion(question);
                    questionObj.correctAnswer = correctAnswers[i];
                    modules.setupNewsQuizAnswers(questionObj);
                    modules.questionCount++;
                }
            },

            setupNewsQuizAnswers: function (questionObj) {
                var i,
                    answerCode,
                    answers = questionObj.elem.querySelectorAll('.question__answer');

                for (i = 0; i < answers.length; i++) {
                    answerCode = String.fromCharCode(65 + i);
                    
                    if (answerCode === questionObj.correctAnswer.code) {
                        answers[i].dataset.correctAnswerExplanation = questionObj.correctAnswer.explanation;
                    }

                    modules.styleAnswer(answers[i]);

                    answers[i].addEventListener('click', modules.onNewsAnswerClick.bind(null, answers[i], questionObj.elem, answers[i].querySelector('img')));
                }                
            },

            removeNewsQuizAnswers: function () {
                var i,
                    answers = document.querySelectorAll('.quiz__correct-answers-title, .quiz__correct-answers');

                for (i = 0; i < answers.length; i++) {
                    answers[i].parentNode.removeChild(answers[i]);
                }
            },

            setupPersonalityQuizBuckets: function () {
                var i,
                    bucketCode,
                    buckets = document.querySelectorAll('.quiz__bucket'),
                    quizBuckets = {};

                for (i = 0; i < buckets.length; i++) {
                    bucketCode = parseInt(buckets[i].dataset.title, 10);
                    bucketCode = String.fromCharCode(65 + bucketCode - 1);
                    quizBuckets[bucketCode] = {
                        count: 0,
                        description: buckets[i].dataset.description
                    };
                }

                modules.quizBuckets = quizBuckets;
            },

            setupPersonalityQuizQuestions: function () {
                var i,
                    question,
                    questions = document.querySelectorAll('.quiz__question'),
                    questionObj;

                for (i = 0; i < questions.length; i++) {
                    question = questions[i];
                    questionObj = {};
                    questionObj.elem = question;
                    questionObj.wrapper = modules.wrapQuestion(question);
                    modules.setupPersonalityQuizAnswers(questionObj);
                    modules.questionCount++;
                }
            },

            setupPersonalityQuizAnswers: function (questionObj) {
                var i,
                    answers = questionObj.elem.querySelectorAll('.question__answer');

                for (i = 0; i < answers.length; i++) {
                    modules.styleAnswer(answers[i]);

                    answers[i].addEventListener('click', modules.onPersonalityAnswerClick.bind(null, answers[i], questionObj.elem));
                }                
            },

            removePersonalityQuizAnswers: function () {
                var i,
                    answers = document.querySelectorAll('.quiz__buckets-title, .quiz__buckets');

                for (i = 0; i < answers.length; i++) {
                    answers[i].parentNode.removeChild(answers[i]);
                }
            },

            getCorrectAnswers: function () {
                var i,
                    answers = [],
                    correctAnswers = document.querySelector('.quiz__correct-answers').innerHTML.split(','),
                    correctAnswerArray,
                    correctAnswerCode,
                    correctAnswerExplanation,
                    correctAnswerObj;
                
                for (i = 0; i < correctAnswers.length; i++) {
                    correctAnswerArray = correctAnswers[i].split(':')[1].split('-');
                    correctAnswerCode = correctAnswerArray[0].trim().toUpperCase();
                    correctAnswerExplanation = correctAnswerArray[1];
                    correctAnswerObj = {
                        code: correctAnswerCode,
                        explanation: correctAnswerExplanation 
                    };
                    answers.push(correctAnswerObj);
                } 

                return answers;
            },

            getScoreMessages: function () {
                var i,
                    message,
                    minScore,
                    scoreElems = document.querySelectorAll('.quiz__scores > li'),
                    scoreMessages = {};

                for (i = 0; i < scoreElems.length; i++) {
                    message = scoreElems[i].dataset.title;
                    minScore = scoreElems[i].dataset.minScore;
                    scoreMessages[Math.max(minScore, 0)] = message;
                }

                return scoreMessages;
            },

            buildScoresPanel: function (quiz) {
                var scoresPanel = document.createElement("div");

                scoresPanel.classList.add("quiz-scores");
                scoresPanel.id = "quiz-scores";
                scoresPanel.innerHTML = '<p class="quiz-scores__score">' +
                    '<span class="quiz-scores__correct"></span> / <span class="quiz-scores__questions">' +
                    modules.questionCount + '</span></p><p class="quiz-scores__message"></p>';

                quiz.appendChild(scoresPanel);
            },

            buildResultsPanel: function (quiz) {
                var resultPanel = document.createElement("div");

                resultPanel.classList.add("quiz-results");
                resultPanel.id = "quiz-results";
                resultPanel.innerHTML = '<p class="quiz-results__result"><span class="quiz-results__label"></span></p><p class="quiz-results__message"></p>';

                quiz.appendChild(resultPanel);
            },

            wrapQuestion: function (question) {
                var questionWrapper = document.createElement('div'),
                    questionAnswerList = question.querySelectorAll('.question__answers');

                questionWrapper.classList.add('question__wrapper');

                question.insertBefore(questionWrapper, questionAnswerList[0]);

                return questionWrapper;
            },

            styleAnswer: function (answer) {
                var answerImages = answer.querySelectorAll(':scope > img'),
                    answerMarker = document.createElement('div'),
                    answerMessage = document.createElement('div'),
                    answerWrapper = document.createElement('div'),
                    answerText = answer.querySelectorAll('.answer__text'),
                    i,
                    j;

                // Wrap answer in a div for styling
                answerWrapper.classList.add('answer__wrapper');
                answer.appendChild(answerWrapper);

                // Add an answer message div to wrap text answer, correct/wrong message and explanation response
                answerMessage.classList.add('answer__message');
                answerWrapper.appendChild(answerMessage);

                // Add a marker icon span
                answerMarker.classList.add('answer__marker');
                if (modules.isPersonalityQuiz) {
                   answerMarker.innerHTML = '<div class="answer__marker__inner"></div>'; 
                }
                answerWrapper.appendChild(answerMarker);

                // Does this answer have an image (if tools stripped out empty image tags some of this would be unnecessary)
                for (i = 0; i < answerImages.length; i++) {
                    modules.adjustAnswerImage(answer, answerWrapper, answerImages[i]);
                }

                // Does this answer have text
                for (j = 0; j < answerText.length; j++) {
                    modules.adjustAnswerText(answerMessage, answerText[j]);
                }
            },

            adjustAnswerImage: function (answer, answerWrapper, image) {
                if (image.getAttribute('src') !== '') {
                    answer.classList.add('has-image');
                    answer.classList.add('answer__img');
                    answerWrapper.appendChild(image);
                } else {
                    image.parentNode.removeChild(image);
                }
            },

            adjustAnswerText: function (answerMessage, answerText) {
                answerMessage.appendChild(answerText);
            },

            IsAdBelowQuiz: function (quiz) {
                var IsAdBelowQuiz = false,
                    mpu = document.querySelector('.advert-slot__wrapper'),
                    mpuOffset,
                    quizOffset;

                if (mpu) {
                    mpuOffset = mpu.offsetTop;
                    quizOffset = quiz.offsetTop;

                    if (mpuOffset > quizOffset) {
                        IsAdBelowQuiz = true;
                    }
                }

                return IsAdBelowQuiz;
            },

            adjustAdPosition: function (yPos, startTime, timeStamp) {
                var newYPos,
                    progress;

                if (!startTime) {
                    startTime = timeStamp;
                }

                progress = timeStamp - startTime;
                newYPos = Ads.modules.updateMPUPosition(yPos);

                if (progress < 2000) {
                    window.animFrame(modules.adjustAdPosition.bind(null, newYPos, startTime));
                }
            },

            onNewsAnswerClick: function (answer, question, isImage) {
                var answerPara,
                    correctAnswerWrapper,
                    startTime = null,
                    yPos = null;

                if (question.classList.contains('answered')) {
                    return;
                }

                if (answer.dataset.correctAnswerExplanation) {
                    answer.classList.add('correct-answer');
                    question.classList.add('is-correct');
                    
                    answerPara = document.createElement("p");
                    answerPara.classList.add("answer__explanation");
                    answerPara.innerHTML = answer.dataset.correctAnswerExplanation.trim();

                    correctAnswerWrapper = answer.querySelector('.answer__message');
                    correctAnswerWrapper.appendChild(answerPara);
                    
                    modules.score++;
                } else {
                    answer.classList.add('wrong-answer');
                    question.classList.add('is-wrong');
                }

                question.classList.add('answered');
                modules.numAnswered++;

                // If necessary set up a call to check mpu position
                if (modules.moveMPU) {
                    window.animFrame(modules.adjustAdPosition.bind(null, yPos, startTime));
                }

                // When we have an image answer we need to move the positioning of the explanation and marker 
                if (isImage) {
                    modules.showMarkedAnswer(question);
                }

                // If all questions have been answered display the score
                if (modules.questionCount === modules.numAnswered) {
                    modules.showScore();
                }
            },

            onPersonalityAnswerClick: function (answer, question) {
                if (question.classList.contains('answered')) {
                    return;
                }

                if (modules.quizBuckets[answer.dataset.buckets]) {
                    question.classList.add('answered');
                    answer.classList.add('highlight-answer');
                    modules.numAnswered++;
                    modules.quizBuckets[answer.dataset.buckets].count++;

                    // If all questions have been answered display the score
                    if (modules.questionCount === modules.numAnswered) {
                        modules.showResult();
                    }
                }
            },

            showMarkedAnswer: function (question) {
                var i,
                    markedAnswer,
                    markedAnswers = question.querySelectorAll('.correct-answer, .wrong-answer'),
                    thisMessage,
                    thisHeight,
                    thisMarker;

                for (i = 0; i < markedAnswers.length; i++) {
                    markedAnswer = markedAnswers[i];
                    thisMessage = markedAnswer.querySelector('.answer__message');
                    thisHeight = thisMessage.offsetHeight;
                    thisMarker = markedAnswer.querySelector('.answer__marker');
                    // position explanation to the bottom of wrapper
                    thisMessage.style.top = 'calc(100% - ' + thisHeight + 'px)';
                    thisMarker.style.top = 'calc(100% - ' + (thisHeight - 7) + 'px)';
                }
            },

            showScore: function () {
                var i,
                    scoreDisplayMessage = "";

                for (i = 0; i < modules.score; i++) {
                    if (modules.scoreMessages[i]) {
                        scoreDisplayMessage = modules.scoreMessages[i];
                        break;
                    }
                }

                document.querySelector('.quiz-scores__correct').innerHTML = modules.score.toString();
                document.querySelector('.quiz-scores__message').innerHTML = scoreDisplayMessage;
                document.querySelector('.quiz-scores').classList.add('open');

                // Scroll score panel into view
                smoothScroll.animateScroll(null, '#quiz-scores', { speed: 1500, offset: 40 });
            },

            showResult: function () {
                var key,
                    bucket,
                    result,
                    resultLabel,
                    resultMessage;

                for (key in modules.quizBuckets) {
                    if (modules.quizBuckets.hasOwnProperty(key)) {
                        bucket = modules.quizBuckets[key];
                        if (!result) {
                            result = bucket;
                        } else if (bucket.count > result.count) {
                            result = bucket;
                        }
                        resultMessage = result.description;
                        resultLabel = key;
                    }
                }

                document.querySelector('.quiz-results__message').innerHTML = resultMessage;
                document.querySelector('.quiz-results__label').innerHTML = resultLabel;
                document.querySelector('.quiz-results').classList.add('open');

                // Scroll score panel into view
                smoothScroll.animateScroll(null, '#quiz-scores', { speed: 1500, offset: 40 });
            }
        },

        ready = function () {
            var quiz;

            if (!this.initialised) {
                this.initialised = true;
                quiz = document.querySelector('.element-atom .quiz');
                if (quiz) {
                    modules.init(quiz);
                }
            }
        };

    return {
        init: ready
    };

});