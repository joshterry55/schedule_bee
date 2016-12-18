import React, { Component} from 'react';
import { connect } from 'react-redux';
// this is just a simulation of employees in the state
let employee = [1,2,3,4,5]

class DayColumn extends Component {


	myDate() {

		let dayOffset = this.props.setdate - this.props.day;
		let fullDate = new Date(Date.now()-((dayOffset * 24)*60*60*1000));
		let dateLength = fullDate.toDateString();
		let myDay = fullDate.toDateString().substr(0, dateLength.length - 5)
		// let myDay = (fullDate.getMonth() + 1) + "/" + fullDate.getDate() + "/" + fullDate.getFullYear()

		// THIS IS JUST STARTER CODE FOR HIGHLIGHTING CURRENT DAY
		// if(dayOffset === 0) {
		// 	debugger
		// 	$('#boxstyle').css('backgroundColor', 'red')
		// } else {
		// 	debugger
		// 	$('#boxstyle').css('backgroundColor', 'lightblue')
		// }
		return myDay
	}

	addEmployeeRow() {
		// THIS IS JUST SIMULATION SHOWING THAT WE CAN DYNAMICALLY ADD A ROW UNDER EVERY COLUMN
		// FOR WHATEVER THE EMPLOYEE STATE IS SET TOO. WE NEED TO FIGURE OUT ADDING EMPLOYEES
		if(employee != 0) {
      return employee.map( e => {
        return(<div id='boxstyle' style={styles.dateBox}>{e}</div>)
			})
		}
	}


	render() {
		let myDay = this.myDate();
		return (
			<div>
				<div style={styles.dateFloat}>
				<div id='boxstyle' style={styles.dateBox}>{myDay}</div>
				{this.addEmployeeRow()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { setdate: state.setdate }
}

const styles = {
	dateBox: {
		width: "250px",
		height: "40px",
		textAlign: 'center',
		fontSize: '20px',
		lineHeight: "38px",
		border: "1px solid blue",
		backgroundColor: 'lightblue',
	},
	dateFloat: {
		float: 'left'
	}
}


export default connect(mapStateToProps)(DayColumn);
