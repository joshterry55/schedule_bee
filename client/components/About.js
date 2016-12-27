import React from 'react';

class About extends React.Component {

  render() {
    return(
      <div className='container'>
        <div>
        <h3>About ScheduleBee</h3>
        <p><strong>ScheduleBee</strong> was created due to the lack of easy-to-use scheduling apps on the market currently.
          Cael Jensen thought of the idea, having mangaged and scheduled employees in the past. Cael wanted an easier way to
         create a schedule as well as to keep track of employee hours to ensure his employees were getting enough hours and not working overtime.</p>
       <hr/>
       </div>
       <div className="center row">
         <h3>The Team</h3>
         <div className="col s12 m6">
         <h5><strong>Cael Jensen</strong></h5>
         <span className="cael-pic"></span>
         <p>Something about Cael here</p>
         </div>
         <div className="col s12 m6">
         <h5><strong>Josh Terry</strong></h5>
         <span className="josh-pic"></span>
         <p>Some stuff about Josh here</p>
         </div>
         <div className="col s12 m6">
         <h5><strong>Marisa Jense</strong></h5>
         <span className="marisa-pic"></span>
         <p>Marisa graduated with a BS in Behavioral Science from Utah Valley University in 2014. </p>
         </div>
         <div className="col s12 m6">
         <h5><strong>Ali Jepson</strong></h5>
         <span className="ali-pic"></span>
         <p>Stuff about Ali</p>
         </div>
       </div>
       <div>
         <h3>Languages & Tools</h3>
         <hr/>
       </div>
      </div>
    )
  }
}

export default About;
