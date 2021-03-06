import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/About/About';
import BlogPage from './components/BlogPage/BlogPage';
import Footer from './components/Common/Footer/Footer';
import Header from './components/Common/Header/Header';
import Details from './components/Details/Details';
import HomeContainer from './components/Home/HomeContainer/HomeContainer';
import NotFound from './components/NotFound/NotFound'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './components/utilities/AuthProvider/AuthProvider';
import PrivateRoute from './components/utilities/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <HomeContainer></HomeContainer>
            </Route>
            <Route path="/home">
              <HomeContainer></HomeContainer>
            </Route>
            <Route path="/signUp">
              <SignUp></SignUp>
            </Route>
            <Route path="/signIn">
              <SignIn></SignIn>
            </Route>
            <PrivateRoute path="/details/:productId">
              <Details></Details>
            </PrivateRoute>
            <Route path="/blogs">
              <BlogPage></BlogPage>
            </Route>
            <Route path="/about">
              <About></About>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
