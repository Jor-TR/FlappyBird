class Store{
    constructor(reducer,initialState){
        this.reducer=reducer;
        this.oldState=null;
        this.state=initialState;
        if(Object.isFrozen(this.state)===false){
            Object.freeze(this.state);
        }
        this.onStateChange=()=>{
            throw new Error("No subscribed handler!");
        };
    }
    getState(){
        return this.state;
    }
    dispatch(action){
        const newState=this.reducer(this.state,action);
        if(newState!==this.state){
            this.oldState=this.state;
            this.state = newState; 
            if(Object.isFrozen(this.state)===false){
                Object.freeze(this.state);
            }
        }
        setTimeout(() => {
            this.onStateChange(this.state, this.oldState);
        }, 0);
    }
    subscribe(handler) {
        this.onStateChange = handler;
    }
}

export const createStore = (reducer, initialState) => new Store(reducer, initialState);
