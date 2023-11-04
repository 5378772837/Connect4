import React from 'react';
	import { useNavigate } from 'react-router';
	import '../../css/reusables/header.css';
  import logo from '../../photos/React.jpg';

	function Header(props) {

  	const renderHeader = () => {
	      return (
       	  <div className='flex-row fill back1'>
          		<div className='flex-col half-width'>
                <div className = 'logo-container'>
            		  <a href="/"><img className='logo' src = {logo} /></a>
                </div>
          		</div>
          	<div className='flex-col half-width'>
                <div className='flex-row fill'>
            		<h1 className='medium center'>Welcome to The Mansker Family Connect 4</h1>
                </div>
          	</div>

        </div>
      )
    } 

  return (
    renderHeader()
  )
}

export default Header
