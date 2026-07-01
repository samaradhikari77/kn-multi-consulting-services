/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SCMCalculation {
  id: string;
  commodityName: string;
  avgMonthlyConsumption: number;
  leadTimeMonths: number;
  safetyStockMonths: number;
  stockOnHand: number;
  forecastedNeeded: number;
  reorderPoint: number;
  calculatedAt: string;
}

export interface LMISCommodity {
  id: string;
  name: string;
  category: "Essential Drug" | "Maternal Health" | "Vaccine" | "Medical Consumable";
  stockOnHand: number;
  avgMonthlyConsumption: number;
  monthsOfStock: number;
  status: "Understock" | "Normal" | "Overstock" | "Risk of Expiry";
  facilityName: string;
  facilityType: "Central Hospital" | "District Hospital" | "Health Post" | "Community Health Unit";
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  tag: "Auction" | "Disposal" | "LMIS-Training" | "Forecasting" | "General";
}
