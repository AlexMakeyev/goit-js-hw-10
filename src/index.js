import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import createCountryElement from './countryListElement.js';
import createCountryInfo from './countryInfo.js';
import "notiflix/dist/notiflix-3.2.5.min.css";
import getRefs from './getRefs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
refs.searchForm.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));

function inputSearch(e) {
    const search = e.target.value.trim();
    if (!search) {
        cleanMarkup();
        return;
    };

    fetchCountries(search)
        .then(country => {
            if (country.length > 10) {
                cleanMarkup()
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            };
            if (2 <= country.length && country.length <= 10) {
                cleanMarkup()
                const element = country.map(createCountryElement).join('');
                refs.countryList.insertAdjacentHTML('afterbegin', element);                                      
            }
            else {
                cleanMarkup();
                const element = country.map(createCountryInfo).join('');
                refs.countryInfo.insertAdjacentHTML('afterbegin', element);                                      
            };
        })
        .catch(error => {
            cleanMarkup();
            console.log("Oops, there is no country with that name");
            return Notiflix.Notify.failure("Oops, there is no country with that name");
        });
        
}; 


function cleanMarkup() {
  refs.countryInfo.innerHTML = ' ';
  refs.countryList.innerHTML = ' ';   
}