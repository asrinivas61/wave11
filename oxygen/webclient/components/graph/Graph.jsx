
import React from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import AutoCompleteSearchBox from './AutoCompleteSearchBox';
import SelectPanel from './SelectPanel';
import DocResultCard from './DocResultCard';
import SelectedConcepts from './SelectedConcepts';
import {Container, Row, Col} from 'react-grid-system';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import Request from 'superagent';
const fonts={
  margin: "0px auto",
  textAlign: "center",
  fontFamily: "sans-serif",
  color: "#1976d2"
}
const styles={
 largeIcon: {

  width: 30,
  height: 30,
  backgroundColor: "grey",
  padding: 10,
  borderRadius: 60
},
large: {
  width: 120,
  height: 120,
  padding: 30,
},
place:{
  position:"fixed",
  top: "10%",
  right:"5%",
}
}
export default class Graph extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state={
      domainName:"",
      concepts:[],
      intents:[],
      docs:[],
      checkedIntent:[],
      selectedConcept:[]
    }
  }
  sendConcepts(concept)
  {
    let newConcepts=this.state.selectedConcept;
    if(!newConcepts.includes(concept)){
      newConcepts.push(concept)
    }
    
    this.setState({
      selectedConcept:newConcepts
    })
    console.log("selected concept")
    console.log(newConcepts)
  }

  getCheckedIntents(event,checked)
  {
    let prevIntents=this.state.checkedIntent
    if(checked){
      prevIntents.push(event.target.value);
    }
    else{
      prevIntents=prevIntents.filter(function(data) {
        if(data!==event.target.value)
          return data
      });
    }
    this.setState({
      checkedIntent:prevIntents
    })
    console.log("checked intents")
    console.log(prevIntents)
  }
  deleteConcepts(data){
    let delConcepts=this.state.selectedConcept;
    delConcepts=delConcepts.filter(function(concept){
      if(concept!==data)
        return concept
    })
    this.setState(
    {
      selectedConcept:delConcepts
    })
  }
  getIntentsAndConcepts()
  {
    let url =`/domain/`+this.props.params.domainName;
    let that=this;
    Request
    .get(url)
    .end((err, res) => {
     if(!err){       
       let domainDetails=JSON.parse(res.text);
       console.log("from the grph whole data")
       console.log(domainDetails)
       that.setState(
       {
        domainName:domainDetails.Domain,
        concepts:domainDetails.Concepts,
        intents:domainDetails.Intents
      })
     }
   });

  }
  componentDidMount()
  {
   this.getIntentsAndConcepts();

 }
 render()
 {
  return(
    <div style={fonts}>

    <Row>   
    <Col sm={2}>
    <SelectPanel intents={this.state.intents} getCheckedIntent={this.getCheckedIntents.bind(this)}/>
    </Col>
    <Col sm={10}>  
    <Row>
    <Col sm={12}>    
    <h1 style={{textAlign:"left",color:"#8aa6bd",fontSize:"35pt"}}>{this.state.domainName.toUpperCase()} </h1>
    <Link to="/dashboard">  
    <IconButton style={styles.place} iconStyle={styles.largeIcon}>
    <NavigationArrowBack style={styles.large} color={"white"} />
    </IconButton>  
    </Link>  
    </Col>
    </Row> 
    <Row>
    <Col sm={12}> 
    <AutoCompleteSearchBox concepts={this.state.concepts} 
    sendConcept={this.sendConcepts.bind(this)}/>
    </Col>
    </Row>
    <Row>
    <Col sm={12}> 
    {this.state.selectedConcept.length===0?<h4>SELECT THE CONCEPTS</h4>:
      <SelectedConcepts conceptChips={this.state.selectedConcept} deleteConcept={this.deleteConcepts.bind(this)} />}    
      </Col>
      </Row>
      <br/><br/>
      <Row>
      <Col sm={12}> 
      {this.state.docs.length===0?<h1>CLICK SEARCH TO SHOW THE DOCUMENTS</h1>:<DocResultCard />}    
      </Col>
      </Row>
      </Col>
      </Row>

      </div>
      );
}
}

