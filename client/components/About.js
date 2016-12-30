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
       <div className="center row about-page">
         <h3 id='team'>The Team</h3>
         <div className="col s12 m6">
           <h5>Cael Jensen</h5>
           <span className="cael-pic"></span>
           <p>Cael is an entrepreneurial-minded web developer who has been tinkering
              with computers all his life. Creativity and design are his driving passions,
              and he's always looking for ways to expand his knowledge and experience.</p>
         </div>
         <div className="col s12 m6">
           <h5>Josh Terry</h5>
           <span className="josh-pic"></span>
           <p>Josh testing testingtestingtestingtestingtestingtesting, testingtestingtestingtestingtestingtestingtesting.
              testingtestingtestingtesting testingtestingtestingtesting testingtestingtestingtesting testingtestingtestingtesting.
              testingtest.</p>
         </div>
         <div className="col s12 m6">
           <h5>Ali Jepson</h5>
           <span className="ali-pic"></span>
           <p>testingtestingtestingtesting. testingtestingtestingtesting. testingtestingtestingtesting. testingtestingtesting.
              testingtestingtestingtestingtesting. testingtestingtestingtesting. testingtestingtesting. testing testing
              testingtestingtestingtestingtestingtestingtestingtestingtesting.</p>
         </div>
         <div className="col s12 m6">
           <h5>Marisa Jense</h5>
           <span className="marisa-pic"></span>
           <p>Marisa's background is in behavioral science, but
              her passion for creativity and desire to learn carried her into the tech world.
              She is excited for her future in web development as it has proven to be ever challenging and extremely rewarding.</p>
         </div>
       </div>
       <div>
         <h3>Languages & Tools</h3>
         <hr/>
         <div className="center row">
           <div className='col s12 m4'>
           <h5>React</h5>
           <span className="react-pic"></span>
           </div>
           <div className='col s12 m4'>
           <h5>Ruby on Rails</h5>
           <span className="rails-pic"></span>
           </div>
         </div>
       </div>
      </div>
    )
  }
}

export default About;
