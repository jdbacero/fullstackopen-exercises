const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'Remove importance' : 'Assign importance'
  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note