import React, {Component} from 'react'
import {connect} from 'react-redux'

class Home extends Component {
  render () {
    return (
        <div>
          <section className='text-section'>
            <h1>Welcome to AKNMS!</h1>
          </section>

          
        </div>
     )
  }
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Home)
