export const formatCurrency = (current: number): string => (
  current.toLocaleString(
    'pt-br',
    {
      style: 'currency',
      currency: 'BRL'
    }
  )
) 

export const formatDate = (date: string): string => {
  const dateFormatted = new Date(date);

  const day = (`0${dateFormatted.getDate()}`).substr(-2);
  const month = (`0${dateFormatted.getMonth() + 1}`).substr(-2);
  const year = dateFormatted.getFullYear();

  return `${day}/${month}/${year}`;
}