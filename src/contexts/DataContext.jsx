import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    members: [],
    trainers: [],
    membershipPlans: [],
    attendance: [],
    payments: [],
    classes: [],
    settings: {},
    dashboard: {}
  });
  const [loading, setLoading] = useState(true);

  // Load data from JSON file
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage (simulating API update)
  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem('gymData', JSON.stringify(newData));
  };

  // CRUD operations for members
  const addMember = (member) => {
    const newMember = {
      ...member,
      id: Math.max(...data.members.map(m => m.id), 0) + 1,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`,
      attendanceCount: 0,
      lastVisit: null
    };
    const newData = {
      ...data,
      members: [...data.members, newMember]
    };
    saveData(newData);
    return newMember;
  };

  const updateMember = (id, updates) => {
    const newData = {
      ...data,
      members: data.members.map(m => m.id === id ? { ...m, ...updates } : m)
    };
    saveData(newData);
  };

  const deleteMember = (id) => {
    const newData = {
      ...data,
      members: data.members.filter(m => m.id !== id)
    };
    saveData(newData);
  };

  // CRUD operations for trainers
  const addTrainer = (trainer) => {
    const newTrainer = {
      ...trainer,
      id: Math.max(...data.trainers.map(t => t.id), 0) + 1,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${trainer.name}`,
      assignedMembers: 0,
      sessionsCompleted: 0
    };
    const newData = {
      ...data,
      trainers: [...data.trainers, newTrainer]
    };
    saveData(newData);
    return newTrainer;
  };

  const updateTrainer = (id, updates) => {
    const newData = {
      ...data,
      trainers: data.trainers.map(t => t.id === id ? { ...t, ...updates } : t)
    };
    saveData(newData);
  };

  const deleteTrainer = (id) => {
    const newData = {
      ...data,
      trainers: data.trainers.filter(t => t.id !== id)
    };
    saveData(newData);
  };

  // CRUD operations for attendance
  const addAttendance = (attendance) => {
    const newAttendance = {
      ...attendance,
      id: Math.max(...data.attendance.map(a => a.id), 0) + 1,
      date: new Date().toISOString().split('T')[0],
      checkIn: new Date().toISOString()
    };
    const newData = {
      ...data,
      attendance: [...data.attendance, newAttendance]
    };
    saveData(newData);
    return newAttendance;
  };

  const updateAttendance = (id, updates) => {
    const newData = {
      ...data,
      attendance: data.attendance.map(a => a.id === id ? { ...a, ...updates } : a)
    };
    saveData(newData);
  };

  // CRUD operations for payments
  const addPayment = (payment) => {
    const newPayment = {
      ...payment,
      id: Math.max(...data.payments.map(p => p.id), 0) + 1,
      date: new Date().toISOString().split('T')[0],
      invoiceNumber: `INV-${String(Math.max(...data.payments.map(p => parseInt(p.invoiceNumber.split('-')[1])), 0) + 1).padStart(3, '0')}`
    };
    const newData = {
      ...data,
      payments: [...data.payments, newPayment]
    };
    saveData(newData);
    return newPayment;
  };

  // CRUD operations for classes
  const addClass = (classData) => {
    const newClass = {
      ...classData,
      id: Math.max(...data.classes.map(c => c.id), 0) + 1,
      enrolled: 0,
      status: 'Active'
    };
    const newData = {
      ...data,
      classes: [...data.classes, newClass]
    };
    saveData(newData);
    return newClass;
  };

  const updateClass = (id, updates) => {
    const newData = {
      ...data,
      classes: data.classes.map(c => c.id === id ? { ...c, ...updates } : c)
    };
    saveData(newData);
  };

  const deleteClass = (id) => {
    const newData = {
      ...data,
      classes: data.classes.filter(c => c.id !== id)
    };
    saveData(newData);
  };

  const value = {
    data,
    loading,
    addMember,
    updateMember,
    deleteMember,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addAttendance,
    updateAttendance,
    addPayment,
    addClass,
    updateClass,
    deleteClass
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
