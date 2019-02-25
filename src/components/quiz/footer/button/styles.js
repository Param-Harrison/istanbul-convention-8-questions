import css from 'styled-jsx/css';

import { colors, fonts, mq } from '../../../../tokens';

export default css`
  button {
    background: ${colors.darkGrey};
    border: none;
    color: white;
    font-family: ${fonts.bitter.family};
    font-size: 1rem;
    letter-spacing: 0.02rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    text-transform: uppercase;
    width: 50%;
  }

  @media ${mq.desktop} {
    button {
      border-radius: 50%;
      height: 12rem;
      left: -7rem;
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      width: 12rem;
      z-index: 10;
    }

    button + button {
      left: auto;
      right: -7rem;
    }
  }

  button + button {
    border-left: 1px solid white;
  }

  button:hover,
  button:focus {
    background-color: ${colors.red};
    cursor: pointer;
  }

  button[disabled] {
    color: rgb(152, 152, 152);
    opacity: 0.8;
  }

  button[disabled]:hover,
  button[disabled]:focus {
    background: ${colors.darkGrey};
    color: rgb(152, 152, 152);
    cursor: default;
  }
`;
