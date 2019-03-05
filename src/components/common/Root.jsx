import React, {Component} from 'react'


export default class Root extends Component {
    render() {
        return (
          <div className="Root">
              { this.props.children }
          </div>
        )
      }
    }