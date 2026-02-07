import Slot from "../Slot";
import { itemDict } from "../Item";
import { useState, type StateUpdater, type Dispatch } from "preact/hooks";

export default function ItemSelect(props: { slot: Slot, item: string, setItem: Dispatch<StateUpdater<string>>}) {
  //const [item, setItem] = useState("");

  let itemOpts = [...itemDict.values()].filter(i => i.slots.indexOf(props.slot) !== -1).map(i => i.name);
  itemOpts.sort();

  let itemOptJSX = [];
  itemOptJSX.push(<option value="">(none)</option>)
  itemOpts.forEach((i) => {
    itemOptJSX.push(<option value={i}>{i}</option>);
  });

  const currItem = itemDict.get(props.item);
  const itemName = currItem?.name ?? "(None)";
  const itemBlurb = currItem?.blurb ?? "";
  const itemDesc = currItem?.desc ?? "";

  return (
    <div>
      <div style="border: 2px; border-style: solid;">
        <select onChange={e => props.setItem(e.currentTarget.value)}>
          {itemOptJSX}
        </select>
        <p><i>{itemBlurb}</i></p>
        <p>{itemDesc}</p>
      </div>
    </div>
  );
}
