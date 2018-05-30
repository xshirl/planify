import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import './Board.css';
import BoardPage from './BoardPage';
import './List.css';
export default function List ({ board, list, onDelete, onEdit }) {
  return(
    <div>
    <div className="list">{list.name}
      <Link to={`/boards/${board.id}/${list.id}/edit`}>Edit </Link>
      <button onClick={onDelete}>Delete</button>
      </div>

    </div>
    )
}
