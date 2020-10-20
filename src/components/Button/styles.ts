import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;

  margin: 7px 0;
  padding: 10px;

  border-radius: 5px;

  font-weight: 500;
  color: ${({theme}) => theme.colors.tertiary};
  background-color: ${({theme}) => theme.colors.warning};

  transition: opacity .3s;

  &:hover {
    opacity: .7;
  }
`;
