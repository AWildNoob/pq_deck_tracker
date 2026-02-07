import Slot from "./Slot";
import itemData from "./data/items.json"

export type Item = {
  name: string,
  slots: Slot[],
  blurb: string,
  desc: string,
  tags?: string[],
  cards?: string[],
  slotCards?: {
    slot: Slot,
    cards: string[]
  }[]
}
type JSONItem = {
  name: string,
  slots: string | string[],
  blurb: string,
  desc: string,
  tags?: string | string[],
  cards?: string[],
  slotCards?: {
    slot: string,
    cards: string[]
  }[]
}

export const itemDict: Map<string, Item> = new Map();
itemData.forEach((i: JSONItem) => {
  if (typeof(i.tags) === "string") {
    i.tags = [i.tags]
  }
  if (typeof(i.slots) === "string") {
    i.slots = [i.slots]
  }
  const parsedSlots: Slot[] = [];
  i.slots.forEach((s) => {
    if (s === "ROW_T") {
      parsedSlots.push(Slot.TL, Slot.TM, Slot.TR);
    }
    else if (s === "ROW_M") {
      parsedSlots.push(Slot.ML, Slot.M, Slot.MR);
    }
    else if (s === "ROW_B") {
      parsedSlots.push(Slot.BL, Slot.BM, Slot.BR);
    }
    else if (s === "EQUIP") {
      parsedSlots.push(Slot.TL, Slot.TM, Slot.TR, Slot.ML, Slot.M, Slot.MR, Slot.BL, Slot.BM, Slot.BR);
    }
    else if (s === "TRINKET") {
      parsedSlots.push(Slot.TL, Slot.TM, Slot.TR, Slot.ML, Slot.M, Slot.MR, Slot.BL, Slot.BM, Slot.BR, Slot.TRINKET);
    }
    else {
      parsedSlots.push(Slot[s as keyof typeof Slot]);
    }
  });
  const parsedSlotCards = i.slotCards?.map((sc) => {
    return {
      slot: Slot[sc.slot as keyof typeof Slot],
      cards: sc.cards
    }
  });
  itemDict.set(i.name, {
    name: i.name,
    slots: parsedSlots,
    blurb: i.blurb,
    desc: i.desc,
    tags: i.tags,
    cards: i.cards,
    slotCards: parsedSlotCards
  } as Item);
});