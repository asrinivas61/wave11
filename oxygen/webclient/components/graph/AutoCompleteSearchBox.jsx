
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

const style = {
  height: 80,
  width: 750,
  marginLeft:"auto",
  marginRight:"auto",
  marginTop: 5,
  align:"center",
  textAlign: 'center',
};

const fruit = [
'Apple', 'Apricot', 'Avocado',
'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
'Boysenberry', 'Blood Orange',
'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
'Coconut', 'Cranberry', 'Clementine',
'Damson', 'Date', 'Dragonfruit', 'Durian',
'Elderberry',
'Feijoa', 'Fig',
'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
'Honeydew', 'Huckleberry',
'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
'Kiwi fruit', 'Kumquat',
'Lemon', 'Lime', 'Loquat', 'Lychee',
'Nectarine',
'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
'Olive', 'Orange',
'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
'Quince',
'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
'Ugli fruit',
'Watermelon',
];

export default class AutoCompleteSearchBox extends React.Component {
  constructor(props) {
    super(props)

  }
  
  render()
  {
    return(
      <div style={{align:"center"}}>
      <Paper style={style} zDepth={2} rounded={false}>
      <AutoComplete
      floatingLabelText="Search"
      filter={AutoComplete.fuzzyFilter}
      dataSource={this.props.concepts}
      style={{width:"-10px"}}
      onNewRequest={this.props.sendConcept}
      textFieldStyle={{width:"680px"}}
      listStyle={{width:"680px"}}
      maxSearchResults={5}
      />
      <IconButton><ActionSearch /></IconButton>
      </Paper>
      </div>
      )
  }
}