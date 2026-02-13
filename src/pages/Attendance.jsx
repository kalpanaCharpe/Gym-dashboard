import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import Table from '../components/Table';
import { useData } from '../contexts/DataContext';

const Attendance = () => {
  const { data, loading } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredAttendance = data.attendance.filter(
    record => record.date === selectedDate
  );

  const columns = [
    {
      header: 'Member',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
            {row.memberName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{row.memberName}</p>
            {/* <p className="text-sm text-gray-500 dark:text-dark-500">ID: {row.memberId}</p> */}
          </div>
        </div>
      )
    },
    {
      header: 'Check In',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-green-500" />
          <span>{new Date(row.checkIn).toLocaleTimeString()}</span>
        </div>
      )
    },
    {
      header: 'Check Out',
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.checkOut ? (
            <>
              <Clock className="w-4 h-4 text-red-500" />
              <span>{new Date(row.checkOut).toLocaleTimeString()}</span>
            </>
          ) : (
            <span className="badge badge-info">In Progress</span>
          )}
        </div>
      )
    },
    {
      header: 'Duration',
      render: (row) => (
        <span className="font-semibold text-gray-900 dark:text-white">{row.duration}</span>
      )
    },
    {
      header: 'Status',
      render: (row) => (
        <span className={`badge ${row.checkOut ? 'badge-success' : 'badge-warning'}`}>
          {row.checkOut ? 'Completed' : 'Active'}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">Track daily member check-ins and activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-600">Today's Check-ins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredAttendance.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-600">Active Now</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredAttendance.filter(a => !a.checkOut).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-600">Avg. Duration</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1h 45m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Date Filter */}
      <div className="card p-4">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field max-w-xs"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="card">
        <Table columns={columns} data={filteredAttendance} />
      </div>
    </div>
  );
};

export default Attendance;
