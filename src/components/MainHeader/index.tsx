import React, { useMemo } from 'react'

import Toggle from '../Toggle'
import emojis from '../../utils/emojis'

import { Container, Profile, Welcome, UserName } from './styles'
import { useTheme } from '../../hooks/theme'

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  const emoji = useMemo(() => {
    const i = Math.floor(Math.random() * emojis.length);
    return emojis[i];
  },[])

  return (
    <Container>
      <Toggle 
        labelLeft="Light"
        labelRight="Dark"
        checked={!!(theme.title === 'dark')}
        onChange={toggleTheme}/>

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Robson Dourado</UserName>
      </Profile>
    </Container>
  )
}

export default MainHeader;