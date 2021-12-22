import React from 'react'
import Layout from "../../components/Layouts/Layout";

function PlayerPage() {
  return (
    <div className="container--custom">
      <section className='card-query'>
        <h5 className='card__title'>Query</h5>
        <div className='card__body'>
           <div className='select--custom'>
            <p>
              <span>Most recent logins</span>
              <span className='icon icon__dropdown'>dropdown</span>
            </p>
            <ul>
              <li>-- Order result by --</li>
              <li>Most recent logins</li>
              <li>Highest value to date</li>
            </ul>
           </div>
        </div>
      </section>


    </div>
  )
}

export default PlayerPage

PlayerPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
  