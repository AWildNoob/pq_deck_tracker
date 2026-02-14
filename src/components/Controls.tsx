import type { Dispatch } from "preact/hooks";
import { defaultDeck, defaultState, type EquipItems } from "../contexts/GlobalContext";

function parseDeckStr(deckStr: string) {
  const chunks = deckStr.trim().split("|");
  if (chunks.length !== 3) {
    return defaultDeck;
  }
  const atk = chunks[0].split(",");
  const def = chunks[1].split(",");
  const special = chunks[2].split(",");
  return {
    atk: atk,
    def: def,
    special: special
  }
}

function Controls(props: {state: EquipItems, setState: Dispatch<EquipItems>}) {
  const setDeck = () => {
    const currDeckStr = props.state.baseDeck.atk.join(",") + "|" + props.state.baseDeck.def.join(",") + "|" + props.state.baseDeck.special.join(",")
    const deckStr = prompt("Enter deck string:", currDeckStr) ?? "";
    const chunks = deckStr.trim().split("|");
    if (chunks.length === 3) {
      const atkCards = chunks[0].split(",");
      const defCards = chunks[1].split(",");
      const specialCards = chunks[2].split(",");
      props.setState({
        ...props.state,
        baseDeck: {
          atk: atkCards,
          def: defCards,
          special: specialCards
        }
      });
    }
    else { // Invalid deck, reset to default
      props.setState({...props.state, baseDeck: defaultDeck});
    }
  }

  return (
    <div class="controls bordered-cell">
      <button
        title="Reset equipment"
        onClick={() => props.setState({...defaultState, baseDeck: props.state.baseDeck})}
      >
        Reset
      </button>
      <button
        title="Alter base deck (blank string to reset)"
        onClick={() => setDeck()}
      >
        Set base deck
      </button>
    </div>
  )
}
export default Controls;