import React, { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Box } from './Box/Box';
import { Notificstion } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackCategories = ['good', 'neutral', 'bad'];

  const addFeedback = selectOption => {
    switch (selectOption) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        throw new Error(`No case for feedback type: ${selectOption}`);
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return ((good / countTotalFeedback()) * 100).toFixed();
  };

  return (
    <>
      <Box py="15px" px="30px">
        <GlobalStyle />
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={feedbackCategories}
            onLeaveFeedback={addFeedback}
          />
        </Section>
        <Section title="Statistics">
          {countTotalFeedback() >= 1 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback}
              positivePercentage={countPositiveFeedbackPercentage}
            />
          ) : (
            <Notificstion message="There is no feedback" />
          )}
        </Section>
      </Box>
    </>
  );
};
