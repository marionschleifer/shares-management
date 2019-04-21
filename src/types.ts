export interface AppData {
  shareholders: Shareholder[];
  sharesIssues: SharesIssue[];
}

export interface Shareholder {
  _id: string
  name: string,
  email: string,
  address: Address,
}

export interface Address {
    line1: string,
    line2?: string,
    street: string,
    postcode: number,
    city: string,
    country: string, // ISO Alpha-2, e. g. CH, GB, US

}

export interface SharesIssue {
  shareholderId: string,
  date: Date,
  amount: number,
  pricePerShare?: number,  // USD
}
