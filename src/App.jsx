import { useState } from 'react'
import { SearchBar } from './features/search/SearchBar'
import UserCard from './features/search/UserCard'

const dummyUsers = [
  { id: 1, login: "torvalds", avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4" },
  { id: 2, login: "gaearon", avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4" },
  { id: 3, login: "dahiya001rohit", avatar_url: "https://avatars.githubusercontent.com/u/184503022?v=4" },
]

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div style={{ padding: "40px", maxWidth: "300px" }}>
      <h2>UserCard test:</h2>
      {dummyUsers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={selectedUser === user.login}
          onClick={() => setSelectedUser(user.login)}
        />
      ))}
      <p>Selected: {selectedUser}</p>
    </div>
  )
}

