const Notification = ({ message, onClose }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      <div className='message'>
        {message}
      </div>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default Notification