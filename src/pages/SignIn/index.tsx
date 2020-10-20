import React, { useState } from 'react'

import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'

import { Container, Logo, Form, FormTitle } from './styles'

const SignIn: React.FC = () => {
  const { signIn } = useAuth();  
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha Carteira" />
        <h2>Minha Carteira</h2>
      </Logo>

      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>

        <Input 
          type="email"
          placeholder="E-mail"
          required 
          onChange={e => setEmail(e.target.value)}
          value={email}
          autoFocus
        />

        <Input 
          type="password"
          placeholder="Senha"
          required 
          onChange={e => setPassword(e.target.value)}
          value={password}
        />

        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  )
}

export default SignIn;
