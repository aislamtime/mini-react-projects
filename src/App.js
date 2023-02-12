import React from 'react'
import './index.scss'

import { Collection } from './components/Collection'

function App() {
  const [collections, setCollections] = React.useState([])
  const [category, setCategory] = React.useState(0)
  const [searchValue, setSearchValue] = React.useState('')
  const [page, setPage] = React.useState(1)

  const pages = [1, 2, 3]

  const allCatogories = ['Все', 'Горы', 'Море', 'Архитектура', 'Города']

  React.useEffect(() => {
    fetch(
      `https://63d12d27120b32bbe8f2dbf8.mockapi.io/collection_for_mini_progects?${
        category !== 0 ? 'category=' + category : ''
      }&p=${page}&l=3`,
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((error) => {
        console.warn(error)
        alert('Произошла ошибка при получении колекции :(')
      })
  }, [category, page])

  console.log(collections)

  const onChangeCategory = (index) => setCategory(index)

  //const tryCollections =
  //  category === 0 ? collections : collections.filter((item) => item.category === category)

  return (
    <div className='App'>
      <h1>Моя коллекция фотографий</h1>
      <div className='top'>
        <ul className='tags'>
          {allCatogories.map((item, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={category === i ? 'active' : ''}>
              {item}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          className='search-input'
          placeholder='Поиск по названию'
        />
      </div>
      <div className='content'>
        {collections
          .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item) => (
            <Collection key={item.name} name={item.name} images={item.photos} />
          ))}
      </div>
      <ul className='pagination'>
        {pages.map((item) => (
          <li key={item} onClick={() => setPage(item)} className={page === item ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
