import React from 'react';
import styled from 'styled-components';

export const Card = ({
  name,
  open,
  color,
  toggleOpen,
}: {
  name: string;
  open: boolean;
  color: string;
  toggleOpen: () => void;
}): JSX.Element => (
  <Wrapper color={color} onClick={() => toggleOpen()}>
    {open ? (
      <CardFront>
        <span>{name}</span>
      </CardFront>
    ) : (
      <CardBack></CardBack>
    )}
  </Wrapper>
);

const Wrapper = styled.button`
  border: 8px solid black;
  background-color: ${(props: { color: string }) => props.color};
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: 10px;
`;

const CardBack = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
`;
