import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, Award } from 'lucide-react';
import Modal from '../components/Modal';
import { useData } from '../contexts/DataContext';
import { useNotification } from '../contexts/NotificationContext';

const Trainers = () => {
  const { data, addTrainer, updateTrainer, deleteTrainer, loading } = useData();
  const { showSuccess, showError } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    status: 'Active',
    rating: 0,
    certifications: ''
  });

  const handleOpenModal = (trainer = null) => {
    if (trainer) {
      setEditingTrainer(trainer);
      setFormData({
        ...trainer,
        certifications: trainer.certifications.join(', ')
      });
    } else {
      setEditingTrainer(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        experience: '',
        status: 'Active',
        rating: 0,
        certifications: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTrainer(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const trainerData = {
        ...formData,
        certifications: formData.certifications.split(',').map(c => c.trim()).filter(c => c)
      };

      if (editingTrainer) {
        updateTrainer(editingTrainer.id, trainerData);
        showSuccess('Trainer updated successfully!');
      } else {
        addTrainer(trainerData);
        showSuccess('Trainer added successfully!');
      }
      handleCloseModal();
    } catch (error) {
      showError('An error occurred. Please try again.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      try {
        deleteTrainer(id);
        showSuccess('Trainer deleted successfully!');
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
      {/* Page Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Trainers</h1>
          <p className="page-subtitle">Manage your gym trainers and their specializations</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Trainer
        </button>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.trainers.map((trainer) => (
          <div key={trainer.id} className="card p-6 group hover:shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <img
                src={trainer.avatar}
                alt={trainer.name}
                className="w-16 h-16 rounded-full ring-4 ring-gray-100 dark:ring-dark-100"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(trainer)}
                  className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(trainer.id)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{trainer.name}</h3>
                <p className="text-sm text-gray-600 dark:text-dark-600">{trainer.specialization}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(trainer.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-dark-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-dark-700">
                  {trainer.rating}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-dark-200">
                <div>
                  <p className="text-xs text-gray-500 dark:text-dark-500">Members</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {trainer.assignedMembers}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-dark-500">Sessions</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {trainer.sessionsCompleted}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-600">
                <Award className="w-4 h-4" />
                <span>{trainer.experience} experience</span>
              </div>

              {/* Certifications */}
              {trainer.certifications && trainer.certifications.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {trainer.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded text-xs font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}

              {/* Contact */}
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 dark:text-dark-600">{trainer.email}</p>
                <p className="text-gray-600 dark:text-dark-600">{trainer.phone}</p>
              </div>

              {/* Status */}
              <span className={`badge ${trainer.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                {trainer.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTrainer ? 'Edit Trainer' : 'Add New Trainer'}
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
                placeholder="john@fitcore.com"
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
                Specialization *
              </label>
              <input
                type="text"
                required
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="input-field"
                placeholder="Strength Training"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Experience *
              </label>
              <input
                type="text"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="input-field"
                placeholder="5 years"
              />
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
                <option>Inactive</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-2">
                Certifications (comma-separated)
              </label>
              <input
                type="text"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                className="input-field"
                placeholder="NASM-CPT, CSCS, Nutrition Coach"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleCloseModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingTrainer ? 'Update Trainer' : 'Add Trainer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Trainers;
