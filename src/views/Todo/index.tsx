import React, {useEffect} from 'react';
import './todo.scss'
import Nav from "./components/Nav";
import TaskList from "./container/TaskList";
import Modal from "../../components/Modal";
import AddTodo from "./container/AddTodo/AddTodo";
import {connect, useDispatch} from "react-redux";
import * as actions from  '../../store/actions'
import { IMODE } from '../../components/Modal/services/modalAction'

interface TodoProps {
    mode?: IMODE
    tasks?:any
}


const Todo: React.FC<TodoProps> = (props) => {
    const dispatch = useDispatch()

    const {
        mode,
        tasks
    } = props

    useEffect(() => {
        dispatch(actions.getTask())
    },[])


    const initatModal = () => {
        const mode = {
            mode:"add_modal"
        }
        dispatch(actions.openModal(mode))
    }

    return (
        <>
            <main className="todo">
                <Nav title={"My Todo"}/>
                <div className="content flex-1">
                    <div className="todo-container">
                        <div className="title"> Your Today Task</div>
                        <div className="task-list">
                            {
                                tasks && tasks.map((task:any, index:number) =>(
                                    <TaskList task={ task } key={index}/>
                                ))
                            }
                            <div className="task-form d-flex align-center">
                                <i className="material-icons clickAbleIcon flex-1" onClick={initatModal}>add</i>
                                <div className="add-task flex-9">
                                    add task for today
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal>
                    {
                        mode!.mode === "add_modal" && <AddTodo/>
                    }
                </Modal>
            </main>
        </>
    );
};

const mapStateToProps = (state:any) => {
    return {
        tasks: state.todoReducer.tasks,
        mode: state.modalReducer.mode
    };
};

export default connect(mapStateToProps)(Todo);
