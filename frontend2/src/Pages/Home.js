import React from 'react'

function Home() {
    React.useEffect(() => {
        if (!userToken || userToken === 'undefined') {
            return navigate('/login');
          }
    }, [ ])
    
  return (
    <div>Home</div>
  )
}

export default Home