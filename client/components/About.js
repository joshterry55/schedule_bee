import React from 'react';
import { Link } from 'react-router';

class About extends React.Component {

  render() {
    return(
      <div className='row'>
        <div className='about-banner'>
          <div className='col s10 l8 offset-s1 offset-l2' style={styles.bannerText}>
          <p  className='flow-text' style={styles.about}><strong style={styles.name}>ScheduleBee</strong> was created due to the lack of easy-to-use scheduling apps.
            Having mangaged and scheduled employees in the past, Cael envisioned an easier way to
            create a schedule and keep track of employee hours.</p>
          <p><a style={styles.contact} href="mailto:schedulebee.utah@gmail.com?Subject=Hello%20Schedule%20Bee!" target="_top"><i style={{verticalAlign: 'top'}} className='material-icons'>email</i> Email Us!</a></p>
          </div>
        </div>
       <div className='col s10 l8 offset-s1 offset-l2' style={styles.teamMain} >
         <div className='col s10 offset-s1 team-photo-large hide-on-med-and-down center'>
           <h4 style={{paddingTop: '180px'}}>The Team</h4>
           <h5>Marisa | Cael | Ali | Josh</h5>
         </div>
         <div className='col s10 offset-s1 team-photo-med hide-on-small-only hide-on-large-only center'>
           <h4 style={{paddingTop: '120px'}}>The Team</h4>
           <h5>Marisa | Cael | Ali | Josh</h5>
         </div>
         <div className='col s10 offset-s1 team-photo-small hide-on-med-and-up center'>
           <h5 style={{paddingTop: '65px'}}>The Team</h5>
           <h6>Marisa | Cael | Ali | Josh</h6>
         </div>
         <div className='col s8 offset-s2'>
           <br />
           <br />
           <hr />
           <br />
         </div>
         <div className="col s12" style={{marginTop: '20px'}}>
           <span style={styles.pic} className="col s12 m5 offset-m1 cael-pic z-depth-4"></span>
           <div className='col s12 m6' style={{paddingLeft: '35px'}}>
             <h5 style={styles.team}>Cael Jensen</h5>
             <p style={styles.bio}>Cael is an entrepreneurial-minded web developer who has been tinkering
                with computers all his life. Creativity and design are his driving passions,
              and he's always looking for ways to expand his knowledge and experience.</p>
            <Link style ={styles.button} to='https://www.linkedin.com/in/cael-jensen-58b1b6134' target='_blank'><img className="li-pic"/></Link>
            <Link style ={styles.button} to='https://github.com/crjmosh' target='_blank'><img className="github-pic"/></Link>
          </div>
         </div>

         <div className="col s12" style={{marginTop: '20px'}}>
           <span style={styles.pic} className="col s12 m5 offset-m1 josh-pic z-depth-4"></span>
           <div className='col s12 m6' style={{paddingLeft: '35px'}}>
             <h5 style={styles.team}>Josh Terry</h5>
             <p style={styles.bio}>Josh stuff here. Need more info! Waiting for more info Josh. You can do it! Blah blah Blah
                Blah blah blah blah blaaaaaa.</p>
              <Link style ={styles.button} to='https://www.linkedin.com/in/josh-terry-12b55311b' target='_blank'><img className="li-pic"/></Link>
              <Link style ={styles.button} to='https://github.com/joshterry55' target='_blank'><img className="github-pic"/></Link>
            </div>
         </div>

         <div className="col s12" style={{marginTop: '20px'}}>
           <span style={styles.pic} className="col s12 m5 offset-m1 ali-pic z-depth-4"></span>
           <div className='col s12 m6' style={{paddingLeft: '35px'}}>
             <h5 style={styles.team}>Ali Jepsen</h5>
             <p style={styles.bio}>Ali has been working in the software industry for almost 20 years primarily in product management and QA testing.</p>
             <Link style ={styles.button} to='https://www.linkedin.com/in/ali-jepsen-879639' target='_blank'><img className="li-pic"/></Link>
             <Link style ={styles.button} to='https://github.com/alijepsen' target='_blank'><img className="github-pic"/></Link>
           </div>
         </div>

         <div className="col s12" style={{marginTop: '20px'}}>
           <span style={styles.pic} className="col s12 m5 offset-m1 marisa-pic z-depth-4"></span>
           <div className='col s12 m6' style={{paddingLeft: '35px'}}>
             <h5 style={styles.team}>Marisa Jense</h5>
             <p style={styles.bio}>Marisa's background is in behavioral science, but
                her passion for creativity and desire to learn carried her into the tech world.
                She is excited for her future in web development as it has proven to be ever
                challenging and extremely rewarding.</p>
              <Link style ={styles.button} to='https://www.linkedin.com/in/marisa-jense-332930aa' target='_blank'><img className="li-pic"/></Link>
              <Link style ={styles.button} to='https://github.com/marisajense' target='_blank'><img className="github-pic"/></Link>
            </div>
         </div>


         <div style={styles.lang} className='col 12'>
           <h3 className="center">Languages & Tools</h3>
           <div className='col s8 offset-s2'>
             <hr />
             <br />
           </div>
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
      </div>
    )
  }
}

const styles = {
  team: {
    color: '#1565C0',
  },
  teamMain: {
    backgroundColor: 'white',
  },
  about: {
    textShadow: '0 0 10px rgba(0,0,0,0.5)',
    fontWeight: '300',
    color: 'white',
  },
  pic: {
    borderRadius: '50%',
    width: '215px',
    height: '215px',
    display: 'inline-block',
    backgroundSize: 'cover',
    marginTop: '10px',
  },
  bio: {
    fontSize: '16px',
    textAlign: 'left',
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
  },
  contact: {
    color: '#FDCC0B',
    fontSize: '20px',
    textShadow: '0 0 10px rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: '15px',
    right: '25px',
  },
  name: {
    color: '#FDCC0B',
  },
  bannerText: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    boxShadow: '0 0 20px rgba(0,0,0,.75)',
    height: '100%',
    padding: '0 25px',
    position: 'relative',
  }
}



