import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { 
  FaTasks, 
  FaChartLine, 
  FaTrophy, 
  FaList,
  FaHeart, 
  FaStore, 
  FaUsers, 
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaUser
} from 'react-icons/fa'
import './SidebarComponent.css'

const SidebarComponent = ({ userType }) => {
  const [collapsed, setCollapsed] = useState(false)
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  
  // Different navigation items based on user type
  const getNavItems = () => {
    const commonItems = [
      { icon: <FaHome />,  label: 'Dashboard',    link: userType === 'admin' ? '/admin' : '/user' },
      { icon: <FaTasks />, label: 'Tasks',        link: userType === 'admin' ? '/admin-tasks' : '/user-tasks' },
      { icon: <FaTrophy />,label: 'Achievements', link: '/achievements' },
      { icon: <FaList />,  label: 'Leaderboard',  link: '/leaderboard' },
      { icon: <FaChartLine />, label: 'Analytics', link: '/analytics' }, // <--- Analytics link
      { icon: <FaStore />, label: 'Reward Store', link: '/rewards' },
      { icon: <FaHeart />, label: 'Wellness',     link: '/wellness' },
      { icon: <FaUser />,  label: 'Profile',      link: '/profile' },
    ]
    
    // Admin specific items
    const adminItems = [
      { icon: <FaUsers />, label: 'Manage Users', link: '/manage-users' },
      { icon: <FaCog />,   label: 'Settings',     link: '/settings' }
    ]
    
    return userType === 'admin' 
      ? [...commonItems, ...adminItems] 
      : commonItems
  }
  
  return (
    <div className={`sidebar bg-dark text-white ${collapsed ? 'collapsed' : ''}`}>
      {/* Header area */}
      <div className="sidebar-header p-3 d-flex justify-content-between align-items-center">
        <h3 className={`mb-0 ${collapsed ? 'd-none' : ''}`}>ACHIEVE+</h3>
        <button 
          className="btn btn-dark border-0" 
          onClick={toggleSidebar}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      
      {/* Navigation Items */}
      <Nav className="flex-column pt-2">
        {getNavItems().map((item, index) => (
          <Nav.Item key={index}>
            {/* Use as={Link} to for React Router routing */}
            <Nav.Link 
              as={Link}
              to={item.link}
              className="text-white d-flex align-items-center p-3 nav-link"
            >
              <span className="me-3">{item.icon}</span>
              <span className={collapsed ? 'd-none' : ''}>
                {item.label}
              </span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      
      {/* Footer area (Points, Admin Panel, etc.) */}
      <div className={`sidebar-footer mt-auto p-3 border-top border-secondary ${collapsed ? 'd-none' : ''}`}>
        <div className="small text-muted mb-2">Current Points</div>
        <div className="h4 mb-0">
          {userType === 'admin' ? 'Admin Panel' : '578 pts'}
        </div>
      </div>
    </div>
  )
}

export default SidebarComponent
