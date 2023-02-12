import React from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [invates, setInvates] = React.useState([])
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((error) => console.warn(error))
      .finally(() => setIsLoading(false))
  }, [])

  const onClickInvate = (id) => {
    if (invates.includes(id)) setInvates(invates.filter((_id) => _id !== id))
    else setInvates([...invates, id])
  }

  return (
    <div className='App'>
      {success ? (
        <Success count={invates.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          invates={invates}
          onClickInvate={onClickInvate}
          setSuccess={setSuccess}
        />
      )}
    </div>
  )
}

export default App
