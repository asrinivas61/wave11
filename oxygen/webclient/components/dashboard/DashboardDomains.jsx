import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {Card, CardTitle, CardMedia, CardText} from 'material-ui/Card';
import {Container,Row, Col,Visible} from 'react-grid-system';
import {Link} from 'react-router';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {blue300,lime800,lightGreen500} from 'material-ui/styles/colors';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import Snackbar from 'material-ui/Snackbar';

const info={
	paddingLeft:0,
	paddingTop:3
}
const iconStyles={
	width:'28px',
	height:'28px',
	marginTop:5,
	marginLeft:3
}
const iconStyles1={
	width:'28px',
	height:'28px',
	marginTop: '5px',
	paddingLeft:0,
	float:'left'
}
const roundImg={
	borderRadius: '50%',
	minWidth:'0%',
	width:'47%',
	marginTop:'35px',
	height:'145px'
}
const styles = {
	cardLabel:{
		color:"white",
		fontWeight:600
	},
	chip: {
		marginTop: '10px',
		marginLeft: '5px',
		padding:0,
		marginBottom:'7px',
		marginRight:'2px'
	},
	cardRound:{
		borderRadius: '2%',
		marginBottom: '50px'
	},
	colorCode:{
		color:'grey',
		padding:0
	},
	padd:{
		paddingTop:'2px',
		paddingBottom:'8px'
	}
};
const xsChip = {
	cardLabel:{
		color:"white",
		fontWeight:600,
		fontSize:20
	},
	chip: {
		marginTop: '10px',
		marginLeft: '5px',
		padding:0,
		fontWeight:600,
		fontSize:20,
		marginBottom:'7px',
		marginRight:'2px'
	}
};

export default class DomainShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {canSubmit:false,conceptColor:'',intentColor:'',docsColor:'',open:false};
	}

	handleRefresh() {
		console.log('inside handle refresh');
		this.props.freshlyIndex(this.props.item.name);
	}
	handleTouchTap = () => {
		this.setState({
			open: true
		});
	};
	handleRequestClose = () => {
		this.setState({
			open: false
		});
	};

	componentWillMount() 
	{

		if(this.props.item.docs===0)
		{
			this.setState({docsColor:blue300});
		}
		else if(this.props.item.docs<11)
		{
			this.setState({docsColor:lime800});
		}
		else {
			this.setState({docsColor:lightGreen500});
		}

		if(this.props.item.intents.length===0)
		{
			this.setState({intentColor:blue300});
		}
		else if(this.props.item.intents.length<11)
		{
			this.setState({intentColor:lime800});
		}
		else {
			this.setState({intentColor:lightGreen500});
		}


		if(this.props.item.concepts.length<5)
		{
			this.setState({conceptColor:blue300});
		}
		else if(this.props.item.concepts<15)
		{
			this.setState({conceptColor:lime800});
		}
		else {
			this.setState({conceptColor:lightGreen500});
		}

	}

	render()
	{
		return(
			<div>
			<Snackbar
			open={this.state.open}
			message={this.props.item.description}
			autoHideDuration={6000}
			onRequestClose={this.handleRequestClose}
			/>
			<Card style={styles.cardRound}>
			<Link to={'/graph/'+this.props.item.name} style={{textDecoration:'none'}}>
			<CardMedia style={{height:'280px',borderRadius: '2%',
			width :'100%',backgroundColor:this.state.conceptColor}}
			overlay={<CardTitle title={this.props.item.name} subtitle="Domain" style={styles.padd}/>}>
			<img src={this.props.item.domainImgURL} style={roundImg}/>
			</CardMedia>
			</Link>
			<CardText style={styles.colorCode}>
			<Row style={{margin:"auto 0px"}}>
			<Col xs={2} sm={2} >
			<IconButton iconStyle={iconStyles} onTouchTap={this.handleTouchTap}>
			<ActionInfo />
			</IconButton>
			</Col>
			<Col xs={8} sm={8} >
			<h2 style={info}>Domain Information</h2>
			</Col>
			<Col xs={2} sm={2} >
			<IconButton iconStyle={iconStyles1} style={{paddingLeft:0}}
			onClick={this.handleRefresh.bind(this)}>
			<NavigationRefresh/>
			</IconButton>
			</Col>
			</Row>
			</CardText>
			<Link to={'/graph/'+this.props.item.name} style={{textDecoration:'none'}}>
			<Row style={{margin:"auto 0px"}}>
			<Visible sm md lg xl>
			<Row style={{paddingLeft:45}}>			
			<Col sm={6}>
			<Chip backgroundColor={"grey"} labelStyle={styles.cardLabel}
			style={styles.chip}>Concepts Available:</Chip>			
			</Col>
			<Col sm={3} style={{paddingLeft:58}}>
			<Chip backgroundColor={this.state.conceptColor}
			labelStyle={styles.cardLabel} style={styles.chip}>
			{this.props.item.concepts.length}
			</Chip>
			</Col>
			</Row>
			<Row style={{paddingLeft:45}}>
			<Col sm={6}>			
			<Chip backgroundColor={"grey"}
			labelStyle={styles.cardLabel}
			style={styles.chip}>Intents Available:</Chip>			
			</Col>
			<Col sm={3} style={{paddingLeft:58}}>
			<Chip backgroundColor={this.state.intentColor}
			labelStyle={styles.cardLabel} style={styles.chip}>
			{this.props.item.intents.length}
			</Chip>
			</Col>
			</Row>
			<Row style={{paddingLeft:45,paddingBottom:10}}>
			<Col sm={6}>			
			<Chip backgroundColor={"grey"}
			labelStyle={styles.cardLabel}
			style={styles.chip}>Documents Available:</Chip>			
			</Col>
			<Col sm={3}style={{paddingLeft:58}}>
			<Chip backgroundColor={this.state.docsColor}
			labelStyle={styles.cardLabel}
			style={styles.chip}>
			{this.props.item.docs}
			</Chip>
			</Col>					
			</Row>	
			</Visible>	
			<Visible xs>
			<Container>
			<Row style={{marginLeft:"-5px",padding:"0 15px 20px"}}>
			<Col xs={4} style={{paddingLeft:0}}>
			<Chip
			labelStyle={xsChip.cardLabel}
			style={xsChip.chip}
			backgroundColor={this.state.conceptColor}
			>
			<Avatar size={32} color="white" backgroundColor="grey">
			C
			</Avatar>			
			{this.props.item.concepts.length}
			</Chip>
			</Col>
			<Col xs={4} style={{paddingLeft:0}}>
			<Chip
			labelStyle={xsChip.cardLabel}
			style={xsChip.chip}
			backgroundColor={this.state.intentColor}
			>
			<Avatar size={32} color="white" backgroundColor="grey">
			I
			</Avatar>			
			{this.props.item.intents.length}
			</Chip>
			</Col>
			<Col xs={4} style={{paddingLeft:0}}>
			<Chip
			labelStyle={xsChip.cardLabel}
			style={xsChip.chip}
			backgroundColor={this.state.docsColor}
			>
			<Avatar size={32} color="white" backgroundColor="grey">
			D
			</Avatar>			
			{this.props.item.docs}
			</Chip>
			</Col>
			</Row>
			</Container>
			</Visible>	
			</Row>
			</Link>
			</Card>
			</div>
			);
	}
}
DomainShow.propTypes = {
	item: React.PropTypes.object,
	freshlyIndex:React.PropTypes.func
}
