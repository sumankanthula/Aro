import * as React from 'react';
import { Redirect, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import HotelList from './components/HotelList';
import HotelDetail from './components/HotelDetail';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/hotel-list/:startDateIndex?' component={HotelList} />
        <Route path='/hotel-details/:id?' component={HotelDetail} />

    </Layout>
);
