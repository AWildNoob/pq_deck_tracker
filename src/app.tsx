import { useState } from 'preact/hooks'
import './app.css'
import EquipSelect from './components/EquipSelect'
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
  const blankState = {
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
  };
  const [state, setState] = useState<EquipItems>(blankState);
  const resetEquip = () => setState(blankState);
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
        gridTemplateAreas: "\"a a\" \"b c\"",
        gridTemplateRows: "9fr min-content",
        gridTemplateColumns: "1fr 9fr"
      }}>
        <div style={{
          gridArea: "a"
        }}>
          <CardDisplay equip={state}/>
        </div>
        <button
          onClick={resetEquip}
          style={{
            gridArea: "b"
        }}>Reset</button>
        <div style={{
          gridArea: "c"
        }}>
          <TagCount
            equip={state}
          />
        </div>
      </div>
    </div>
  )
}
