
export type Status = 'TODO' | 'PROCESS' | 'COMPLETED'

export type ActionType = 
'FETCH_TODO_LIST' | 
'FETCH_TODO_UPDATE' | 
'FETCH_TODO_ADD' | 
'FETCH_TODO_DELETE' | 
'FETCH_TODO_ERROR' |
'SET_LOADING_STATE'

export interface TodoItem {
    id: number,
    title: string,
    description?: string,
    dueDate?: Date,
    status?: Status
}

export interface ReducerState {
    todos: TodoItem[],
    isLoading: boolean,
    error: string | null
}

export interface ReducerAction {
    type: ActionType,
    payload: TodoItem | any
}