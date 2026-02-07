import { useContext, type StateUpdater, type Dispatch } from "preact/hooks";
import Slot from "../Slot";
import GlobalContext from "../contexts/GlobalContext";
import ItemSelect from "./ItemSelect";

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

export default function EquipSelect(props: {state: EquipItems, setState: Dispatch<StateUpdater<EquipItems>>}) {
  const setTL = (i: string | null) => props.setState({...props.state, TL: i});
  const setTM = (i: string | null) => props.setState({...props.state, TM: i});
  const setTR = (i: string | null) => props.setState({...props.state, TR: i});
  const setML = (i: string | null) => props.setState({...props.state, ML: i});
  const setM = (i: string | null) => props.setState({...props.state, M: i});
  const setMR = (i: string | null) => props.setState({...props.state, MR: i});
  const setBL = (i: string | null) => props.setState({...props.state, BL: i});
  const setBM = (i: string | null) => props.setState({...props.state, BM: i});
  const setBR = (i: string | null) => props.setState({...props.state, BR: i});
  const setWeapon = (i: string | null) => props.setState({...props.state, weapon: i});
  const setOffhand = (i: string | null) => props.setState({...props.state, offhand: i});
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      height: "90%"
    }}>
      <ItemSelect
        slot={Slot.TL}
        item={props.state.TL}
        setItem={setTL}
      />
      <ItemSelect
        slot={Slot.TM}
        item={props.state.TM}
        setItem={setTM}
      />
      <ItemSelect
        slot={Slot.TR}
        item={props.state.TR}
        setItem={setTR}
      />
      <ItemSelect
        slot={Slot.ML}
        item={props.state.ML}
        setItem={setML}
      />
      <ItemSelect
        slot={Slot.M}
        item={props.state.M}
        setItem={setM}
      />
      <ItemSelect
        slot={Slot.MR}
        item={props.state.MR}
        setItem={setMR}
      />
      <ItemSelect
        slot={Slot.BL}
        item={props.state.BL}
        setItem={setBL}
      />
      <ItemSelect
        slot={Slot.BM}
        item={props.state.BM}
        setItem={setBM}
      />
      <ItemSelect
        slot={Slot.BR}
        item={props.state.BR}
        setItem={setBR}
      />
      <ItemSelect
        slot={Slot.W}
        item={props.state.weapon}
        setItem={setWeapon}
      />
      <ItemSelect
        slot={Slot.OH}
        item={props.state.offhand}
        setItem={setOffhand}
      />
    </div>
  )
}