import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import './Board.css';
import BoardPage from './BoardPage';

export default function List ({ board, list, onDelete, onEdit }) {
  return(
    <div>
    <div className="list">{list.name}</div>
      <Link to={`/boards/${board.id}/0/edit`}>Edit </Link>
      <button onClick={onDelete}>Delete</button>


    </div>
    )
}
