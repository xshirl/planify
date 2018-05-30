import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import './Board.css';
import BoardPage from './BoardPage';

export default function Board ({ board, lists, onDelete, onEdit }) {
  return(
    <div className='board'>
      <Link to={`/boards/${board.id}`}><h3> {board.name}</h3> </Link>
      <Link to={`/boards/${board.id}/edit`}>Edit </Link>
      <button onClick={onDelete}>Delete</button>


    </div>
    )
}
