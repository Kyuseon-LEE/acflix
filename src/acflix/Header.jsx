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
    <div className="header">
      <a href="#none"><img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="logo_img" /></a>
     </div>
  );
}

export default Header;