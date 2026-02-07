import { itemDict } from "../Item";

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

export default function TagCount(props: {equip: EquipItems}) {
  const items = [props.equip.TL, props.equip.TM, props.equip.TR, props.equip.ML, props.equip.M, props.equip.MR, props.equip.BL, props.equip.BM, props.equip.BR, props.equip.weapon, props.equip.offhand, props.equip.trinket];
  const tagCounts: Map<String, number> = new Map();
  const tags = items.map((i) => itemDict.get(i ?? "")?.tags ?? []);
  tags.forEach((tList) => {
    tList.forEach((t) => {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
    });
  })
  
  const entries = [...tagCounts.entries()].map(([tag, count]) => {
    return <div class="item-desc"><b>{tag}: </b>{count}</div>
  })
  return (
    <div class="bordered-cell">
      {entries}
    </div>
  )
}