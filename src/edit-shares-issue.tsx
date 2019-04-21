import React from 'react';
import { SharesIssue, Shareholder } from './types';
import Dropdown from 'react-dropdown';

interface P {
  shareholders: Shareholder[];
  sharesIssue: SharesIssue;
  onSharesIssueChanged: (sharesIssue: SharesIssue) => void;
  onDelete: () => void;
}

export function EditSharesIssue(props: P) {
  const sharesIssue = props.sharesIssue;
  const changed = props.onSharesIssueChanged;
  return (
    <div>
      <div style={{ float: 'left', width: '30%' }}>
        <Dropdown
          options={props.shareholders.map(
            ({ _id, name, email, address: { postcode, city } }) => ({
              label: `${name}, ${email} from ${postcode} ${city}`,
              value: _id
            })
          )}
          onChange={({ value }) =>
            changed({ ...sharesIssue, shareholderId: value })
          }
          value={sharesIssue.shareholderId}
          placeholder="Stakeholder"
        />
      </div>
      <input
        disabled
        onChange={e =>
          changed({ ...sharesIssue, shareholderId: e.target.value })
        }
        value={sharesIssue.shareholderId}
        placeholder="Shareholder ID"
      />
      <input
        onChange={e =>
          changed({
            ...sharesIssue,
            date: e.target.valueAsDate || new Date()
          })
        }
        value={sharesIssue.date && sharesIssue.date.toISOString().slice(0, 10)}
        type="date"
        placeholder="Date"
      />
      <input
        onChange={e =>
          changed({ ...sharesIssue, amount: e.target.valueAsNumber || 0 })
        }
        value={sharesIssue.amount === 0 ? '' : sharesIssue.amount}
        placeholder="Amount"
        min="0"
        step="1"
        type="number"
      />
      <input
        onChange={e =>
          changed({
            ...sharesIssue,
            pricePerShare: e.target.value ? e.target.valueAsNumber : undefined
          })
        }
        value={
          sharesIssue.pricePerShare === undefined
            ? ''
            : sharesIssue.pricePerShare
        }
        placeholder="Price per Share"
        min="0"
        type="number"
      />

      <button onClick={() => props.onDelete()}>Delete</button>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}
