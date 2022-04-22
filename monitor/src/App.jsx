import React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import GPUInfoCard from './GPUInfoCard'
import './App.css'
import Stack from '@mui/material/Stack';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    }
  }
  componentDidMount() {
    const _this = this;
    setInterval(function() {
      axios.get('/api')
      .then(function (response) {
        // console.log(response);
        _this.setState({ info: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    }, 1000);
  }
  render() {
    const info = this.state.info;
    return (
      <div className="App">
        <Box sx={{
          margin: '10px'
        }}>
        {/* <Stack spacing={1} sx={{
          alignItems: 'center'
        }}> */}
          {Object.keys(info).map((v, i) => (
            <GPUInfoCard key={i} id={i} data={info[v]} />
          ))}
        {/* </Stack> */}
        </Box>
      </div>
    )
  }
}

export default App;