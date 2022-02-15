import { makeStyles } from '@material-ui/core';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider
} from '@apollo/client';
import Cookies from 'universal-cookie';
// Pages
import Login from './pages/login';
import Index from './pages/index';


const useStyle = makeStyles({
  root:{
    background: '#30302B'
  }
});
const cookie = new Cookies();

const client = new ApolloClient({
  uri:'http://localhost:4000/',
  cache: new InMemoryCache()
})

function App() {
  const classes = useStyle(),
    session = cookie.get("session");
  
  const Redirect = ()=>{
    if(!session) return <Login/>
    else return <Index/>
  }
  // console.log(session)
  return (
    <ApolloProvider client={client}>
    <div className={classes.root}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Redirect/>}/>
          <Route path="/" element={<Index/>}/>
          <Route path="*" element={<Redirect/>}/>

        </Routes>
      </BrowserRouter>
      
    </div>
    </ApolloProvider>
  );
}

export default App;
