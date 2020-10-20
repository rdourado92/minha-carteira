import React, { useMemo, useState } from 'react'

import ContainerHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/MessageBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import listOfMonths from '../../utils/Months'

import IconDollar from '../../assets/dollar.svg'
import IconArrowUp from '../../assets/arrow-up.svg'
import IconArrowDown from '../../assets/arrow-down.svg'
import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'



import { Container, Content } from './styles'
import PieChart from '../../components/PieChart'

const DashBoard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  
  const months = useMemo(() => (
    listOfMonths.map((month, index) => ({
      value: index + 1,
      label: month
    }))
  ), [])

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if(!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    })

    return uniqueYears.map(year => ({
      value: year,
      label: year,
    })).reverse();

  }, [])

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if( month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch(error) {
          throw new Error('Invalid amount! Amount must be number.')
        }
      }
    })
    
    return total;
  },[monthSelected, yearSelected])

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if( month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch(error) {
          throw new Error('Invalid amount! Amount must be number.')
        }
      }
    })

    return total;
  },[monthSelected, yearSelected])

  const totalBalance = useMemo(() => (
    totalGains - totalExpenses
  ),[totalGains, totalExpenses])

  const message = useMemo(() => {
    if(totalBalance < 0) {
      return {
        title:"Que triste!",
        description:"Neste mês, você gastou mais do que deveria.",
        footerText:"Verifique seus gastos e tente cortar os gastos desnecessários.",
        icon:sadImg,
      }
    } else if (totalBalance === 0) {
      return {
        title:"Ufaa !",
        description:"Neste mês você gastou exatamente o que ganhou.",
        footerText:"Tenha cuidado. No próximo tente poupar o seu dinheiro",
        icon:grinningImg,
      }
    } else {
      return {
        title:"Muito bem",
        description:"Sua carteira está positiva",
        footerText:"Continue assim. Considere investir seu saldo.",
        icon:happyImg,
      }
    }
  }, [totalBalance])

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = total !== 0 ? (totalGains/total) * 100 : 0;
    const percentExpenses = total !== 0 ? (totalExpenses/total) * 100 : 0;

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: Number(percentGains.toFixed(0)),
        color: '#f7931b',
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(0)),
        color: '#e44c4e',
      }
    ]

    return data;
  }, [totalGains, totalExpenses])

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    }catch(error) { 
      throw new Error('invalid year value. Is accept 0 - 24.')
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    }catch(error) { 
      throw new Error('invalid year value. Is accept integer numbers.')
    }
  }

  return (
    <Container>
      <ContainerHeader title="Dashboard" lineColor="#F7931b">
      <SelectInput 
          options={months} 
          onChange={e => handleMonthSelected(e.target.value)} 
          defaultValue={monthSelected}
          />
        <SelectInput 
          options={years} 
          onChange={e => handleYearSelected(e.target.value)} 
          defaultValue={yearSelected}
          />
      </ContainerHeader>

      <Content>
        <WalletBox 
          color="#4e41f0"
          title="saldo" 
          amount={totalBalance} 
          footerLabel="atualizar com base nas entradas e saídas"
          icon={IconDollar} 
          />

        <WalletBox 
          color="#f7931b"
          title="entradas" 
          amount={totalGains} 
          footerLabel="atualizar com base nas entradas e saídas"
          icon={IconArrowUp} 
          />

        <WalletBox 
          color="#e44c4e"
          title="saidas" 
          amount={totalExpenses} 
          footerLabel="atualizar com base nas entradas e saídas"
          icon={IconArrowDown} 
          />

        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
          />

        <PieChart data={relationExpensesVersusGains} />
      </Content>
    </Container>
  )
}

export default DashBoard;
