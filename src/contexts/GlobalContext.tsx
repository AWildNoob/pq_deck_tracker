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
}

export interface EquipItemsDispatch {
  state: EquipItems,
  setState: Dispatch<EquipItems>
}

const GlobalContext = createContext<EquipItemsDispatch|null>(null);
export default GlobalContext;

