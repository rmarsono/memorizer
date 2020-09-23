import React, { useState, useEffect } from 'react';
import { NormalizeCss } from '../styles/NormalizeCss';
import cards from '../mocks/cards.json';
import { Card } from './Card';
import styled from 'styled-components';
import { shuffleArray } from '../utils/shuffleArray';
import { generateRandomColor } from '../utils/generateRandomColor';

const puzzleSize = 18;

const generateRandomIndexes: () => number[] = () => {
  const randomIndexes: number[] = [];

  while (randomIndexes.length < puzzleSize / 2) {
    const randomIndex = Math.floor(Math.random() * cards.length);

    if (!randomIndexes.includes(randomIndex)) randomIndexes.push(randomIndex);
  }

  return randomIndexes;
};

const cardIndexes = generateRandomIndexes();

const App = (): JSX.Element => {
  const [cards, setCards] = useState(
    shuffleArray([...cardIndexes, ...cardIndexes]).reduce<
      {
        card: string;
        open: boolean;
        color: string;
      }[]
    >(
      (memo, value) => [
        ...memo,
        {
          card: String(value),
          open: false,
          color:
            memo.find(({ card }) => card === String(value))?.color ||
            generateRandomColor(),
        },
      ],
      []
    )
  );

  const [solved, setSolved] = useState(
    cardIndexes.reduce<{
      [key: string]: boolean;
    }>(
      (memo, value) => ({
        ...memo,
        [String(value)]: true,
      }),
      {}
    )
  );

  const [lastOpenedCard, setLastOpenedCard] = useState<number | undefined>();

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setSolved(
          Object.keys(solved).reduce(
            (memo, value) => ({ ...memo, [value]: false }),
            {}
          )
        ),
      2000
    );

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    cards
      .filter(({ card }) => !solved[card])
      .forEach(
        ({ card }) =>
          cards.filter(
            (filteredCard) => filteredCard.card === card && filteredCard.open
          ).length === 2 &&
          setSolved({
            ...solved,
            [card]: true,
          })
      );

    const timer = setTimeout(() => {
      setCards(
        cards.map((card, i) =>
          !solved[card.card] && lastOpenedCard !== i
            ? {
                ...card,
                open: false,
              }
            : card
        )
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [cards]);

  return (
    <>
      <NormalizeCss />

      <Wrapper>
        <InnerWrapper>
          {cards.map(({ card, open, color }, i) => (
            <Card
              key={i}
              name={card}
              open={solved[card] || open}
              color={color}
              setLastOpened={() => setLastOpenedCard(i)}
              toggleOpen={
                solved[card]
                  ? () => null
                  : () =>
                      setCards(
                        cards.map((card, j) =>
                          i === j
                            ? {
                                card: card.card,
                                open: !card.open,
                                color: card.color,
                              }
                            : card
                        )
                      )
              }
            />
          ))}
        </InnerWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
  width: 80%;
  height: 60%;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(6, 3fr);
  grid-template-rows: repeat(3, 3fr);
`;

export default App;
