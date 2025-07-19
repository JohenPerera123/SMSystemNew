
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import PrivetRoutes from './utils/PrivetRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import StadiumsList from './components/dashboard/stadiums/StadiumsList'
import AddStadiums from './components/dashboard/stadiums/AddStadiums'
import EditStadiums from './components/dashboard/stadiums/EditStadiums'
import EventList from './components/dashboard/events/eventList'
import UEventList from './components/dashboard/events/UEventList'
import AddEvent from './components/dashboard/events/AddEvent'
import Register from './pages/Register'
import TicketBook from './components/dashboard/ticket/TicketBook'
import AddTicketPage from './components/dashboard/ticket/AddTicketPage'
import UCrm from './components/dashboard/crm/UCrm'
import CrmList from './components/dashboard/crm/CrmList'
import ResourcesList from './components/dashboard/resources/ResourcesList'
import AddResource from './components/dashboard/resources/AddResources'
import EditResource from './components/dashboard/resources/EditResource'
import UResourcesList from './components/dashboard/resources/UResourcesList'
import UEventBooking from './components/dashboard/EventBooking/UEventBooking'
import AddEventBooking from './components/dashboard/EventBooking/AddEventBooking'
import EventBooking from './components/dashboard/EventBooking/EventBooking'
import AdminAddEventBooking from './components/dashboard/EventBooking/AdminAddEventBooking'
import Contact from './components/dashboard/contact/Contact'
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/verify-otp" element={<VerifyOtp />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivetRoutes>
            <RoleBaseRoutes requiredRole={['admin']}>
            <AdminDashboard />
            </RoleBaseRoutes>
          </PrivetRoutes>
      }>
        <Route index element={<AdminSummary />}></Route>
        <Route path="/admin-dashboard/stadiums" element={<StadiumsList />}></Route>
        <Route path="/admin-dashboard/add-stadiums" element={<AddStadiums />}></Route>
        <Route path="/admin-dashboard/stadium/:id" element={<EditStadiums />}></Route>

        <Route path="/admin-dashboard/events" element={<EventList />}></Route>
        <Route path="/admin-dashboard/add-events" element={<AddEvent />}></Route>

        <Route path="/admin-dashboard/crm" element={<CrmList />}></Route>

        <Route path="/admin-dashboard/resources" element={<ResourcesList />}></Route>
        <Route path="/admin-dashboard/add-resources" element={<AddResource />}></Route>
        <Route path="/admin-dashboard/update-resource/:id" element={<EditResource />}></Route>

        <Route path="/admin-dashboard/eventbooking" element={<EventBooking />}></Route>

        <Route path="/admin-dashboard/add-eventbooking" element={<AdminAddEventBooking />}></Route>
        
        

      </Route>
        <Route path="/user-dashboard" element={
  <PrivetRoutes>
    <RoleBaseRoutes requiredRole={['user']}>
      <UserDashboard />
    </RoleBaseRoutes>
  </PrivetRoutes>
}>
  <Route index element={<Navigate to="events" />} />
  <Route path="events" element={<UEventList />} />
  <Route path="ticket" element={<TicketBook />} />
  <Route path="/user-dashboard/book/:eventId" element={<AddTicketPage />} />
  <Route path="/user-dashboard/crm" element={<UCrm />} />
  <Route path="/user-dashboard/resources" element={<UResourcesList />} />
  <Route path="/user-dashboard/eventbooking" element={<UEventBooking />} />
  <Route path="/user-dashboard/add-eventbooking" element={<AddEventBooking/>}/>
  <Route path='/user-dashboard/contact' element={<Contact/>}/>
</Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
