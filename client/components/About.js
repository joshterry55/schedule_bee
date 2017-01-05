import React from 'react';
import { Link } from 'react-router';

class About extends React.Component {

  render() {
    return(
      <div className='container about-whole'>
        <div className='main-about z-depth-4'>
        <h3 style={styles.aboutSched}>About ScheduleBee</h3>
        <hr />
        <p style={styles.about}><strong style={styles.name}>ScheduleBee</strong> was created due to the lack of easy-to-use scheduling apps on the market currently.
          Cael Jensen thought of the idea, having mangaged and scheduled employees in the past. Cael wanted an easier way to
         create a schedule as well as to keep track of employee hours to ensure his employees were getting enough hours and not working overtime.</p>
       </div>
       <div className="center row" style={styles.teamMain} >
         <h3>The Team</h3>
         <br />
         <div className="col s12 m6 individual">
           <div className="col s6">
           <span style={styles.pic} className="cael-pic z-depth-5"></span>
           </div>
           <div className="col s6">
           <h5 style={styles.team}>Cael Jensen</h5>
           <p style={styles.bio}>Cael is an entrepreneurial-minded web developer who has been tinkering
              with computers all his life. Creativity and design are his driving passions,
            and he's always looking for ways to expand his knowledge and experience.</p>
        </div>
          <Link style ={styles.button} to='https://www.linkedin.com/in/cael-jensen-58b1b6134' target='_blank'><img className="li-pic"/></Link>
          <Link style ={styles.button} to='https://github.com/crjmosh' target='_blank'><img className="github-pic"/></Link>
         </div>

         <div className="col s12 m6 individual">
           <div className="col s6">
           <span style={styles.pic} className="josh-pic z-depth-5"></span>
           </div>
           <div className="col s6">
           <h5 style={styles.team}>Josh Terry</h5>
           <p style={styles.bio}>Josh stuff here. Need more info! Waiting for more info Josh. You can do it! Blah blah Blah
              Blah blah blah blah blaaaaaa.</p>
          </div>
            <Link style ={styles.button} to='https://www.linkedin.com/in/josh-terry-12b55311b' target='_blank'><img className="li-pic"/></Link>
            <Link style ={styles.button} to='https://github.com/joshterry55' target='_blank'><img className="github-pic"/></Link>
         </div>

         <div className="col s12 m6 individual">
           <div className="col s6">
           <span style={styles.pic} className="ali-pic z-depth-5"></span>
           </div>
           <div className="col s6">
           <h5 style={styles.team}>Ali Jepsen</h5>
           <p style={styles.bio}>Ali has been working in the software industry for almost 20 years primarily in product management and QA testing.</p>
           </div>
           <Link style ={styles.button} to='https://www.linkedin.com/in/ali-jepsen-879639' target='_blank'><img className="li-pic"/></Link>
           <Link style ={styles.button} to='https://github.com/alijepsen' target='_blank'><img className="github-pic"/></Link>
         </div>

         <div className="col s12 m6 individual">
           <div className="col s6">
           <span style={styles.pic} className="marisa-pic z-depth-5"></span>
           </div>
           <div className="col s6">
           <h5 style={styles.team}>Marisa Jense</h5>
           <p style={styles.bio}>Marisa's background is in behavioral science, but
              her passion for creativity and desire to learn carried her into the tech world.
              She is excited for her future in web development as it has proven to be ever
              challenging and extremely rewarding.</p>
          </div>
            <Link style ={styles.button} to='https://www.linkedin.com/in/marisa-jense-332930aa' target='_blank'><img className="li-pic"/></Link>
            <Link style ={styles.button} to='https://github.com/marisajense' target='_blank'><img className="github-pic"/></Link>
         </div>
       </div>

       <div style={styles.lang}>
         <h3 className="center">Languages & Tools</h3>
         <hr />
         <div className="center row">
           <div className='col s12 m4'>
             <h5>Ruby on Rails</h5>
             <span className="rails-pic"></span>
           </div>
           <div className='col s12 m4'>
           <h5>React</h5>
           <span className="react-pic"></span>
           </div>
           <div className='col s12 m4'>
             <h5>Redux</h5>
           <span className="redux-pic"></span>
           </div>
           <div className='col s12 m4'>
           <span className="html-pic"></span>
           </div>
           <div className='col s12 m4'>
             <span className="css3-pic"></span>
           </div>
           <div className='col s12 m4'>
           <span className="jquery-pic"></span>
           </div>
           <div className='col s12 m4'>
             <h5>Materialize</h5>
           <span className="material-pic"></span>
           </div>
           <div className='col s12 m4'>
           <span className="devise-pic"></span>
           </div>
           <div className='col s12 m4'>
           <span className="ajax-pic"></span>
           </div>
         </div>
       </div>
      </div>
    )
  }
}

const styles = {
  team: {
    color: '#1565C0',
    textShadow: '0 1px #ddd',
  },
  teamMain: {
    marginTop: '50px',
  },
  about: {
    fontSize: '18px',
    textShadow: '0 0 15px rgba(0,0,0,0.5)',
    fontWeight: '300',
  },
  name: {
    fontSize: '20px',
    color: '#FDCC0B',
  },
  pic: {
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    display: 'block',
    border: '2px solid #1565C0',
    backgroundSize: 'cover',
  },
  bio: {
    fontSize: '16px',
    textAlign: 'left',
  },
  li: {
    height: '30px',
  },
  button: {
    float: 'right',
  },
  aboutSched: {
    textShadow: '0 0 15px rgba(0,0,0,0.5)',
    color: 'white',
  },
  lang: {
    marginTop: '75px',
  }
}

export default About;

// boxShadow: '10px 10px 5px #eee',
// margin: '10px',
// marginTop: '20px'
// '#FDCC0B' yellow
//
// bio
//     textAlign: 'left',
