import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { ReducerState, TodoItem } from './interfaces';
import { Dispatch, bindActionCreators } from 'redux';
import * as appActions from './store/actions'
import MaterialTable from 'material-table';
import Header from './Header';


interface Props {
    App: ReducerState
    getTodoList: Function,
    addTodo: Function,
    updateTodo: Function,
    deleteTodo: Function
}

const tableColumns: any = [
    {
        title: 'Title',
        field: 'title'
    },
    {
        title: 'Description',
        field: 'description'
    },
    {
        title: 'Due Date',
        field: 'dueDate',
        type: 'date'
    },
    {
        title: 'Status',
        field: 'status',
        lookup: { 
            'TODO': 'TODO',
            'PROCESS': 'PROCESS',
            'COMPLETED': 'COMPLETED' 
        },
        initialEditValue: 'TODO'
    }
]

function App(props: Props) {

const { App: { todos, isLoading, error }} = props

    useEffect(() => {
        const { getTodoList } = props
        getTodoList()
    }, []) // eslint-disable react-hooks/exhaustive-deps

    function addTodo(newData: TodoItem): Promise<void>{
        return new Promise( async (resolve) => {
            await props.addTodo(newData)
            resolve()
        })
    }
    function updateTodo(newData: TodoItem): Promise<void>{
        return new Promise( async (resolve) => {
            await props.updateTodo(newData)
            resolve()
        })
    }

    function deleteTodo(newData: TodoItem): Promise<void>{
        return new Promise( async (resolve) => {
            await props.deleteTodo(newData)
            resolve()
        })
    }

    return (
        <div className="App">
            <Header />
            <MaterialTable
            title={ error || "Todo List" }
            data={todos}
            columns={tableColumns}
            isLoading={isLoading}
            options={{
                filtering: true,
                sorting: true
            }}
            editable={{
                onRowAdd: addTodo,
                onRowUpdate: updateTodo,
                onRowDelete: deleteTodo
            }} 
               style={{ maxWidth: 960, margin: '0 auto' }} 
            />
        </div>
    );
}

const mapStateToProps = (state: ReducerState): any => ({ App: state })

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
