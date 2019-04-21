import React, { Component } from 'react';

interface ShareHolderProps {
  id: string;
  name: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    street: string;
    postcode: number;
    city: string;
    country: string;
  };
}

class Shareholder extends Component<ShareHolderProps> {
  constructor(props: ShareHolderProps) {
    super(props);
  }
  render() {
    return <div className="Shareholder">Shareholder</div>;


  }
}

export default Shareholder;
