import React from 'react';
import CountUp from 'react-countup'

import { Container } from './styles';

interface IWalletBox {
  title: string;
  amount: number;
  footerLabel: string;
  icon: string;
  color: string;
}

const WalletBox: React.FC<IWalletBox> = ({
  title,
  amount,
  footerLabel,
  icon,
  color,
}) => {
  return (
  <Container color={color}>
    <span>{title}</span>
    <h1>
      <CountUp 
        end={amount}
        prefix="R$ "
        separator="."
        decimal=","
        decimals={2}
      />
    </h1>

    <small>{footerLabel}</small>

    <img src={icon} alt={title} />
  </Container>  
  );
}

export default WalletBox;