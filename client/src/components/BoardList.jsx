import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Board from './Board';
import BoardForm from './BoardForm';
import BoardPage from './BoardPage';
import './Board.css';

export default function BoardList(props) {
console.log(props)
  return (
    <ul className='boardUl'>
      {props.boards.map(board => (

        <Switch key={board.id}>


          <Route exact
            path={`/boards/${board.id}/edit`}
            render={() => (
                <BoardForm
                  onSubmit={updatedBoard => props.onEdit(updatedBoard, updatedBoard.id)}
                  initialValue={board}
                />
            )}
          />
          <Route
            render={() => (
              <Board
                onDelete={()=> props.onDelete(board.id)}
                board={board}

              />
            )}
          />


        </Switch>

      ))}
    </ul>
  )
}
