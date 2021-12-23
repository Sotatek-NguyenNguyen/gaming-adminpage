import React from 'react'

function Card(props) {
  return (
    <div className='card'>
        {/* <div className='card__header'>
          <div className='card__header--title'>Deposits</div>
          <div>Amount</div>
          <div>Change</div>
        </div> */}

        <div className='card__content'>
          {props.children}
        </div>

        <div className='card__actions'></div>
    </div>
  )
}

export default Card
