import { type } from "os";
import { ActionType, TodoItem, ReducerState } from "../interfaces";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const { REACT_APP_API_URL } = process.env

const _dispatch = (
    type: ActionType,
    payload: TodoItem | any,
    dispatch: Dispatch) => {
    dispatch({ type, payload })
}

export const getTodoList = 
(): ThunkAction<any, ReducerState, any, any> => async (dispatch: Dispatch) => {
    try{

        _dispatch('SET_LOADING_STATE', true, dispatch)

        const response: Response = await fetch(`${REACT_APP_API_URL}`)
        const result = await response.json()

        _dispatch('FETCH_TODO_LIST', result, dispatch)

    } catch(e){

        _dispatch('FETCH_TODO_DELETE', e.message, dispatch)

    } finally{

        _dispatch('SET_LOADING_STATE', false, dispatch)

    }
} 


export const addTodo = 
(payload: TodoItem): ThunkAction<any, ReducerState, any, any> => async (dispatch: Dispatch) => {
    try{

        _dispatch('SET_LOADING_STATE', true, dispatch)

        const response: Response = await fetch(`${REACT_APP_API_URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        const result = await response.json()

        _dispatch('FETCH_TODO_ADD', result, dispatch)

    } catch(e){

        _dispatch('FETCH_TODO_DELETE', e.message, dispatch)

    } finally{

        _dispatch('SET_LOADING_STATE', false, dispatch)

    }
} 

export const updateTodo = 
(payload: TodoItem): ThunkAction<any, ReducerState, any, any> => async (dispatch: Dispatch) => {
    try{

        const { id } = payload

        _dispatch('SET_LOADING_STATE', true, dispatch)

        const response: Response = await fetch(`${REACT_APP_API_URL}/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        const result = await response.json()

        _dispatch('FETCH_TODO_UPDATE', result, dispatch)

    } catch(e){

        _dispatch('FETCH_TODO_DELETE', e.message, dispatch)

    } finally{

        _dispatch('SET_LOADING_STATE', false, dispatch)

    }
}

export const deleteTodo = 
(payload: TodoItem): ThunkAction<any, ReducerState, any, any> => async (dispatch: Dispatch) => {
    try{

        const { id } = payload

        _dispatch('SET_LOADING_STATE', true, dispatch)

        await fetch(`${REACT_APP_API_URL}/${id}`, {
            method: 'DELETE'
            
        })
        

        _dispatch('FETCH_TODO_DELETE', payload, dispatch)

    } catch(e){

        _dispatch('FETCH_TODO_DELETE', e.message, dispatch)

    } finally{

        _dispatch('SET_LOADING_STATE', false, dispatch)

    }
}