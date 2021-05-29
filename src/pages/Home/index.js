import React, { useRef, useState, useContext, useCallback } from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from 'axios';
import tests from './db.json';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../Context/ContextProvider';
//to Reduce the call while building App i made mock data to tests
const test = tests.results;
function HomePage() {
  //for Setting search value onChange
  const [searchTerm, setSearchTerm] = useState('');

  //used Context Api to set Data to global So No need by props
  const { data, setData } = useContext(AuthContext);

  //Getting All Similar Data by search value
  const [AllData, setAll] = useState([]);

  //use for to add feature in input Box
  const refs = useRef();

  //Trying to giving Feature in KeyPress so For selecting all Options i used this options Refs
  const options = useRef();

  //Getting all Data from Api
  const handleFetch = (name) => {
    axios
      .get(`https://swapi.dev/api/people/?search=${name}`)
      .then((data) => setAll(data.data.results));
  };

  //to reduce the API Calls Debounce i have used
  const debounce = (func) => {
    let timer;
    return function () {
      const context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        handleFetch.apply(context, args);
      }, 5000);
    };
  };
  //Return Optimized Function Which Call certain Duration Of time
  const optimizeVersion = debounce(handleFetch(searchTerm));

  //to Setting Value of selected Option to input Box
  const handleRefsOfSuggestions = (item) => {
    refs.current.value = item.name;
  };
  // const handleRefsOfSuggestion = (item) => {
  //   refs.current.value = item;
  // };
  //for Giving feature on Key Press handleKeyPress I have made
  // let count = 0;
  // const handleKeyPress = (event) => {
  //   let opts = options.current;
  //   if (event.key === 'ArrowDown') {
  //     let optsLength = opts.children.length;

  //     if (count < optsLength) {
  //       opts.children[count].style.color = '#ecd014';
  //     }
  //      else if (count > optsLength) {
  //          count = 0;
  //     }
  //     count++;
  //   }
  //   if (event.key === 'Enter') {
  //     let opts = options.current;

  //     handleRefsOfSuggestion(opts.children[count].textContent);
  //   }
  //   console.log(event.key);
  // };

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100vw',
        }}
      >
        <input
          ref={refs}
          className="search-input"
          placeholder="Search by name"
          // onKeyDown={handleKeyPress}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            optimizeVersion();
          }}
        />
        <div>
          {' '}
          <Link to={data.name != undefined ? '/person/:id' : '/error'}>
            {' '}
            <Button
              style={{ marginLeft: '10px', marginTop: '7px' }}
              variant="success"
            >
              S E A R C H
            </Button>
          </Link>
        </div>
      </div>

      <div className="OptionBox" ref={options}>
        {test
          ?.filter((item) => {
            if (searchTerm === '') {
              return '';
            } else if (
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return item;
            }
          })
          ?.map((item, key) => {
            return (
              <div
                key={key}
                className="search"
                onClick={() => {
                  handleFetch(item.name);
                  handleRefsOfSuggestions(item);
                  setData(item);
                }}
              >
                {item.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
