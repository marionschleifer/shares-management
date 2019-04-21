import React, { Component } from 'react';
import { AppData } from './types';
import { EditShareholders } from './edit-shareholders';
import { EditSharesIssues } from './edit-shares-issues';
import { CapTable } from './cap-table';
import 'react-dropdown/style.css';

const LOCAL_STORAGE_KEY = 'appData';

interface S {
  data: AppData;
}

export class App extends Component<{}, S> {
  state = {
    data: {
      shareholders: [],
      sharesIssues: []
    }
  };

  componentDidMount() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!rawData) return;

    const data: AppData = JSON.parse(rawData);

    data.sharesIssues.forEach(shareIssue => {
      shareIssue.date = this.parseDate(shareIssue.date as any);
      shareIssue.pricePerShare =
        shareIssue.pricePerShare === null
          ? undefined
          : shareIssue.pricePerShare;
    });

    data.shareholders.forEach(({ address }) => {
      address.line2 = address.line2 === null ? undefined : address.line2;
    });

    this.setState({ data });
  }

  private parseDate(dateStr: string) {
    if (!dateStr) return new Date();
    return new Date(Date.parse(dateStr));
  }

  render() {
    return (
      <div>
        <h1>Cap Table Management</h1>
        <h2>Edit</h2>
        <EditShareholders
          {...this.state.data}
          onShareholdersChanged={(shareholders, sharesIssues) =>
            this.updateData({
              ...this.state.data,
              shareholders,
              sharesIssues
            })
          }
        />
        <EditSharesIssues
          {...this.state.data}
          onSharesIssuesChanged={sharesIssues =>
            this.updateData({ ...this.state.data, sharesIssues })
          }
        />

        <h2>Display</h2>
        <CapTable data={this.state.data} />

        <button onClick={() => this.deleteAllData()}>Delete all data</button>
      </div>
    );
  }

  private updateData(data: AppData) {
    this.setState({ data }, () => this.storeInLocalStorage());
  }

  private storeInLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.data));
  }

  private deleteAllData() {
    this.setState({
      data: {
        shareholders: [],
        sharesIssues: []
      }
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

export default App;
