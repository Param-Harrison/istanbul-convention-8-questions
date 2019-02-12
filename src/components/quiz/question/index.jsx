/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */

import React, { Component, Suspense } from 'react';

import Answer from './answer';

import styles, { sliderFallbackStyles } from './styles';

const Slider = React.lazy(() => import('./slider'));

export default class Question extends Component {
  state = {
    answerResults: [33, 33, 33]
  };

  constructor(props) {
    super(props);

    const { storeAnswer } = this.props;
    const { answerResults } = this.state;

    storeAnswer(answerResults);
  }

  updateResultForAnswers = data => {
    this.setState(state => ({
      ...state,
      answerResults: data
    }));
  };

  render() {
    const {
      currentQuestion,
      frontmatter: { title, answers = [] },
      storeAnswer
    } = this.props;
    const { answerResults } = this.state;

    return (
      <div className="question">
        <style jsx>{styles}</style>
        {sliderFallbackStyles.styles}

        <h2 className="title-container">
          <div className="current">{currentQuestion}</div>

          <div className="title">{title}</div>
        </h2>

        <div className="slider-container">
          {typeof window !== 'undefined' && (
            <Suspense
              fallback={<div className={sliderFallbackStyles.className} />}
            >
              <Slider
                defaultValue={[33, 66]}
                max={100}
                min={0}
                onChange={(data, rawData) => {
                  this.updateResultForAnswers(data, rawData);
                  storeAnswer(data);
                }}
              />

              <div className="numbered-results">
                {answerResults.map((value, index) => (
                  <div
                    key={`result-indicator-${index}`}
                    style={{ flexBasis: `${answerResults[index]}%` }}
                    className="result"
                  >
                    {value}%
                  </div>
                ))}
              </div>
            </Suspense>
          )}
        </div>

        {answers.map((answer, index) => (
          <Answer key={answer} index={index} result={answerResults[index]}>
            {answer}
          </Answer>
        ))}
      </div>
    );
  }
}
