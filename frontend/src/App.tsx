
function App() {

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl text-amber-500">yo</p>
      <div className="bg-amber-700 w-3xl">hello this is a sample usage of tailwind</div>
      <p className="text-xs text-blue-800 md:bg-amber-400 bg-amber-800">as you can see, it is much easier instead of having seperate css file</p>
      <p>what md: means is, if screen is greater or equal to 'medium' size, then use bg-amber-400 colour. Else use 800</p>
    </div>
  )
}

export default App
