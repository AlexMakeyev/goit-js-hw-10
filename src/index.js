import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import countryListTpl from './countryListElement.hbs';
import countryInfoTpl from './countryInfo.hbs';
import "notiflix/dist/notiflix-3.2.5.min.css";
import getRefs from './getRefs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
refs.searchForm.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));

function inputSearch(e) {
    const search = e.target.value.trim();
    if (!search) {
        clearMarkup();
        return;
    };
   
    fetchCountries(search)
        .then(country => {
            if (country.length > 10) {
                clearMarkup()
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            };
            if (2 <= country.length && country.length <= 10) {
                clearMarkup()
                refs.countryList.insertAdjacentHTML('afterbegin', countryListTpl(country));                                      
            }
            else {
                clearMarkup();                            
                refs.countryInfo.insertAdjacentHTML('afterbegin', countryInfoTpl(country));                                      
            };
        })
        .catch(error => {
            clearMarkup();
            console.log("Oops, there is no country with that name");
            return Notiflix.Notify.failure("Oops, there is no country with that name");
        });
        
}; 


function clearMarkup() {
  refs.countryInfo.innerHTML = ' ';
  refs.countryList.innerHTML = ' ';   
}