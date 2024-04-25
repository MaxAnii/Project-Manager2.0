import React from 'react'
import './home.css'
import Title from './Title';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
const Home=()=>  {
const navigate = useNavigate();
localStorage.removeItem('Acces')
localStorage.removeItem('JToken')
  return (
    <>
 <Title></Title>
   <div className="hero-section">
   <div>

        <h1 >Welcome to the Project Management System</h1>
        <p>Efficiently manage and review student projects</p>
        <p>Streamline collaboration between students and professors</p>
       <button  className="cta-button" onClick={()=> navigate('/loginSignup')}>Get Started</button>
   </div>
   <div>
 
   </div>
      </div>

      <div className='container'>
      <div className="container-content">

  
        <h2>About Us</h2>
        <p>The Project Management System is a web application designed to facilitate the management and review process of student projects in engineering colleges. Our system aims to provide a seamless experience for both students and professors, enabling them to efficiently collaborate and ensure project success.</p>

        <h2>Features</h2>
        <ul>
          <li>Easy project submission by students</li>
          <li>Efficient project review and feedback process by professors</li>
          <li>Real-time project status updates</li>
          <li>Secure user authentication and data protection</li>
          <li>Intuitive interface for seamless navigation</li>
        </ul>

        <h2>How It Works</h2>
        <ol>
          <li>Students sign up for an account and submit their project details.</li>
          <li>Professors review the project ideas and provide feedback.</li>
          <li>Students make necessary revisions based on the feedback received.</li>
          <li>Professors accept or reject the project idea based on its viability.</li>
          <li>Accepted projects proceed to the next phase for development and implementation.</li>
        </ol>

        </div>
      </div>
   <Footer></Footer>
    </>
  );
}


export default Home;