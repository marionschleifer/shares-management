import React from 'react';
import { Shareholder, SharesIssue } from './types';
import { EditShareholder } from './edit-shareholder';
import { v4 as uuid } from 'uuid';

interface P {
  shareholders: Shareholder[];
  sharesIssues: SharesIssue[];
  onShareholdersChanged: (
    shareholders: Shareholder[],
    sharesIssues: SharesIssue[]
  ) => void;
}

export function EditShareholders(props: P) {
  const shareholders = props.shareholders;
  return (
    <div>
      <h3>Edit Shareholders</h3>
      {shareholders.map((shareholder, index) => (
        <EditShareholder
          key={shareholder._id}
          shareholder={shareholder}
          onShareholderChanged={shareholder =>
            props.onShareholdersChanged(
              [
                ...shareholders.slice(0, index),
                shareholder,
                ...shareholders.slice(index + 1)
              ],
              props.sharesIssues
            )
          }
          onDelete={() => tryToDeleteShareholder(props, shareholders[index])}
        />
      ))}
      <button
        onClick={() =>
          props.onShareholdersChanged(
            [...shareholders, newShareholder()],
            props.sharesIssues
          )
        }
      >
        Add another shareholder
      </button>
    </div>
  );
}

function newShareholder(): Shareholder {
  return {
    _id: uuid(),
    address: {
      city: '',
      country: '',
      line1: '',
      line2: '',
      postcode: 0,
      street: ''
    },
    email: '',
    name: ''
  };
}

function tryToDeleteShareholder(props: P, shareholderToDelete: Shareholder) {
  if (
    !shareholderHasSharesIssues(props, shareholderToDelete) ||
    shouldDeleteShareIssues(shareholderToDelete)
  )
    deleteShareholder(props, shareholderToDelete);
}

function deleteShareholder(props: P, shareholderToDelete: Shareholder) {
  // if (props.sharesIssues)
  props.onShareholdersChanged(
    props.shareholders.filter(
      shareholder => shareholder !== shareholderToDelete
    ),
    props.sharesIssues.filter(
      ({ shareholderId }) => shareholderId !== shareholderToDelete._id
    )
  );
}

function shareholderHasSharesIssues(
  props: P,
  shareholder: Shareholder
): boolean {
  return props.sharesIssues.some(
    ({ shareholderId }) => shareholderId === shareholder._id
  );
}

function shouldDeleteShareIssues(shareholder: Shareholder) {
  return confirm(
    `The current sharholder ${
      shareholder.name
    } has shares issued. Do you want to delete the shareholder and the shares issues?`
  );
}
