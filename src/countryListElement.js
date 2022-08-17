export default function createCountryElement({flags, name}) {
    return `<li>
    <img src="${flags.svg}" width=70px>
    <p> ${name.official}</p>
    </li>`;
}
