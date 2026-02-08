import type { EquipItems } from "../contexts/GlobalContext";
import { itemDict } from "../Item";
import Slot from "../Slot";

const baseDeckAtk = ["block_u_punch_l", "punch_lr", "haymaker", "block_u_punch_u", "block_r_kick_d", "wide_kick", "wide_right", "uppercut"]
const baseDeckDef = ["block_l", "block_ur", "block_ur", "block_ud", "block_lr", "block_ud", "block_dl", "block_udlr"]
const baseDeckSpecial = ["expound", "expound", "expound", "rabbit_assist", "fish_assist", "browbeat"];

function Card(props: {id: string}) {
  const src = `/cards/${props.id}.png`;
  const altTextName = props.id.split("_").map((s) => s.substring(0, 1).toUpperCase() + s.substring(1)).join(" ");
  return (
    <img src={src} alt={altTextName} style={{
      height: "100%",
      width: "100%",
      overflow: "hidden",
      textOverflow: "clip"
    }}/>
  );
}

export default function CardDisplay(props: {equip: EquipItems}) {
  const slots = [
    { iSlot: Slot.TL, item: props.equip.TL },
    { iSlot: Slot.TM, item: props.equip.TM },
    { iSlot: Slot.TR, item: props.equip.TR },
    { iSlot: Slot.ML, item: props.equip.ML },
    { iSlot: Slot.M, item: props.equip.M },
    { iSlot: Slot.MR, item: props.equip.MR },
    { iSlot: Slot.BL, item: props.equip.BL },
    { iSlot: Slot.BM, item: props.equip.BM },
    { iSlot: Slot.BR, item: props.equip.BR },
    { iSlot: Slot.W, item: props.equip.weapon },
    { iSlot: Slot.OH, item: props.equip.offhand },
    { iSlot: Slot.TRINKET, item: props.equip.trinket }
  ]

  // Add cards from equipment
  let equipAtk: string[] = [];
  let equipDef: string[] = [];
  let equipExtra: string[] = [];
  slots.forEach(({iSlot, item}) => {
    const itemData = itemDict.get(item ?? "");
    let itemCards = itemData?.cards ?? [];
    itemData?.slotCards?.forEach(({slot, cards}) => { // Check slot-specific cards
      if (slot === iSlot) {
        itemCards = itemCards.concat(cards);
      }
    });

    // Categorize cards based on prefix
    itemCards.forEach((c) => {
      if (c.startsWith("A|")) {
        equipAtk.push(c.substring(2))
      }
      else if (c.startsWith("D|")) {
        equipDef.push(c.substring(2))
      }
      else if (c.startsWith("+|")) {
        equipExtra.push(c.substring(2))
      }
      else {
        console.log(`Uncategorized card: ${c}`)
      }
    })
  });

  let deck: string[] = [];
  deck = deck.concat(equipAtk);
  deck = deck.concat(baseDeckAtk.slice(equipAtk.length));
  deck = deck.concat(baseDeckSpecial);
  deck = deck.concat(equipDef);
  deck = deck.concat(baseDeckDef.slice(equipDef.length));
  deck = deck.concat(equipExtra);
  const cards = deck.map((c) => <Card id={c}/>);

  return (
    <div class="bordered-cell" style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      width: "100%"
    }}>
      {cards}
    </div>
  )
}