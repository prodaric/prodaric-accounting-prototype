import { ReactNode, useState } from 'react';
import { useLocation, Link } from 'react-router';
import { 
  Home, Building2, Calendar, BookOpen, FileText, 
  BarChart3, FileBarChart, Settings, Shield, 
  Users, Leaf, ChevronDown, Menu, X 
} from 'lucide-react';
import { currentUser, entities } from '../data/mockData';

interface AppShellProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: typeof Home;
  roles?: string[];
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/entity-period', label: 'Entity & Period', icon: Building2 },
  { path: '/chart-of-accounts', label: 'Chart of Accounts', icon: BookOpen },
  { path: '/journal', label: 'Journal', icon: FileText, roles: ['admin', 'accountant'] },
  { path: '/ledger', label: 'Ledger', icon: BookOpen, roles: ['admin', 'accountant', 'auditor'] },
  { path: '/trial-balance', label: 'Trial Balance', icon: BarChart3 },
  { path: '/balance', label: 'Balance', icon: BarChart3 },
  { path: '/reports', label: 'Reports', icon: FileBarChart },
  { path: '/close-period', label: 'Close Period', icon: Calendar, roles: ['admin'] },
  { path: '/configuration', label: 'Configuration', icon: Settings, roles: ['admin', 'accountant'] },
  { path: '/administration', label: 'Administration', icon: Users, roles: ['admin'] },
  { path: '/audit-log', label: 'Audit Log', icon: Shield, roles: ['admin', 'auditor'] },
  { path: '/sustainability', label: 'Sustainability', icon: Leaf, roles: ['admin', 'accountant'] }
];

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const [selectedEntity, setSelectedEntity] = useState(entities[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [entityDropdownOpen, setEntityDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const currentEntity = entities.find(e => e.id === selectedEntity);

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(currentUser.role);
  });

  const getBreadcrumb = () => {
    const path = location.pathname;
    const parts = ['Home'];
    
    const navItem = navItems.find(item => path.startsWith(item.path));
    if (navItem && navItem.path !== '/dashboard') {
      parts.push(navItem.label);
    }
    
    if (path.startsWith('/ledger/') && path !== '/ledger') {
      parts.push('Entry Detail');
    }
    
    return parts;
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="h-12 bg-[#e8e8e8] border-b border-[#c0c0c0] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-[#d0d0d0] rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Entity Selector */}
          <div className="relative">
            <button
              onClick={() => setEntityDropdownOpen(!entityDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1 bg-white border border-[#c0c0c0] rounded hover:bg-[#f9f9f9]"
            >
              <Building2 size={16} />
              <span className="text-sm">{currentEntity?.name}</span>
              <ChevronDown size={14} />
            </button>
            {entityDropdownOpen && (
              <div className="absolute top-full mt-1 left-0 w-64 bg-white border border-[#c0c0c0] rounded shadow-lg z-50">
                {entities.map(entity => (
                  <button
                    key={entity.id}
                    onClick={() => {
                      setSelectedEntity(entity.id);
                      setEntityDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-[#f0f0f0] ${
                      entity.id === selectedEntity ? 'bg-[#e0e0e0]' : ''
                    }`}
                  >
                    <div className="font-medium">{entity.name}</div>
                    <div className="text-xs text-[#666]">
                      {entity.jurisdiction} • {entity.currency}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1 bg-white border border-[#c0c0c0] rounded hover:bg-[#f9f9f9]"
          >
            <div className="w-6 h-6 rounded-full bg-[#808080] flex items-center justify-center text-white text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <span className="text-sm">{currentUser.name}</span>
            <ChevronDown size={14} />
          </button>
          {userDropdownOpen && (
            <div className="absolute top-full mt-1 right-0 w-56 bg-white border border-[#c0c0c0] rounded shadow-lg z-50">
              <div className="px-3 py-2 border-b border-[#e0e0e0]">
                <div className="text-sm font-medium">{currentUser.name}</div>
                <div className="text-xs text-[#666]">{currentUser.email}</div>
                <div className="text-xs text-[#666] capitalize mt-1">Role: {currentUser.role}</div>
              </div>
              <button className="w-full px-3 py-2 text-left text-sm hover:bg-[#f0f0f0]">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 bg-[#e8e8e8] border-r border-[#c0c0c0] overflow-y-auto">
            <nav className="p-2">
              {filteredNavItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded mb-1 text-sm ${
                      isActive
                        ? 'bg-[#d0d0d0] text-[#1a1a1a]'
                        : 'text-[#333] hover:bg-[#d8d8d8]'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Breadcrumb */}
          <div className="h-10 bg-white border-b border-[#c0c0c0] flex items-center px-4">
            <div className="flex items-center gap-2 text-sm text-[#555]">
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span>&gt;</span>}
                  <span className={index === breadcrumb.length - 1 ? 'text-[#1a1a1a]' : ''}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
