import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SignUpPage from './components/views/signUp/SignUp';
import PageLayout from './components/layout/PageLayout';
import Profile from './components/views/profile/Profile';
import LoginPage from './components/views/Login/Login'
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {




  return (
    <ApolloProvider client={client}>

      <Router>
        <PageLayout />
        <Routes>
          {/* <Route
              path="/"
              element={<Homepage />}
            /> */}
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/sign-up"
            element={<SignUpPage />}
          />
          <Route
            path="/log-in"
            element={<LoginPage />}
          />
        </Routes>


      </Router>

    </ApolloProvider>
  );
}

export default App;
