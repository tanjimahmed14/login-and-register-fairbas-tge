import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './componints/Header/Header'

function App() {


  return (
    <>
      <Header></Header>
      <div className='w-2/4 mx-auto'>
      <Outlet></Outlet>
      </div>



    </>
  )
}

export default App
