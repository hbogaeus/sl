import React from 'react';
import { addDecorator } from '@storybook/react';

addDecorator(storyFn => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div style={{
      width: '360px',
      height: '740px',
      boxShadow: '0 1px 5px 0 rgba(0,0,0,0.1)',
      background: '#ffffff'
    }}>
      {storyFn()}
    </div>
  </div>
));
