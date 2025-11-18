export interface Motorization {
  id: string;
  name: string;
  ps: number;
  kw: number;
  transmission: string;
  drive: string;
  fuelType: string;
  fuelConsumptionCombined: number;
  fuelConsumptionCombinedUnit: string;
  co2EmissionsCombined: number;
  co2EmissionsCombinedUnit: string;
  co2Class: string;
  maxSpeed: number;
  maxSpeedUnit: string;
  price: number;
}
