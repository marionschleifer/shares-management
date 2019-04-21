import React from 'react';
import { AppData } from './types';
import { sum, formatNumber } from './utils';
import { Address } from './address';

interface P {
  data: AppData;
}

export function CapTable(props: P) {
  return (
    <div>
      <h3>Cap Table</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th># Shares</th>
            <th>Percentage</th>
            <th>Invested Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.data.shareholders.map(({ _id, name, address, email }) => {
            const shareIssuesByShareholder = props.data.sharesIssues.filter(
              ({ shareholderId }) => _id === shareholderId
            );
            const allSharesAmount = sum(
              props.data.sharesIssues.map(({ amount }) => amount)
            );
            const ownedSharesAmount = sum(
              shareIssuesByShareholder.map(({ amount }) => amount)
            );
            const percentage =
              allSharesAmount === 0
                ? '-'
                : (100 / allSharesAmount) * ownedSharesAmount;
            const investedAmount = shareIssuesByShareholder.some(
              ({ pricePerShare }) => typeof pricePerShare !== 'number'
            )
              ? '-'
              : sum(
                  shareIssuesByShareholder.map(
                    ({ amount, pricePerShare }) =>
                      amount * (pricePerShare as number)
                  )
                );

            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>
                  <Address address={address} />
                  <br />
                  <a href={`mailto:${email}`}>{email}</a>
                </td>
                <td>{ownedSharesAmount}</td>
                <td>
                  {percentage === '-' ? '-' : formatNumber(percentage, 2)}% (
                  {ownedSharesAmount} / {allSharesAmount})
                </td>
                <td>{investedAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Shareholders</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Email</th>
            <th>Line 1</th>
            <th>Line 2</th>
            <th>Postcode</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {props.data.shareholders.map(({ _id, name, email, address }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{address.line1}</td>
              <td>{address.line2}</td>
              <td>{address.postcode}</td>
              <td>{address.city}</td>
              <td>{address.country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Share Issues</h3>
      <table>
        <thead>
          <tr>
            <th>ShareholderId</th>
            <th>Date</th>
            <th>Amount</th>
            <th>PricePerShare</th>
          </tr>
        </thead>
        <tbody>
          {props.data.sharesIssues.map(
            ({ amount, date, shareholderId, pricePerShare }, index) => (
              <tr key={index}>
                <td>{shareholderId}</td>
                <td>{date.toISOString().slice(0, 10)}</td>
                <td>{amount}</td>
                <td>{pricePerShare}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CapTable;
