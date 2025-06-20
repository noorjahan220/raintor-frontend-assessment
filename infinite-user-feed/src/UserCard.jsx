import React from 'react';
import './index.css';

const UserCard = ({ user }) => {
  return (
    <div 
      className="user-card" 
      tabIndex={0} 
      aria-label={`User card for ${user.firstName} ${user.lastName}`}
    >
      <div className="user-card__image-container">
        <img 
          src={user.image} 
          alt={`${user.firstName}'s avatar`} 
          className="user-card__image"
          loading="lazy"
        />
        <div className="user-card__image-overlay"></div>
      </div>
      
      <div className="user-card__content">
        <div className="user-card__header">
          <h3 className="user-card__name">
            {user.firstName} {user.lastName}
          </h3>
          <div className="user-card__status-indicator"></div>
        </div>
        
        <div className="user-card__details">
          <div className="user-card__detail">
            <span className="user-card__icon">📧</span>
            <span className="user-card__label">Email</span> 
            <span className="user-card__value">{user.email}</span>
          </div>
          
          <div className="user-card__detail">
            <span className="user-card__icon">📱</span>
            <span className="user-card__label">Phone</span> 
            <span className="user-card__value">{user.phone}</span>
          </div>
          
          {user.company?.title && (
            <div className="user-card__detail">
              <span className="user-card__icon">🏢</span>
              <span className="user-card__label">Company</span> 
              <span className="user-card__value">{user.company.title}</span>
            </div>
          )}
          
          {user.university && (
            <div className="user-card__detail">
              <span className="user-card__icon">🎓</span>
              <span className="user-card__label">University</span> 
              <span className="user-card__value">{user.university}</span>
            </div>
          )}
        </div>
        
        <div className="user-card__actions">
          <button className="user-card__action-btn user-card__action-btn--primary">
            View Profile
          </button>
          <button className="user-card__action-btn user-card__action-btn--secondary">
            Contact
          </button>
        </div>
      </div>
      
      <div className="user-card__gradient-border"></div>
    </div>
  );
};

export default UserCard;