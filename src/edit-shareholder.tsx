import React from 'react';
import { Shareholder } from './types';

interface P {
  shareholder: Shareholder;
  onShareholderChanged: (shareholder: Shareholder) => void;
  onDelete: () => void;
}

export function EditShareholder(props: P) {
  const shareholder = props.shareholder;
  const address = shareholder.address;
  const changed = props.onShareholderChanged;
  return (
    <div>
      <input disabled value={shareholder._id} />
      <input
        onChange={e => changed({ ...shareholder, email: e.target.value })}
        value={shareholder.email}
        placeholder="Email"
        type="email"
      />
      <input
        onChange={e => changed({ ...shareholder, name: e.target.value })}
        value={shareholder.name}
        placeholder="Name"
      />
      <input
        onChange={e =>
          changed({
            ...shareholder,
            address: { ...address, city: e.target.value }
          })
        }
        value={shareholder.address.city}
        placeholder="City"
      />
      <input
        onChange={e =>
          changed({
            ...shareholder,
            address: { ...address, country: e.target.value }
          })
        }
        value={shareholder.address.country}
        placeholder="Country"
      />
      <input
        onChange={e =>
          changed({
            ...shareholder,
            address: { ...address, line1: e.target.value }
          })
        }
        value={shareholder.address.line1}
        placeholder="Line 1"
      />
      <input
        onChange={e =>
          changed({
            ...shareholder,
            address: { ...address, line2: e.target.value }
          })
        }
        value={shareholder.address.line2}
        placeholder="Line 2"
      />
      <input
        onChange={e =>
          changed({
            ...shareholder,
            address: { ...address, postcode: e.target.valueAsNumber }
          })
        }
        value={shareholder.address.postcode}
        placeholder="Postcode"
        type="number"
      />
      <input
        onChange={e =>
          changed({
            ...shareholder,
            address: { ...address, street: e.target.value }
          })
        }
        value={shareholder.address.street}
        placeholder="Street"
      />
      <button onClick={() => props.onDelete()}>Delete</button>
    </div>
  );
}
