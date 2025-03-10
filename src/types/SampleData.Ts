// src/types/SampleData.ts

export interface Store {
    "Seq No.": number;
    ID: string;
    Label: string;
    City: string;
    State: string;
  }
  
  export interface SKU {
    ID: string;
    Label: string;
    Class: string;
    Department: string;
    Price: number;
    Cost: number;
    id: string;
  }
  
  export interface Calendar {
    "Seq No.": number;
    Week: string;
    "Week Label": string;
    Month: string;
    "Month Label": string;
    id: string;
  }
  
  export interface Planning {
    Store: string;
    SKU: string;
    Week: string;
    "Sales Units": number;
    id: string;
  }
  
  export interface Calculation {
    Store: string;
    SKU: string;
    Week: string;
    "Sales Units": number;
    "Sales Dollars": number;
    "Cost Dollars": number;
    "GM Dollars": number;
    "GM %": number;
    id: string;
  }
  
  export interface Chart {
    Week: string;
    "GM Dollars": number;
    "Sales Dollars": number;
    "GM %": number;
    id: string;
  }
  
  export interface SampleData {
    Stores: Store[];
    SKUs: SKU[];
    Calendar: Calendar[];
    Planning: Planning[];
    Calculations: Calculation[];
    Chart: Chart[];
  }