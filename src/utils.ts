export function sum(numbers: number[]){
  return numbers.reduce((sum, current) => sum + current, 0);
}

export function formatNumber(number: number, places: number) {
  return number.toFixed(places);
}
