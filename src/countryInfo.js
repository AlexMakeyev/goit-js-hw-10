export default function createCountyInfo({flags, name, capital, population, languages}) {
    return `<li>
    <img src="${flags.svg}" width=70px>
    <p> ${name.official}</p>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>
    </li>`;
}
 