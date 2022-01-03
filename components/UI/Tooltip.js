import React from 'react'
import Image from 'next/image'
import iconTooltip from "../../public/icons/tooltip.png";

function Tooltip({info}){
  return (
    <div className='tooltip'>
      <Image
        src={iconTooltip.src}
        alt=""
        width={18}
        height={18}
        className='tooltip_icon'
      />
      <div className='tooltip_info'>
        {info}
      </div>
    </div>
  );
}

Tooltip.defaultProps = {
  info: 'text info',
};

export default Tooltip;