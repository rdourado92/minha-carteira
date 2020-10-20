import styled from 'styled-components'

interface ITitleContainerProps {
  lineColor: string;
}

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-bottom: 25px;

`;

export const TitleContainer = styled.div<ITitleContainerProps>`

  > h1 {
    color: ${props => props.theme.colors.white};
  
    &::after {
      content: '';
      width: 55px;
      border-bottom: 10px solid ${({ lineColor }) => lineColor};
      display: block;
    }
  }
`;

export const Controllers = styled.div`
  display: flex;
`;