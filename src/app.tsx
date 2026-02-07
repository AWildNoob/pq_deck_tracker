import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import ItemSelect from './components/ItemSelect'
import Slot from './Slot'
import EquipSelect from './components/EquipSelect'
import GlobalContext from './contexts/GlobalContext'

interface equipItems {
  TL: string | null,
  TM: string | null,
  TR: string | null,
  ML: string | null,
  M: string | null,
  MR: string | null,
  BL: string | null,
  BM: string | null,
  BR: string | null,
  weapon: string | null,
  offhand: string | null,
  trinket: string | null,
}

export function App() {
  const [state, setState] =
  return (
    <GlobalContext.Provider value=>
      <EquipSelect
        state={state}
        setState={setState}
      />
    </GlobalContext.Provider>
  )
}
