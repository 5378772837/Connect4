import React from 'react'
	import Header from './Header'

	function PageWrapper(props) {
  		return (
    			<div className='flex-col fill'>
					<div className = 'flex-row header back3'>
      					<Header/>
				  	</div>
      			<div className='flex-row fill'>
        			{props.children}
      			</div>
    		</div>
  		)
		}

	export default PageWrapper	