import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

function Search() {
  const [optionPicked, setOptionPicked] = useState('');
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'strawberry', label: 'Strawberry' },
  ];

  return (
    <Container>
      <h1>React-select</h1>
      <Select
        options={options}
        placeholder="Search"
        onChange={(option) => setOptionPicked(option)}
        isMulti
        closeMenuOnSelect={false}
      />
      <p>{optionPicked.label}</p>
      <CreatableSelect isMulti options={options} />
    </Container>
  );
}

export default Search;
