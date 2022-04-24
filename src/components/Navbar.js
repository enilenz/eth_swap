import React from 'react'

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a
      className="navbar-brand col-sm-3 col-md-2 mr-0"
      href="http://www.dappuniversity.com/bootcamp"
      target="_blank"
      rel="noopener noreferrer"
    >
      EthSwap
    </a>
    <p>{props.account}</p>
  </nav>
  )
}

export default Navbar