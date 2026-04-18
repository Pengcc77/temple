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

function setWishDirection(direction) {
  setSelectedWishType(direction)
}

function completeNode() {}

function setSelectedBlessingId(id) {
  const map = {
    'peaceful-heart': '願心安靜澄明，日日平安。',
    'family-harmony': '願家人和順相伴，喜悅常在。',
    'new-life': '願新生命平安到來，福澤綿長。',
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
