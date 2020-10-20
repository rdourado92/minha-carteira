import React, { useEffect, useMemo, useState } from 'react'
import { uuid } from 'uuidv4';

import ContentHeader from '../../components/ContentHeader'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'
import SelectInput from '../../components/SelectInput'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import { formatDate, formatCurrency } from '../../utils/formatData'
import listOfMonths from '../../utils/Months'

import { Container, Content, Filters } from './styles'

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const { type } = match.params;
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState<string[]>(['recorrente', 'eventual']);

  const { title, lineColor, listData } = useMemo(() => (
    type === 'entry-balance' ? {
      title: 'Entradas',
      lineColor: '#4e41f0',
      listData: gains,
    } : {
      title: 'Saídas',
      lineColor: '#e44c4e',
      listData: expenses,
    }
  ),[type])

  const months = useMemo(() => (
    listOfMonths.map((month, index) => ({
      value: index + 1,
      label: month
    }))
  ), [])

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach(item => {
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

  }, [listData])

  useEffect(() => {
    const filteredData = listData.filter(item => {
      const date = new Date(item.date);
      const month = (date.getMonth() + 1);
      const year = date.getFullYear();

      return month === monthSelected && 
        year === yearSelected && 
        frequencyFilterSelected.includes(item.frequency);
    })
    
    const response = filteredData.map(item => ({
      id: uuid(),
      description: item.description,
      amountFormatted: formatCurrency(Number(item.amount)),
      frequency: item.frequency,
      dateFormatted: formatDate(item.date),
      tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e',
    }));

    setData(response);
  }, [data.length, listData, monthSelected, frequencyFilterSelected, yearSelected])

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

    if (alreadySelected >= 0 ) {
      const filtered = frequencyFilterSelected.filter(item => item !== frequency);
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected(prev => [...prev, frequency]);
    }
  }

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
      <ContentHeader title={title} lineColor={lineColor}>
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
      </ContentHeader>

      <Filters>
        <button 
          type="button"
          className={`tag-filter tag-filter-recurrent 
          ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
          >
            Recorrentes
        </button>

        <button 
          type="button"
          className={`tag-filter tag-filter-eventual 
          ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
          >
            Evetuais
        </button>
      </Filters>

      <Content>
        {data.map(item => (
            <HistoryFinanceCard 
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dateFormatted}
              amount={item.amountFormatted}
            />
          ))
        }
      </Content>
    </Container>
  )
}

export default List;
