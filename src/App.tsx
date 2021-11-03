import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import Login from './pages/login/Login';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='root'>
          <Switch>
            <Route exact path='/' component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
