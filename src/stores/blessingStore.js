import { reactive } from 'vue'

const state = reactive({
  wishDirection: '',
  completedNodes: [],
  selectedBlessingId: '',
})

function setWishDirection(direction) {
  state.wishDirection = direction
}

function completeNode(nodeKey) {
  if (!state.completedNodes.includes(nodeKey)) {
    state.completedNodes.push(nodeKey)
  }
}

function setSelectedBlessingId(id) {
  state.selectedBlessingId = id
}

function resetBlessingJourney() {
  state.wishDirection = ''
  state.completedNodes = []
  state.selectedBlessingId = ''
}

export function useBlessingStore() {
  return {
    state,
    setWishDirection,
    completeNode,
    setSelectedBlessingId,
    resetBlessingJourney,
  }
}
