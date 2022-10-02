import {Redirect} from 'react-router-dom';

const protectedRoute = ({loggedIn, children}) => {
  return loggedIn ? children : <Redirect to="/sign-in" />
};

export default protectedRoute;