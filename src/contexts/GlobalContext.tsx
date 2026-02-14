import { createContext } from "preact";
import type { Dispatch } from "preact/hooks";

export interface EquipItems {
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
  baseDeck: {
    atk: string[],
    def: string[],
    special: string[]
  }
}

export interface EquipItemsDispatch {
  state: EquipItems,
  setState: Dispatch<EquipItems>
}

export const defaultDeck = {
  atk: ["block_u_punch_l", "punch_lr", "haymaker", "block_u_punch_u", "block_r_kick_d", "wide_kick", "wide_right", "uppercut"],
  def: ["block_l", "block_ur", "block_ur", "block_ud", "block_lr", "block_ud", "block_dl", "block_udlr"],
  special: ["3xpound", "3xpound", "3xpound", "rabbit_assist", "fish_assist", "browbeat"]
}

export const defaultState: EquipItems = {
  TL: null,
  TM: null,
  TR: null,
  ML: null,
  M: null,
  MR: null,
  BL: null,
  BM: null,
  BR: null,
  weapon: null,
  offhand: null,
  trinket: null,
  baseDeck: defaultDeck
}

const GlobalContext = createContext<EquipItemsDispatch|null>(null);
export default GlobalContext;

