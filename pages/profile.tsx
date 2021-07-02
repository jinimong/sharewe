import Account from '../components/organisms/Account';
import { withAuth } from '../contexts/AuthContext';

const Profile = () => {
  return <Account />;
};

export default withAuth(Profile);
