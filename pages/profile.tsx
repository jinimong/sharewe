import React from 'react';
import Account from '../components/organisms/Account';
import { withAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => <Account />;

export default withAuth(Profile);
