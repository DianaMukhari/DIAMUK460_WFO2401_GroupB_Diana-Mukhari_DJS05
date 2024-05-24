// The initial state of the application, with a single property 'count' set to 0.
const initialState = {
  count: 0,
};

// Constants representing the types of actions that can be dispatched.
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';
// Functions that create action objects to be dispatched.
const add = () => ({ type: ADD });
const subtract = () => ({ type: SUBTRACT });
const reset = () => ({ type: RESET });

// Reducer function that specifies how the state should be updated based on the dispatched action.
const reducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD:
          // Incrementing the count by 1 when ADD action is dispatched.
          return { ...state, count: state.count + 1 };
      case SUBTRACT:
          // Decrementing the count by 1 when SUBTRACT action is dispatched.
          return { ...state, count: state.count - 1 };
      case RESET:
          // Reseting the count to 0 when RESET action is dispatched.
          return { ...state, count: 0 };
      default:
          // Return the current state if the action type is unknown.
          return state;
  }
};

// Class representing the global state management store.
class Store {
  constructor(reducer, initialState) {
      this.reducer = reducer;
      this.state = initialState;
      this.listeners = [];
  }

  // Method to get the current state of the store.
  getState() {
      return this.state;
  }

  // Method to dispatch actions to update the state.
  dispatch(action) {
      this.state = this.reducer(this.state, action);
      // Notify all subscribed listeners whenever the state is updated.
      this.listeners.forEach(listener => listener());
  }

  // Method to subscribe to state changes.
  subscribe(listener) {
      //  listener function to the list of listeners.
      this.listeners.push(listener);
      // Return a function to unsubscribe the listener.
      return () => {
          this.listeners = this.listeners.filter(l => l !== listener);
      };
  }
}

// Creating an instance of the Store class with the reducer function and initial state.
const store = new Store(reducer, initialState);

// Function to log the current count in the state to the console.
const render = () => {
    console.log("Count: ", store.getState().count);
  };
// Subscribe the render function to state changes in the store.
store.subscribe(render);

// Log the initial state and perform actions to demonstrate state management.
console.log('Scenario 1: Initial state');
render();

console.log('Scenario 2: Incrementing');
store.dispatch(add());
store.dispatch(add());

console.log('Scenario 3: Decrementing');
store.dispatch(subtract());

console.log('Scenario 4: Resetting');
store.dispatch(reset());