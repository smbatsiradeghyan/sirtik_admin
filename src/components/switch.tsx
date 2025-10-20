import React, { FC } from 'react';


interface SwitchProps {
  status: boolean
  onChange: () => void
}

export const Switch: FC<SwitchProps> = ({status, onChange}) => {
  return (
    <div className={`switcher-container ${status ? 'active' : ''}`} onClick={onChange}>
      <div className="switcher"/>
    </div>
  );
};

