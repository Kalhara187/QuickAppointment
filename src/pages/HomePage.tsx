import React from 'react'

export const HomePage: React.FC = () => {
  return (
    <div className="page home-page">
      <h2>Welcome to QuickAppointment</h2>
      <p>Your appointment scheduling solution</p>
      <div className="home-content">
        <section>
          <h3>Get Started</h3>
          <p>Create and manage your appointments with ease.</p>
        </section>
      </div>
    </div>
  )
}

export default HomePage
