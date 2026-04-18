import { reactive } from 'vue'

const state = reactive({
  selectedWishType: '',
  blessingMessage: '',
})

function setSelectedWishType(wishType) {
  state.selectedWishType = wishType
}

function setBlessingMessage(message) {
  state.blessingMessage = message
}

// Backward-compatible alias used by existing pages.
function setWishDirection(direction) {
  setSelectedWishType(direction)
}

// Backward-compatible placeholder for existing flow pages.
function completeNode() {}

// Backward-compatible mapping from previous id-based selection.
function setSelectedBlessingId(id) {
  const map = {
    'peaceful-heart': '願心安定，福至平安',
    'family-harmony': '願家和同心，日常安穩',
    'new-life': '願新生平順，福蔭常在',
  }

  if (map[id]) {
    state.blessingMessage = map[id]
  }
}

function resetBlessingJourney() {
  state.selectedWishType = ''
  state.blessingMessage = ''
}

export function useBlessingStore() {
  return {
    state,
    setSelectedWishType,
    setBlessingMessage,
    setWishDirection,
    completeNode,
    setSelectedBlessingId,
    resetBlessingJourney,
  }
}
