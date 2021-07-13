import React from 'react';
import Account from '../components/organisms/Account';
import withAuth from '../helpers/withAuth';

const Profile: React.FC = () => <Account />;

export default withAuth(Profile);
