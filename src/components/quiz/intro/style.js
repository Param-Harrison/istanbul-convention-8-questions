import css from 'styled-jsx/css';

import { colors, fonts, mq } from '../../../tokens';

export default css`
  article {
    background-color: ${colors.red};
    border: 5px solid white;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: ${fonts.openSans.family};
    min-height: 92.2vh;
    padding: 1.5rem 2rem;
    text-align: center;
  }

  @media ${mq.desktop} {
    article {
      padding: 2.5rem 10rem;
    }
  }

  .question {
    display: block;
    font-size: 1rem;
    letter-spacing: 0.05rem;
    line-height: 1.25;
    margin-bottom: 4rem;
    text-transform: uppercase;
  }

  .title {
    font-family: ${fonts.bitter.family};
    font-size: 2.25rem;
    margin-bottom: 3rem;
    margin-top: 0;
  }

  @media ${mq.desktop} {
    .title {
      font-size: 3.25rem;
      line-height: 1.1;
      margin-bottom: 4rem;
    }
  }

  .slider-container {
    margin: 0 auto 1.5rem auto;
    max-width: 20rem;
    min-height: 3.5rem;
    width: 100%;
  }

  .slider-intro {
    letter-spacing: 0.07rem;
  }

  .button-container {
    margin-top: 3rem;
  }

  button {
    appearance: none;
    background: white;
    border: none;
    color: black;
    font-family: ${fonts.bitter.family};
    font-size: 1.25rem;
    padding: 0.65rem 2.75rem;
    text-transform: uppercase;
    width: auto;
  }

  button:hover,
  button:focus {
    background-color: ${colors.darkGrey};
    color: white;
    cursor: pointer;
  }
`;
