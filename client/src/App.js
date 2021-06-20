import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component'

import BlogList from './components/blogs/list';
import BlogNew from './components/blogs/new';
import BlogUpdate from './components/blogs/update';
import Dashboard from './components/Dashboard/dashboard';

function App() {
  return <>
  <ReactNotification />
      <BrowserRouter>
        <Route exact path="/" component={Dashboard} />
        <Route path="/blog/new" component={BlogNew} />
        <Route path="/blog/list" component={BlogList} />
        <Route path="/blog/:id/details" component={BlogUpdate} />
      </BrowserRouter>
  </>;
}

export default App;