const createStore = (reducer, initialState) => {
  let state = initialState
  let updater = () => {}
  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    updater()
  }

  const subscribe = (listener) => {
    updater = listener
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

const reducer = (state, action) => {
  const { type, payload } = action
  
  switch (type) {
    case 'BURN':
      state.burnedCalories += payload
      state.quantityClicksForFinish -= payload
      break;
    case 'CLICK':
      state.burnedCalories += payload
      state.quantityClicksForFinish -= payload
    default:
      return state
  }
  return state
}

const dataInitial = {
  burnedCalories: 0,
  quantityClicksForFinish: 1360563
}
const store = createStore(reducer,dataInitial)

const $resultBurnedCalories = document.getElementById('result-burned-calories')
const $resultQuantityClick = document.getElementById('result-quantity-click')
store.subscribe(() => {
  const {
    burnedCalories,
    quantityClicksForFinish
  } = store.getState()
  $resultBurnedCalories.textContent = burnedCalories.toFixed(2)
  $resultQuantityClick.textContent = quantityClicksForFinish.toFixed(2)
})

const $burn = document.getElementById('burn')
const $buttonQuantityClick = document.getElementById('button-quantity-click')

$burn.addEventListener('click',handleBurnClick)
$buttonQuantityClick.addEventListener('click',handleClicksForFinishClick)

function handleClicksForFinishClick() {
  store.dispatch({
    type: 'CLICK',
    payload: 1.42
  })
}
function handleBurnClick() {
  store.dispatch({
    type: 'BURN',
    payload: 1.42
  })
}