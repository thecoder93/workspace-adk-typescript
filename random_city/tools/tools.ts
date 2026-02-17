/**
 * Mock tools for the Random City Agent.
 */

const CITIES = ["Tokyo", "Paris"];

export function getRandomCity(): string {
  const index = Math.floor(Math.random() * CITIES.length);
  const city = CITIES[index];
  console.info(`Tool called: getRandomCity -> ${city}`);
  return city;
}
