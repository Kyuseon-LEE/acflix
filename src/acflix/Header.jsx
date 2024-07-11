import React, { useEffect, useState } from "react";


const Header = () => {

  // Hook
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    console.log('[Header] useEffect()');

    setIsLogined();
  });

  // Handler


  
  return(
    <>
      Header
    </>
  );
}

export default Header;