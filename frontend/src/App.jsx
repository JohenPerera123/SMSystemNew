
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import PrivetRoutes from './utils/PrivetRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import StadiumsList from './components/dashboard/stadiums/StadiumsList'
import AddStadiums from './components/dashboard/stadiums/AddStadiums'
import EditStadiums from './components/dashboard/stadiums/EditStadiums'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path="/login" element={<Login />}></Route>
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

      </Route>
        <Route path="/user-dashboard" element={<userDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
