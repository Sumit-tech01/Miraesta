import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, getUserOrders } from '../services/authService';

export default function UserProfile({ onClose }) {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    }
  }, [activeTab]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaveStatus('saving');
      await updateProfile(editForm);
      setSaveStatus('saved');
      setEditing(false);
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const tabs = ['overview', 'orders', 'favorites'];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 overflow-y-auto py-8">
      <div className="bg-white w-full max-w-[680px] mx-4 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[60px] border-b border-[#e5e5e5]">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.06em]">My Account</h2>
          <button onClick={onClose} className="text-[#999] hover:text-black text-2xl leading-none">×</button>
        </div>

        {/* User Info Bar */}
        <div className="px-6 py-5 border-b border-[#e5e5e5] flex items-center gap-4">
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[20px] font-semibold">
              {(user?.name || 'U')[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold text-black">{user?.name}</p>
            <p className="text-[12px] text-[#666]">{user?.email}</p>
            <p className="text-[11px] text-[#999] mt-0.5">
              Member since {user?.memberSince 
                ? new Date(user.memberSince).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
                : 'Recently'}
            </p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="text-[11px] font-semibold uppercase tracking-wide border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {/* Edit Form */}
        {editing && (
          <div className="px-6 py-4 bg-[#f9f9f9] border-b border-[#e5e5e5]">
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Full Name"
                value={editForm.name}
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                className="flex-1 border border-[#e5e5e5] px-3 py-2 text-[13px] outline-none focus:border-black"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={editForm.phone}
                onChange={e => setEditForm({...editForm, phone: e.target.value})}
                className="flex-1 border border-[#e5e5e5] px-3 py-2 text-[13px] outline-none focus:border-black"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2 bg-black text-white text-[12px] font-bold uppercase tracking-wide hover:bg-[#333] transition-colors"
            >
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 border-b border-[#e5e5e5]">
          {[
            { label: 'Total Orders', value: user?.stats?.totalOrders || 0 },
            { label: 'Delivered', value: user?.stats?.completedOrders || 0 },
            { label: 'Cancelled', value: user?.stats?.cancelledOrders || 0 },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-5 border-r last:border-r-0 border-[#e5e5e5]">
              <p className="text-[24px] font-bold text-black">{stat.value}</p>
              <p className="text-[11px] text-[#999] uppercase tracking-wide mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Total Spent */}
        <div className="px-6 py-3 bg-black text-white flex items-center justify-between">
          <span className="text-[12px] uppercase tracking-wide">Total Spent</span>
          <span className="text-[16px] font-bold">
            ₹{(user?.stats?.totalSpent || 0).toLocaleString()}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e5e5e5]">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[12px] font-bold uppercase tracking-wide transition-colors ${
                activeTab === tab 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-[#999] hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 min-h-[200px]">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="border border-[#e5e5e5] p-4">
                <p className="text-[11px] text-[#999] uppercase tracking-wide mb-3 font-bold">Account Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#666]">Name</span>
                    <span className="text-[12px] font-medium text-black">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#666]">Email</span>
                    <span className="text-[12px] font-medium text-black">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#666]">Phone</span>
                    <span className="text-[12px] font-medium text-black">{user?.phone || 'Not added'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#666]">Account Type</span>
                    <span className="text-[12px] font-medium text-black capitalize">{user?.role || 'Customer'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[13px] text-[#666]">No orders yet</p>
                  <p className="text-[11px] text-[#999] mt-1">Start shopping to see your orders here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="border border-[#e5e5e5] p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-[11px] text-[#999]">Order ID</p>
                          <p className="text-[12px] font-mono font-medium text-black">
                            #{order._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <p className="text-[11px] text-[#999] mt-1">
                            {new Date(order.createdAt).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-10 h-12 object-cover object-top bg-[#f5f5f5]"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-[#999] uppercase">{item.brand}</p>
                              <p className="text-[12px] font-medium truncate">{item.name}</p>
                              <p className="text-[11px] text-[#666]">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-[12px] font-semibold">₹{item.price.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-[#f0f0f0] pt-2 flex justify-between items-center">
                        <span className={`text-[11px] px-2 py-0.5 rounded ${
                          order.paymentStatus === 'paid' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          Payment: {order.paymentStatus}
                        </span>
                        <span className="text-[13px] font-bold">₹{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FAVORITES TAB */}
          {activeTab === 'favorites' && (
            <div>
              {!user?.favorites || user.favorites.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-10 h-10 text-[#ccc] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <p className="text-[13px] text-[#666]">No favorites yet</p>
                  <p className="text-[11px] text-[#999] mt-1">Heart products to save them here</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {user.favorites.map(product => (
                    <div key={product._id} className="border border-[#e5e5e5] p-3 flex gap-3">
                      <img
                        src={product.images?.[0] || '/images/placeholder.png'}
                        alt={product.name}
                        className="w-16 h-20 object-cover object-top bg-[#f5f5f5]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-[#999] uppercase">{product.brand}</p>
                        <p className="text-[12px] font-medium truncate">{product.name}</p>
                        <p className="text-[13px] font-bold mt-1">₹{product.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

