import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  Dashboard,
  Settings,
  Login
} from './admin';

import Transaction from './admin/dashboard/pages/transaction';
import Package from './admin/dashboard/pages/package';
import Member from './admin/dashboard/pages/member';
import Administrator from './admin/dashboard/pages/administrator';
import Profile_admin from './admin/dashboard/pages/profile';

import {
  LandingPage,
  PlaceOrder,
  LoginClient,
  RegisterClient,
  Profile,
  Home
} from "./client";

import PickDrop from './client/placeOrder/pages/pick_drop';
import Instruction from './client/placeOrder/pages/instruction';
import Payment from './client/placeOrder/pages/payment';
import Done from './client/placeOrder/pages/done';

import {
  LazyLoad,
  NotFound,
  Navbar,
  NavbarClient
} from './components';


function App() {
  return (
    <Suspense fallback={<LazyLoad />}>
      <Routes>
        {/* Client Section */}
        <Route>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginClient />} />
          <Route path="register" element={<RegisterClient />} />
          <Route path="profile" element={<><NavbarClient /><Profile /></>} />
          <Route path="home" element={<><NavbarClient /><Home /></>} />
          <Route path="order">
            <Route index element={<><NavbarClient /><PlaceOrder /></>} />
            <Route path="pick_drop" element={<><NavbarClient /><PickDrop /></>} />
            <Route path="instruction" element={<><NavbarClient /><Instruction /></>} />
            <Route path="payment" element={<><NavbarClient /><Payment /></>} />
            <Route path="done" element={<><NavbarClient /><Done /></>} />
          </Route>
        </Route>

        {/* Admin Section */}
        <Route path="admin">
          <Route index element={<><Navbar /><Dashboard /></>} />
          <Route path="transaction" element={<><Navbar /><Transaction /></>} />
          <Route path="package" element={<><Navbar/><Package /></>} />
          <Route path="member" element={<><Navbar/><Member /></>} />
          <Route path="administrator" element={<><Navbar/><Administrator /></>} />
          <Route path="profile" element={<><Navbar/><Profile_admin /></>} />
          <Route path="login" element={<><Navbar/><Login /></>} />
          <Route path="settings" element={<><Navbar/><Settings /></>} />
        </Route>

        {/* Notfound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
