import Config from './config'

function App() {
  return (
    <div className="flex">
      <h1 className="text-3xl font-bold underline">{JSON.stringify(Config)}</h1>
    </div>
  )
}

export default App
