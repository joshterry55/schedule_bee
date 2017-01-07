import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
	
	componentDidMount() {
		$('.slider').slider({full_width: true, indicators: false, interval: 4000, height: 380});
	}

	nextSlide() {
		$('.slider').slider('next');
		$('.slider').slider('pause');
		let $startSlide = $('.slider').slider('start');
		setTimout($startSlide, 2000);
	}

	render() {
		return(
			<div className="row">
				<div className="col s12" style={{height: '500px', padding:'30px 0', backgroundColor: 'rgba(0,0,0,0.65)', marginTop: '0px'}}>
					<div className="col s12 m10 offset-m1">
						<div className="slider" style={{boxShadow: '0 0 25px rgba(0,0,0,0.60)'}}>
					    <ul className="slides" onClick={this.nextSlide}>
					      <li>
					        <img src="http://res.cloudinary.com/dupyswzaa7/image/upload/v1483756265/slideDesk_kjplds.jpg" />
					        <div className="caption left-align">
					          <h4 style={{marginBottom:'-15px', ...styles.textGlow}}>Welcome to</h4>
					          <h3 style={styles.textGlow}>ScheduleBee</h3>
					          <h5 style={styles.textGlow} className="light grey-text text-lighten-3">Scheduling made easy.</h5>
					        </div>
					      </li>
					      <li>
					        <img src="http://res.cloudinary.com/dupyswzaa7/image/upload/v1483759893/slideWoman_cd4ebz.jpg" />
					        <div className="caption right-align">
					          <h3 style={styles.textGlow}>Easy To Use</h3>
					          <h5 style={styles.textGlow} className="light grey-text text-lighten-3">Avoid the headaches.</h5>
					        </div>
					      </li>
					      <li>
					        <img src="http://res.cloudinary.com/dupyswzaa7/image/upload/v1483759938/slideLightning_cbvt3b.jpg" />
					        <div className="caption left-align">
					          <h3 style={styles.textGlow}>Lightning Fast</h3>
					          <h5 style={styles.textGlow} className="light grey-text text-lighten-3">Save time and money.</h5>
					        </div>
					      </li>
					      <li>
					        <img src="http://res.cloudinary.com/dupyswzaa7/image/upload/v1483759970/slideSimple_aurae2.jpg" />
					        <div className="caption center-align">
					          <h3 style={styles.textGlow}>Simple Interface</h3>
					          <h5 style={styles.textGlow} className="light grey-text text-lighten-3">Stay organized.</h5>
					        </div>
					      </li>
					    </ul>
					  </div>
					  <div className='col s12 m10 offset-m1 l6 offset-l3' style={{padding:'35px 0px 0px 0px'}}>
	 						<div className="col s6 center" style={{padding: '0px'}}>
	 							<Link to='/signup' style={styles.button}>Sign Up</Link>
	 						</div>
	 						<div className="col s6 center" style={{padding: '0px'}}>
	 							<Link to='/signin' style={styles.button}>Sign In</Link>
	 						</div>
	 					</div>
					 </div>
				</div>
				<div style={styles.footerText} className="hide-on-small-only">Copyright &copy; 2017 - ScheduleBee</div>
			</div>
		);
	}
}

// render() {
// 		return(
// 			<div className='container'>
// 				<div style={styles.homePage} className='center row'>
// 					<div className='col s12'>
// 						<img src='http://res.cloudinary.com/dk2bj79p0/image/upload/v1483660774/frontpage_u9y6hw.jpg' id='frontpage' alt='Welcome to Schedule Bee' />
// 					</div>
// 					<br />
// 					<div className='col m8 s12 offset-m2 l6 offset-l3'>
// 						<div className="col s6">
// 							<Link to='/signup' style={styles.button}>Sign Up</Link>
// 						</div>
// 						<div className="col s6">
// 							<Link to='/signin' style={styles.button}>Sign In</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}


const styles = {
	button: {
		padding: '10px 25px',
		borderRadius: '5px',
		border: '1px solid #333',
		background: "linear-gradient(#1c86ff, #1257a6)",
		boxShadow: "inset 0 1px 0px  #fff, 0 0 15px rgba(0,0,0,0.60)",
		fontSize: '20px',
		fontWeight: 'bold',
		lineHeight: '15px',
		color: '#fff',
		textShadow: '0 0 15px rgba(0,0,0,0.5), 0 1px #999',
		whiteSpace: 'nowrap'
	},
	homePage: {
		backgroundColor: '#fff',
		paddingBottom: '45px',
		marginTop: '30px',
		borderRadius: '15px',
		boxShadow: '5px 5px 5px rgba(0,0,0,0.5)'
	},
	textGlow: {
		textShadow: '0 0 10px rgba(0,0,0,0.9)'
	},
	footerText: {
		position: 'fixed',
		bottom: '10px',
		width: '100%',
		fontSize: '18px',
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fff',
		textShadow: '0 0 10px rgba(0,0,0,0.5)'
	}

}

export default HomePage;
