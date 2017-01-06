import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
	render() {
		return(
			<div className='center'>
				<img src='http://res.cloudinary.com/dk2bj79p0/image/upload/v1483660774/frontpage_u9y6hw.jpg' id='frontpage' alt='Welcome to Schedule Bee' />
				<br />
				<Link to='/signup' style={styles.button}>Sign Up</Link>
        <Link to='/signin' style={styles.button}>Sign In</Link>
			</div>
		);
	}
}

const styles = {
	button: {
		padding: '10px 25px',
		margin: '0 40px',
		borderRadius: '5px',
		border: '1px solid #666',
		background: "linear-gradient(#1c86ff, #1257a6)",
		boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
		fontSize: '25px',
		fontWeight: 'bold',
		lineHeight: '15px',
		color: '#fff',
		textShadow: '0 0 10px rgba(0,0,0,0.5), 0 1px #999'
	}
}

export default HomePage;
