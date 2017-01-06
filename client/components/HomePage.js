import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
	render() {
		return(
			<div className='container'>
				<div style={styles.homePage} className='center row'>
					<div className='col s12'>
						<img src='http://res.cloudinary.com/dk2bj79p0/image/upload/v1483660774/frontpage_u9y6hw.jpg' id='frontpage' alt='Welcome to Schedule Bee' />
					</div>
					<br />
					<div className='col m8 s12 offset-m2 l6 offset-l3'>
						<div className="col s6">
							<Link to='/signup' style={styles.button}>Sign Up</Link>
						</div>
						<div className="col s6">
							<Link to='/signin' style={styles.button}>Sign In</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	button: {
		padding: '10px 25px',
		borderRadius: '5px',
		border: '1px solid #666',
		background: "linear-gradient(#1c86ff, #1257a6)",
		boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
		fontSize: '25px',
		fontWeight: 'bold',
		lineHeight: '15px',
		color: '#fff',
		textShadow: '0 0 10px rgba(0,0,0,0.5), 0 1px #999'
	},
	homePage: {
		backgroundColor: '#fff',
		paddingBottom: '45px',
		marginTop: '30px',
		borderRadius: '15px',
		boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',

	}

}

export default HomePage;
