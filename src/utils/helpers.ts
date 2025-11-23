import { Country } from "../entities/Country";

export function calculatePopulationDensity(country: Country): number {
    return country.population / country.area;
}   

export function getMostPopulousCountry(countries: Country[]): Country | null {
    if (countries.length === 0) return null;    
    return countries.reduce((max, country) => country.population > max.population ? country : max, countries[0]);
}

export function getLargestCountryByArea(countries: Country[]): Country | null {
    if (countries.length === 0) return null;    
    return countries.reduce((max, country) => country.area > max.area ? country : max, countries[0]);
}

 export function isBcryptHash(password: string) {
      return (
        password.startsWith("$2a$") ||
        password.startsWith("$2b$") ||
        password.startsWith("$2y$")
      );
    }
