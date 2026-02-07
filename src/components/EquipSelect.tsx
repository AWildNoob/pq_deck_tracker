import { useContext } from "preact/hooks";
import Slot from "../Slot";
import GlobalContext from "../contexts/GlobalContext";
import ItemSelect from "./ItemSelect";

export default function EquipSelect(props: {state: string, setState: any}) {
  const { equip, setEquip } = useContext(GlobalContext);
  return (
    <div>
    </div>
  )
}