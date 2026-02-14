import { useState } from 'preact/hooks'
import './app.css'
import EquipSelect from './components/EquipSelect'
import TagCount from './components/TagCount'
import CardDisplay from './components/CardDisplay'
import { defaultState, type EquipItems } from './contexts/GlobalContext'
import Controls from './components/Controls'

export function App() {
  const [state, setState] = useState<EquipItems>(defaultState);
  const resetEquip = () => setState(defaultState);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      height: "90svh"
    }}>
      <div style={{
          minHeight: "100%"
      }}>
        <EquipSelect
          state={state}
          setState={setState}
        />
      </div>
      <div id="equip-select" style={{
        maxHeight: "90svh",
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "9fr min-content"
      }}>
        <CardDisplay equip={state}/>
        <Controls state={state} setState={setState}/>
      </div>
    </div>
  )
}