export default About;




// ===============================================================
// componentDidMount() {
//   $('.slider').slider({full_width: true, indicators: false, interval: 10000, height: 520});
// }
//
// nextSlide() {
//   $('.slider').slider('next');
//   $('.slider').slider('pause');
//   let $startSlide = $('.slider').slider('start');
//   setTimout($startSlide, 10000);
// }
//
// render() {
//   return(
//     <div className="row">
//       <div className="col s12" style={{height: '600px', padding:'30px 0', marginTop: '0px'}}>
//         <div className="col s12 m10 offset-m1">
//           <div className="slider" style={{boxShadow: '0 0 25px rgba(0,0,0,0.60)'}}>
//             <ul className="slides" onClick={this.nextSlide}>
//               <li>
//                 <img src="http://res.cloudinary.com/ddwmfjfo3/image/upload/c_scale,w_1000/v1483900087/foko4dpxamq-eric-rothermel_ps3e45.jpg" />
//                 <div className="caption left-align">
//                   <h4 style={{marginBottom:'-15px', ...styles.textGlow}}></h4>
//                   <h3  style={styles.textGlowMain} className="light blue-text text-darken-4">Schedule Bee</h3>
//                   <h5  style={styles.textGlowMain} className="light blue-text text-darken-4 beep">was created due to the lack of easy-to-use scheduling apps.<br />
//                     Having mangaged and scheduled employees in the past, Cael envisioned an easier way to
//                     create a schedule and keep track of employee hours.</h5>
//                 </div>
//               </li>
//               <li>
//                 <img src="http://res.cloudinary.com/ddwmfjfo3/image/upload/c_scale,w_2000/v1483906510/group2_zuju2c.jpg" />
//                 <div className="caption center-align">
//                   <h3 style={styles.textGlowTeam} className="light grey-text text-lighten-3">The Team</h3>
//                   <h5 style={styles.textGlow} className="light grey-text text-lighten-3">Marisa | Cael | Ali | Josh</h5>
//                 </div>
//               </li>
//               <li>
//                 <img src="http://res.cloudinary.com/ddwmfjfo3/image/upload/c_scale,w_2000/v1483904783/lang5_ay557s.png" />
//                 <div className="caption left-align">
//                   <h3 style={styles.textGlow}>Languages & Tools</h3>
//                 </div>
//               </li>
//               <li>
//                 <img src="http://res.cloudinary.com/dupyswzaa7/image/upload/v1483759970/slideSimple_aurae2.jpg" />
//                 <div className="caption center-align">
//                   <h3 style={styles.textGlow}>Simple Interface</h3>
//                   <h5 style={styles.textGlow} className="light grey-text text-lighten-3">Stay organized.</h5>
//                 </div>
//               </li>
//             </ul>
//           </div>
//          </div>
//       </div>
//       <div style={styles.footerText} className="hide-on-small-only">Copyright &copy; 2017 - ScheduleBee</div>
//     </div>
//   )
// }
// }
//
// const styles = {
// button: {
//   padding: '10px 25px',
//   borderRadius: '5px',
//   border: '1px solid #333',
//   background: "linear-gradient(#1c86ff, #1257a6)",
//   boxShadow: "inset 0 1px 0px  #fff, 0 0 15px rgba(0,0,0,0.60)",
//   fontSize: '20px',
//   fontWeight: 'bold',
//   lineHeight: '15px',
//   color: '#fff',
//   textShadow: '0 0 15px rgba(0,0,0,0.5), 0 1px #999',
//   whiteSpace: 'nowrap'
// },
// homePage: {
//   backgroundColor: '#fff',
//   paddingBottom: '45px',
//   marginTop: '30px',
//   borderRadius: '15px',
//   boxShadow: '5px 5px 5px rgba(0,0,0,0.5)'
// },
// textGlow: {
//   textShadow: '0 0 10px rgba(0,0,0,0.95)'
// },
// textGlowMain: {
//   textShadow: '2px 2px #fff'
// },
// textGlowTeam: {
//   textShadow: '0 0 10px rgba(0,0,0,0.95)',
//   paddingTop: '110px',
// },
// footerText: {
//   position: 'fixed',
//   bottom: '10px',
//   width: '100%',
//   fontSize: '18px',
//   fontWeight: 'bold',
//   textAlign: 'center',
//   color: '#fff',
//   textShadow: '0 0 10px rgba(0,0,0,0.5)'
// },
//
// }



// Parallax ============================================================

// componentDidMount() {
//   $('.parallax').parallax();
// }
//
//
// render() {
//   return(
//     <div className="container col s12" style={{height: '600px', width: '1200px', padding:'30px 0', marginTop: '0px'}}>
//       <div className="parallax-container" >
//         <div className="parallax"><img src="http://res.cloudinary.com/ddwmfjfo3/image/upload/v1483907098/main_kaxntg.png" /></div>
//       </div>
//       <div>
//         <div className="row container">
//           <h3 className="header">&nbsp; Scheduling Made Easy</h3>
//           <p className="grey-text text-darken-3 lighten-3"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;We took on this challenge because we all believed that .</p>
//         </div>
//       </div>
//       <div className="parallax-container">
//         <div className="parallax"><img src="http://res.cloudinary.com/ddwmfjfo3/image/upload/v1483907065/team_g1kz8k.png" /></div>
//       </div>
//     </div>
//   )
// }
// }
