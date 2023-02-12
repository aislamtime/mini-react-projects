import React from 'react'
import { Block } from './Block'
import './index.scss'

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('USD')
  const [toCurrency, setToCurrency] = React.useState('RUB')
  const [fromPrice, setFromPrice] = React.useState('')
  const [toPrice, setToPrice] = React.useState('')

  const ratesRef = React.useRef({})

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = { ...json.rates, RUB: 1 }
        onChangeFromPrice(1)
      })
      .catch((error) => {
        console.warn(error)
        alert('Не удалось получить курс валют с сервера :(')
      })
  }, [])

  const onChangeFromPrice = (value) => {
    setFromPrice(value)
    if (fromCurrency === toCurrency) setToPrice(value)
    else {
      const price = value / ratesRef.current[fromCurrency]
      const result = price * ratesRef.current[toCurrency]
      setToPrice(result.toFixed(3))
    }
  }
  const onChangeToPrice = (value) => {
    setToPrice(value)
    if (fromCurrency === toCurrency) setFromPrice(value)
    else {
      const price = value / ratesRef.current[toCurrency]
      const result = price * ratesRef.current[fromCurrency]
      //const price1 = (ratesRef.current[toCurrency] / ratesRef.current[fromCurrency]) * value
      setFromPrice(result.toFixed(3))
    }
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className='App'>
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={(cur) => setFromCurrency(cur)}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={(cur) => setToCurrency(cur)}
        onChangeValue={onChangeToPrice}
      />
    </div>
  )
}

export default App
