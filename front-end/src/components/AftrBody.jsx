import React from 'react';
import './BfrBody.css';
import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/Donate', icon: 'fa-hand-holding-medical', title: 'Donate', text: 'Offer medicines, medical equipment or blood to someone who needs them.' },
  { to: '/Donations', icon: 'fa-magnifying-glass', title: 'Find Donations', text: 'Search what others have offered and contact the donor.' },
  { to: '/CommunityPage', icon: 'fa-people-group', title: 'Community', text: 'Share your experience and read posts from other members.' },
  { to: '/Articlespage', icon: 'fa-book-open', title: 'Articles', text: 'Learn how to donate safely and make your donation count.' },
];

const AftrBody= () => {

  return (
    <div>
    <section className="header">
        <div className="text-box">
            <h2 style={{ fontSize: '50px', marginLeft: '190px' }}>Building Bridges to Health</h2>
            <p style={{ fontSize: '30px', marginLeft: '150px' }}>Donate for a Brighter Future</p>
        </div>
    </section>

    <section className="course" style={{ paddingBottom: '80px' }}>
        <h1 style={{ fontSize: '40px' }}>What would you like to do?</h1>
        <div className="row" style={{ marginTop: '30px' }}>
            {quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className="course-col" style={{ flexBasis: '24%', textDecoration: 'none', color: '#1E293B' }}>
                    <i className={`fa-solid ${link.icon}`} style={{ fontSize: '40px', paddingTop: '15px' }}></i>
                    <p style={{ fontSize: '20px', marginTop: '30px' }}>{link.title}</p>
                    <p style={{ fontSize: '15px' }}>{link.text}</p>
                </Link>
            ))}
        </div>
    </section>
    </div>
  );
};

export default AftrBody;
