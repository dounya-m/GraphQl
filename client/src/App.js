import Header from './components/assets/Header'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Client from './components/client/Client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
      <Header />
      <Client />
      </ApolloProvider>
    </div>
  );
}

export default App;
