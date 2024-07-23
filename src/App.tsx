import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Results from './components/Results';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface Person {
  name: string;
  value: number;
}

function App() {
  const [currView, setCurrView] = useState<string | null>('Persons');
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [currencySelected, setCurrencySelected] = useState<string>("£");
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'GBP',
      label: '£',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const addPerson = (name: string, value: number) => {
    if (name.length > 0) {
      setPeople([...people, { name, value }]);
    }
  };

  const handleRemovePerson = (index: number) => {
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencySelected(event.target.value);
  };

  if (currView === 'Persons') {
    return (
      <>
        <Navbar currView={currView} setCurrView={setCurrView} />
        <div className='content'>
          <h2>Find out how much money you owe or are owed after splitting a bill equally.</h2>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: 'flex',
              flexDirection: 'column', // Align items vertically in this container
              alignItems: 'center',    // Center items horizontally
              '& .MuiTextField-root': { m: 1 },
              '& label': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:after': { borderBottomColor: 'white' },
              '& .MuiInput-input': { color: 'white' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,  // Adjust gap between elements
                flexWrap: 'wrap', // To handle responsiveness
                justifyContent: 'center', // Center items horizontally
                width: '100%',  // Full width for container
              }}
            >
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue="£"
                helperText="Please select your currency"
                onChange={handleCurrencyChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
                FormHelperTextProps={{ style: { color: 'white' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="name-standard-basic"
                label="Name"
                variant="standard"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                required
                id="amount-standard-basic"
                label="Amount"
                variant="standard"
                value={amount}
                onChange={handleAmountChange}
              />
              <Button
                variant='contained'
                color="success"
                onClick={() => {
                  addPerson(name, +amount);
                  setName("");
                  setAmount("");
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
          {people.map((person, index) => (
            <div key={index}>
              <div>{person.name}, {currencySelected}{person.value}</div>
              <IconButton aria-label="delete" onClick={() => handleRemovePerson(index)} color='error'>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </>
    );
  } else if (currView === 'Results') {
    return (
      <>
        <Navbar currView={currView} setCurrView={setCurrView} />
        <Results people={people} currency={currencySelected} />
      </>
    );
  }
}

export default App;
