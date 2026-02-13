import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Download } from 'lucide-react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { useData } from '../contexts/DataContext';
import { useNotification } from '../contexts/NotificationContext';

const Members = () => {
  const { data, addMember, updateMember, deleteMember, loading } = useData();
  const { showSuccess, showError } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search members
  const filteredMembers = useMemo(() => {
    return data.members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data.members, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipPlan: 'Basic',
    status: 'Active',
    age: '',
    gender: 'Male',
    address: '',
    emergencyContact: '',
    expiryDate: ''
  });

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        membershipPlan: 'Basic',
        status: 'Active',
        age: '',
        gender: 'Male',
        address: '',
        emergencyContact: '',
        expiryDate: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        updateMember(editingMember.id, formData);
        showSuccess('Member updated successfully!');
      } else {
        addMember(formData);
        showSuccess('Member added successfully!');
      }
      handleCloseModal();
    } catch (error) {
      showError('An error occurred. Please try again.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        deleteMember(id);
        showSuccess('Member deleted successfully!');
      } catch (error) {
        showError('An error occurred. Please try again.');
      }
    }
  };

  const columns = [
    {
      header: 'Member',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{row.name}</p>
            <p className="text-sm text-gray-500 dark:text-dark-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Phone',
      accessor: 'phone'
    },
    {
      header: 'Plan',
      accessor: 'membershipPlan',
      render: (row) => (
        <span className={`badge ${
          row.membershipPlan === 'Premium' ? 'badge-warning' :
          row.membershipPlan === 'Standard' ? 'badge-info' :
          'badge-success'
        }`}>
          {row.membershipPlan}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`badge ${row.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Join Date',
      accessor: 'joinDate',
      render: (row) => new Date(row.joinDate).toLocaleDateString()
    },
    {
      header: 'Expiry Date',
      accessor: 'expiryDate',
      render: (row) => new Date(row.expiryDate).toLocaleDateString()
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal(row)}
            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
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
      {/* Page Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Members</h1>
          <p className="page-subtitle">Manage your gym members and their subscriptions</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select-field"
            >
              <option>All</option>
              <option>Active</option>
              <option>Expired</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="card">
        <Table columns={columns} data={paginatedMembers} />
        {filteredMembers.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredMembers.length}
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingMember ? 'Edit Member' : 'Add New Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="input-field"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="select-field"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Membership Plan *
              </label>
              <select
                value={formData.membershipPlan}
                onChange={(e) => setFormData({ ...formData, membershipPlan: e.target.value })}
                className="select-field"
              >
                <option>Basic</option>
                <option>Standard</option>
                <option>Premium</option>
                <option>Elite</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="select-field"
              >
                <option>Active</option>
                <option>Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="input-field"
                placeholder="+1234567890"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="input-field"
                rows="3"
                placeholder="Full address"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleCloseModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingMember ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Members;
