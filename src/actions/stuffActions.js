import * as allActions from './allActions';

export function receiveStuff(data) {
    return { type: allActions.RECEIVE_STUFF, stuff: data};
}

export const addUser = stuff => ({
    type: allActions.ADD_STUFF, stuff
})

export const deleteUser = index => ({
    type: allActions.DEL_STUFF, index
})

export const editUser = data => ({
    type: allActions.EDIT_STUFF, data
})

export function fetchStuff() {
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                }))
            )
            .then(response => {
                if(response.status === 200){
                    dispatch(receiveStuff(response.data))
                }else{
                    var flash = {
                        type: 'error',
                        title: 'Error getting task list',
                        content: 'There was an error getting the task list. Please try again.'
                    }
                    dispatch({type: "DISPLAY_FLASH", data: flash})
                }
            });
    };
}