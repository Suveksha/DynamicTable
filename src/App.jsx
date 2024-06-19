import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'
import { TableProvider } from './context/TableContext'
import Modal from './components/Modal'
import ToggleList from './components/ToggleList'
import Export from './components/Export'

function App() {

  return (
    <TableProvider>
      <Table/>
      <Modal/>
      <ToggleList/>
      <Export/>
    </TableProvider>
  )
}

export default App
