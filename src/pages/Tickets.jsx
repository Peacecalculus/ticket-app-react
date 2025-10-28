import React, { useState, useEffect } from 'react';
import { 
  getTickets, 
  createTicket, 
  updateTicket, 
  deleteTicket, 
  validateTicket 
} from '../utils/helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [currentTicket, setCurrentTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  
  useEffect(() => {
    loadTickets();
  }, []);
  
  const loadTickets = () => {
    const allTickets = getTickets();
    setTickets(allTickets);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleCreateNew = () => {
    setFormData({ title: '', description: '', status: 'open', priority: 'medium' });
    setCurrentTicket(null);
    setErrors({});
    setView('create');
  };
  
  const handleEdit = (ticket) => {
    setCurrentTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description || '',
      status: ticket.status,
      priority: ticket.priority || 'medium'
    });
    setErrors({});
    setView('edit');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateTicket(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    let result;
    if (view === 'create') {
      result = createTicket(formData);
      setToast({ message: 'Ticket created successfully!', type: 'success' });
    } else {
      result = updateTicket(currentTicket.id, formData);
      setToast({ message: 'Ticket updated successfully!', type: 'success' });
    }
    
    if (result.success) {
      loadTickets();
      setView('list');
      setFormData({ title: '', description: '', status: 'open', priority: 'medium' });
    }
  };
  
  const handleDelete = (ticket) => {
    setDeleteModal(ticket);
  };
  
  const confirmDelete = () => {
    if (deleteModal) {
      const result = deleteTicket(deleteModal.id);
      if (result.success) {
        setToast({ message: 'Ticket deleted successfully!', type: 'success' });
        loadTickets();
      }
      setDeleteModal(null);
    }
  };
  
  const cancelDelete = () => {
    setDeleteModal(null);
  };
  
  const getStatusLabel = (status) => {
    const labels = {
      open: 'Open',
      in_progress: 'In Progress',
      closed: 'Closed'
    };
    return labels[status] || status;
  };
  
  return (
    <div className="app-container">
      <Header isAuth={true} />
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {deleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteModal.title}"?</p>
            <div className="modal-actions">
              <button onClick={cancelDelete} className="btn btn-secondary">Cancel</button>
              <button onClick={confirmDelete} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
      
      <main className="tickets-content">
        <h1>Ticket Management</h1>
        
        {/* LIST VIEW */}
        <div className={`view-section ${view === 'list' ? 'active' : ''}`}>
          <div className="list-header">
            <h2>All Tickets</h2>
            <button onClick={handleCreateNew} className="btn btn-primary">
              <i className="fa-solid fa-plus"></i> Create New Ticket
            </button>
          </div>
          
          {tickets.length === 0 ? (
            <div className="empty-state">
              <p>No tickets found. Create your first ticket to get started!</p>
            </div>
          ) : (
            <div className="tickets-grid">
              {tickets.map(ticket => (
                <div key={ticket.id} className={`ticket-card status-${ticket.status}`}>
                  <span className="ticket-status-tag">{getStatusLabel(ticket.status)}</span>
                  <h3 className="ticket-title">{ticket.title}</h3>
                  <p className="ticket-description">
                    {ticket.description || 'No description provided'}
                  </p>
                  <div className="ticket-meta">
                    <div>Priority: {ticket.priority || 'medium'}</div>
                    <div>Created: {new Date(ticket.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(ticket)} className="btn btn-edit">
                      <i className="fa-solid fa-pen"></i> Edit
                    </button>
                    <button onClick={() => handleDelete(ticket)} className="btn btn-delete">
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* CREATE/EDIT VIEW */}
        <div className={`view-section ${view !== 'list' ? 'active' : ''}`}>
          <div className="list-header">
            <h2>{view === 'create' ? 'Create New Ticket' : 'Edit Ticket'}</h2>
            <button onClick={() => setView('list')} className="btn btn-secondary-outline">
              <i className="fa-solid fa-arrow-left"></i> Back to List
            </button>
          </div>
          
          <div className="card-box" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter ticket title"
                />
                {errors.title && <div className="error-message">{errors.title}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter ticket description (optional)"
                />
                {errors.description && <div className="error-message">{errors.description}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.status && <div className="error-message">{errors.status}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {view === 'create' ? 'Create Ticket' : 'Update Ticket'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setView('list')} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="decorative-circle bottom-left"></div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tickets;
