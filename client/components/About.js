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
       <div>
       <h3 className="center">Team</h3>
       <h5>Cael Jensen</h5>
       <p>Something about Cael here</p>
       <h5>Josh Terry</h5>
       <p>Some stuff about Josh here</p>
       <h5>Marisa Jense</h5>
       <p></p>
       <h5>Ali Jepson</h5>
       <p>Stuff about Ali</p>
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
