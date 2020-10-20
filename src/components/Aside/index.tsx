import React from 'react'
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from 'react-icons/md'

import Logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'

import { 
    Container, 
    Header, 
    LogoImg, 
    Title, 
    MenuContainer,
    MenuItemLink ,
    MenuItemButton,
  } from './styles'

const Aside: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <LogoImg src={Logo} alt="Logo Minha Carteira" />
        <Title>
          Minha Carteira
        </Title>
      </Header>
      <MenuContainer>
        <MenuItemLink to="/">
          <MdDashboard />
          DashBoard
        </MenuItemLink>
        <MenuItemLink to="/list/entry-balance">
          <MdArrowUpward />
          Entradas
        </MenuItemLink>
        <MenuItemLink to="/list/exit-balance">
          <MdArrowDownward />
          Saidas
        </MenuItemLink>
        <MenuItemButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  )
}

export default Aside;