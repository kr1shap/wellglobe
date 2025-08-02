import VaxCard from './components/vaxCard';

function App() {

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl text-amber-500">yo</p>
      <div className="bg-amber-700 w-3xl">hello this is a sample usage of tailwind</div>
      <p>what md: means is, if screen is greater or equal to 'medium' size, then use bg-amber-400 colour. Else use 800</p>
      <VaxCard/>
    </div>
  )
}

export default App
