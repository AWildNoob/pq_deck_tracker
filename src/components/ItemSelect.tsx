import Slot from "../Slot";
import { itemDict } from "../Item";

export default function ItemSelect(props: { slot: Slot, slotName: string, item: string | null, setItem: (i: string | null) => void}) {
  let itemOpts = [...itemDict.values()].filter(i => i.slots.indexOf(props.slot) !== -1).map(i => i.name);
  itemOpts.sort();

  let itemOptJSX = [];
  itemOptJSX.push(<option value="">(none)</option>)
  itemOpts.forEach((i) => {
    itemOptJSX.push(<option value={i}>{i}</option>);
  });

  const currItem = itemDict.get(props.item ?? "");
  //const itemName = currItem?.name ?? "(Missing Name)";
  //const itemBlurb = currItem?.blurb ?? "";
  const itemDesc = currItem?.desc ?? "";
  const itemTags = currItem?.tags?.map((t) => `[${t}]`).join(" ");

  const isEmpty = (currItem ?? "") === "";

  return (
    <div class="bordered-cell" style={{
        //width: "15svw",
        minHeight: 0,
        //height: "20svh"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
        minHeight: 0
      }}>
        <select
          style={{
            width: "90%",
            marginTop: "4px",
            alignSelf: "center"
          }}
          onChange={e => props.setItem(e.currentTarget.value)}
          value={props.item ?? ""}
        >
          {itemOptJSX}
        </select>
        <div style={{
          overflowY: "auto",
          marginBottom: "4px"
        }}>
          <div class={isEmpty ? "slot-desc" : "item-desc"}><small>{isEmpty ? props.slotName : itemDesc}</small></div>
          <small><b>{itemTags ? "Tags: " : ""}</b>{itemTags}</small>
        </div>
      </div>
    </div>
  );
}
