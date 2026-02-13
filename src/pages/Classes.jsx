import React, { useState } from 'react';
import { Plus, Users, Clock, Calendar, Edit, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { useData } from '../contexts/DataContext';
import { useNotification } from '../contexts/NotificationContext';

const Classes = () => {
  const { data, addClass, updateClass, deleteClass, loading } = useData();
  const { showSuccess, showError } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    trainerId: '',
    schedule: '',
    duration: '',
    capacity: '',
    description: '',
    level: 'Beginner'
  });

  const handleOpenModal = (classItem = null) => {
    if (classItem) {
      setEditingClass(classItem);
      setFormData(classItem);
    } else {
      setEditingClass(null);
      setFormData({
        name: '',
        trainerId: '',
        schedule: '',
        duration: '',
        capacity: '',
        description: '',
        level: 'Beginner'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const trainer = data.trainers.find(t => t.id === parseInt(formData.trainerId));
      const classData = {
        ...formData,
        trainer: trainer?.name || '',
        trainerId: parseInt(formData.trainerId),
        capacity: parseInt(formData.capacity)
      };

      if (editingClass) {
        updateClass(editingClass.id, classData);
        showSuccess('Class updated successfully!');
      } else {
        addClass(classData);
        showSuccess('Class added successfully!');
      }
      handleCloseModal();
    } catch (error) {
      showError('An error occurred. Please try again.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        deleteClass(id);
        showSuccess('Class deleted successfully!');
      } catch (error) {
        showError('An error occurred. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Classes</h1>
          <p className="page-subtitle">Manage gym classes and schedules</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Class
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.classes.map((classItem) => (
          <div key={classItem.id} className="card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {classItem.name}
                </h3>
                {/* <p className="text-sm text-gray-900 dark:text-dark-600">
                  with {classItem.trainer}
                </p> */}
                <p className="text-sm text-gray-900 dark:text-dark-600">
                  Trainer: <span className="font-bold">{classItem.trainer}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(classItem)}
                  className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(classItem.id)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-dark-600 mb-4">
              {classItem.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-dark-700">
                <Calendar className="w-4 h-4 text-primary-500" />
                <span>{classItem.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-dark-700">
                <Clock className="w-4 h-4 text-primary-500" />
                <span>{classItem.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-dark-700">
                <Users className="w-4 h-4 text-primary-500" />
                <span>{classItem.enrolled}/{classItem.capacity} enrolled</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-2 bg-gray-200 dark:bg-dark-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
                  style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="badge badge-info">{classItem.level}</span>
              <span className={`badge ${classItem.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                {classItem.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingClass ? 'Edit Class' : 'Add New Class'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Class Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="Yoga Flow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Trainer *
              </label>
              <select
                required
                value={formData.trainerId}
                onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
                className="select-field"
              >
                <option value="">Select Trainer</option>
                {data.trainers.map(trainer => (
                  <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Schedule *
              </label>
              <input
                type="text"
                required
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="input-field"
                placeholder="Mon, Wed, Fri - 7:00 AM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="input-field"
                placeholder="60 minutes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Capacity *
              </label>
              <input
                type="number"
                required
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="input-field"
                placeholder="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="select-field"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>All Levels</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows="3"
                placeholder="Class description..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleCloseModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingClass ? 'Update Class' : 'Add Class'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Classes;
