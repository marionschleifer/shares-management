import React from 'react';
import { AppData, SharesIssue, Shareholder } from './types';
import { EditSharesIssue } from './edit-shares-issue';

interface P {
  shareholders: Shareholder[];

  sharesIssues: SharesIssue[];
  onSharesIssuesChanged: (sharesIssues: SharesIssue[]) => void;
}

export function EditSharesIssues(props: P) {
  const sharesIssues = props.sharesIssues;
  return (
    <div>
      <h3>Edit Shares Issues</h3>
      {sharesIssues.map((sharesIssue, index) => (
        <EditSharesIssue
          key={index}
          shareholders={props.shareholders}
          sharesIssue={sharesIssue}
          onSharesIssueChanged={sharesIssue =>
            props.onSharesIssuesChanged([
              ...sharesIssues.slice(0, index),
              sharesIssue,
              ...sharesIssues.slice(index + 1)
            ])
          }
          onDelete={() =>
            props.onSharesIssuesChanged(
              sharesIssues.filter((_, elIndex) => elIndex !== index)
            )
          }
        />
      ))}
      <button
        disabled={props.shareholders.length === 0}
        onClick={() =>
          props.onSharesIssuesChanged([
            ...sharesIssues,
            newSharesIssue(props.shareholders)
          ])
        }
      >
        Add another shares issue
      </button>
    </div>
  );
}

function newSharesIssue(shareholders: Shareholder[]): SharesIssue {
  return {
    shareholderId: shareholders.length > 0 ? shareholders[0]._id : '',
    date: new Date(),
    amount: 1,
    pricePerShare: 1
  };
}
