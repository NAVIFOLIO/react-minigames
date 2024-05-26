const settingsReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_DIFFICULTY':
            return {
                    difficulty: action.difficulty,
                    gameStatus: 'beforeStart',
                    gameId: state.gameId + 1
            } 
        case 'CHANGE_GAMESTATE':
            return{
                ...state,
                gameStatus: action.gameStatus
            }
        case 'START_NEW_GAME':
            return{
                ...state,
                gameStatus: 'beforeStart',
                gameId: state.gameId + 1
            }
        default:
            return state
    }
}

export {settingsReducer as default}