import { useState, type StateUpdater, type Dispatch } from "preact/hooks";
import type { EquipItems } from "../contexts/GlobalContext";
import { itemDict } from "../Item";
import Slot from "../Slot";
import cardLinkList from "../data/linked_cards.json";

const baseDeckAtk = ["block_u_punch_l", "punch_lr", "haymaker", "block_u_punch_u", "block_r_kick_d", "wide_kick", "wide_right", "uppercut"]
const baseDeckDef = ["block_l", "block_ur", "block_ur", "block_ud", "block_lr", "block_ud", "block_dl", "block_udlr"]
const baseDeckSpecial = ["expound", "expound", "expound", "rabbit_assist", "fish_assist", "browbeat"];

const cardLinks = getCardLinks(cardLinkList);

const baseURL = import.meta.env.BASE_URL

function getCardLinks(cardLinkList: {card: string, linkedCards: string[]}[]) {
  const m = new Map<string, string[]>();
  cardLinkList.forEach(({card, linkedCards}) => {
    m.set(card, linkedCards);
  });
  return m;
}

function Card(props: {idx: number, cardId: string, selected: number | null, setSelected: Dispatch<StateUpdater<number|null>>}) {
  const baseImgUrl = `${baseURL === "/" ? "" : baseURL}/cards`;
  const src = `${baseImgUrl}/${props.cardId}.png`;
  const altTextName = props.cardId.split("_").map((s) => s.substring(0, 1).toUpperCase() + s.substring(1)).join(" ");
  if (props.idx === props.selected) {
    // Determine if there are associated cards
    const expCardList = cardLinks.get(props.cardId) ?? [props.cardId];
    const expCardImgs = expCardList.map((cId) => {
      return (
        <img
          src={`${baseImgUrl}/${cId}.png`}
          alt={altTextName}
          style={{
            height: "40svh",
            width: "30svh",
            overflow: "hidden",
            textOverflow: "clip"
          }}
        />
      );
    });
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative"
        }}
      >
        <div
          onClick={() => props.setSelected(null)}
          style={{
            display: "flex",
            position: "absolute",
            left: "0px"
          }}
        >
          {expCardImgs}
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={altTextName}
      onClick={() => props.setSelected(props.idx)}
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        textOverflow: "clip"
      }}
    />
  );
}

export default function CardDisplay(props: {equip: EquipItems}) {
  const [selected, setSelected] = useState<number|null>(null);
  console.log(`selected: ${selected}`);

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
  const cards = deck.map((c, idx) => <Card idx={idx} cardId={c} selected={selected} setSelected={setSelected}/>);

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