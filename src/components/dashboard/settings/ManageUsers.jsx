import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../../supabaseClient';
import UserTableLog from '../admin/UserTableLog';

export default function ManageUsers() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage]); // Re-fetch when page changes

  async function fetchUsers() {
    setLoading(true);
    
    // Calculate range for Supabase (0-9, 10-19, etc)
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from('customer_profiles')
      .select('id, first_name, last_name, address, email, phone')
      .range(from, to)
      .order('first_name', { ascending: true });

    if (error) console.error("Error fetching customers:", error);
    else setUserList(data || []);
    setLoading(false);
  }

  // Filter logic now works on the current page slice
  const filteredUsers = userList.filter((user) => {
    const search = searchQuery.toLowerCase();
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    return (
      fullName.includes(search) ||
      (user.email || '').toLowerCase().includes(search) ||
      (user.phone || '').toString().includes(search)
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-slate-100">Customer Registry Log</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
          <input
            type="text"
            placeholder="Search name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-slate-500 text-center py-10">Loading...</div>
      ) : (
        <>
          <UserTableLog users={filteredUsers} />
          
          {/* DaisyUI Pagination Controls */}
          <div className="flex justify-center mt-6">
            <div className="join">
              <button 
                className="join-item btn btn-sm bg-slate-900 border-slate-800"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button className="join-item btn btn-sm bg-slate-900 border-slate-800 text-white">
                Page {currentPage}
              </button>
              <button 
                className="join-item btn btn-sm bg-slate-900 border-slate-800"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={userList.length < pageSize} // Simple check for next page
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}