import { useState } from 'react'
import './App.css'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from './store/store'
import { selectMenus, startLoading } from './store/slices/menus/menuSlice'
import { getModules } from './store/slices/menus/thunks'
import { Button } from 'antd'


function App() {
  const [count, setCount] = useState(0)
  const { isLoading, modules } = useAppSelector(selectMenus)
  const dispatch = useAppDispatch()



  return (
    <div className="App">
      <Button onClick={()=>dispatch(getModules())}>
        Añadir nuevos modules
      </Button>
      <h3>{modules.toString()}</h3>
    </div>
  )
}

export default App
