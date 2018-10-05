import React from 'react'

export const AddStreamForm = (props) => {
  let inputValue = ''
  
  const onSubmit = (e) => {
    e.preventDefault()
    document.getElementById('name').value = ''
    
    return props.onSubmit(inputValue)
  }
  
  return(
    <div className='form-add-stream'>
      <form onSubmit={onSubmit}>
        <input type="text" id="name" placeholder="Add stream" 
               onChange={e => inputValue = e.target.value}/>
       
      </form>
    </div>
  )
}