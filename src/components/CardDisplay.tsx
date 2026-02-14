import { useState, type StateUpdater, type Dispatch, useEffect } from "preact/hooks";
import type { EquipItems } from "../contexts/GlobalContext";
import { itemDict } from "../Item";
import Slot from "../Slot";
import cardLinkList from "../data/linked_cards.json";

const baseURL = import.meta.env.BASE_URL;
const baseImgUrl = `${baseURL === "/" ? "" : baseURL}/cards`;

const cardLinks = getCardLinks(cardLinkList);

function getCardLinks(cardLinkList: {card: string, linkedCards: string[]}[]) {
  const m = new Map<string, string[]>();
  cardLinkList.forEach(({card, linkedCards}) => {
    m.set(card, linkedCards);
  });
  return m;
}

function Card(props: {idx: number, cardId: string, selected: number | null, setSelected: Dispatch<StateUpdater<number|null>>}) {
  const src = `${baseImgUrl}/${props.cardId}.png`;
  const altTextName = props.cardId.split("_").map((s) => s.substring(0, 1).toUpperCase() + s.substring(1)).join(" ");
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

function ExpandedCardView(props: {deck: string[], selected: number | null, setSelected: Dispatch<StateUpdater<number|null>>}) {
  if (props.selected === null) {
    return <div></div>
  }
  // Determine if there are associated cards, get images for all
  const cardId = props.deck[props.selected];
  const expCardList = cardLinks.get(cardId) ?? [cardId];
  const expCardImgs = expCardList.map((cId) => {
    const src = `${baseImgUrl}/${cId}.png`;
    const altTextName = cId.split("_").map((s) => s.substring(0, 1).toUpperCase() + s.substring(1)).join(" ");
    return (
      <img
        src={src}
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
      onClick={() => props.setSelected(null)}
      style={{
        background: "rgb(0 0 0 / 75%)",
        zIndex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {expCardImgs}
    </div>
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
  ];
  const baseDeck = props.equip.baseDeck;

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
  deck = deck.concat(baseDeck.atk.slice(equipAtk.length));
  deck = deck.concat(baseDeck.special);
  deck = deck.concat(equipDef);
  deck = deck.concat(baseDeck.def.slice(equipDef.length));
  deck = deck.concat(equipExtra);

  // Card selection
  const [selected, setSelected] = useState<number|null>(null);
  useEffect(() => {
    setSelected(null);
  }, [props]);
  const cards = deck.map((c, idx) => <Card idx={idx} cardId={c} selected={selected} setSelected={setSelected}/>);

  return (
    <div class="bordered-cell" style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      width: "100%",
      position: "relative"
    }}>
      {cards}
      <ExpandedCardView
        deck={deck}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}