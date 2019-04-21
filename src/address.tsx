import React from 'react';
import { Address as AddressInterface } from './types';

interface P {
  address: AddressInterface;
}

export function Address(props: P) {
  const { line1, line2, street, postcode, city, country } = props.address;
  return (
    <div>
      <div>{line1}</div>
      {line2 && <div>{line2}</div>}
      <div>{street}</div>
      <div>
        {postcode} {city}
      </div>
      <div>{country}</div>
    </div>
  );
}
