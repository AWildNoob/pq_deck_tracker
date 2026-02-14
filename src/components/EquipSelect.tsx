import { type Dispatch } from "preact/hooks";
import Slot from "../Slot";
import ItemSelect from "./ItemSelect";
import type { EquipItems } from "../contexts/GlobalContext";

export default function EquipSelect(props: {state: EquipItems, setState: Dispatch<EquipItems>}) {
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
      height: "100%"
    }}>
      <ItemSelect
        slot={Slot.TL}
        slotName="Lower Face"
        item={props.state.TL}
        setItem={setTL}
      />
      <ItemSelect
        slot={Slot.TM}
        slotName="Upper Face"
        item={props.state.TM}
        setItem={setTM}
      />
      <ItemSelect
        slot={Slot.TR}
        slotName="Scalp/Head"
        item={props.state.TR}
        setItem={setTR}
      />
      <ItemSelect
        slot={Slot.ML}
        slotName="Neck & Shoulder"
        item={props.state.ML}
        setItem={setML}
      />
      <ItemSelect
        slot={Slot.M}
        slotName="Torso"
        item={props.state.M}
        setItem={setM}
      />
      <ItemSelect
        slot={Slot.MR}
        slotName="Back/Frame"
        item={props.state.MR}
        setItem={setMR}
      />
      <ItemSelect
        slot={Slot.BL}
        slotName="Arm & Hand"
        item={props.state.BL}
        setItem={setBL}
      />
      <ItemSelect
        slot={Slot.BM}
        slotName="Lower Body"
        item={props.state.BM}
        setItem={setBM}
      />
      <ItemSelect
        slot={Slot.BR}
        slotName="Foot"
        item={props.state.BR}
        setItem={setBR}
      />
      <ItemSelect
        slot={Slot.W}
        slotName="Weapon"
        item={props.state.weapon}
        setItem={setWeapon}
      />
      <ItemSelect
        slot={Slot.OH}
        slotName="Offhand"
        item={props.state.offhand}
        setItem={setOffhand}
      />
    </div>
  )
}