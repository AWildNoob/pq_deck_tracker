import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import ItemSelect from './components/ItemSelect'
import Slot from './Slot'
import EquipSelect from './components/EquipSelect'
import GlobalContext from './contexts/GlobalContext'
import TagCount from './components/TagCount'
import CardDisplay from './components/CardDisplay'

interface EquipItems {
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
  const [state, setState] = useState<EquipItems>({
    TL: null,
    TM: null,
    TR: null,
    ML: null,
    M: null,
    MR: null,
    BL: null,
    BM: null,
    BR: null,
    weapon: null,
    offhand: null,
    trinket: null,
  });
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      height: "90svh"
    }}>
      <div style={{
        height: "100%",
        width: "100%",
        display: "flex"
      }}>
        <div 
          style={{
            maxHeight: "90svh",
            //width: "60svw"
          }}>
          <EquipSelect
            state={state}
            setState={setState}
          />
          <TagCount
            equip={state}
          />
        </div>
      </div>
      <CardDisplay equip={state}/>
    </div>
  )
}
