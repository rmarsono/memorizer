const hexLetters = '0123456789ABCDEF';

export const generateRandomColor = () =>
  '#' +
  Array.from({ length: 6 })
    .map<string>(
      () => hexLetters[Math.floor(Math.random() * hexLetters.length)]
    )
    .join('');
