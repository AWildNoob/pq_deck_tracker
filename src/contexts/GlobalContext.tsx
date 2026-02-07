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
  inputState: EquipItems,
  setInputState: Dispatch<EquipItems>
}

export const GlobalContext = createContext<EquipItems>({
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
});
export default GlobalContext;

