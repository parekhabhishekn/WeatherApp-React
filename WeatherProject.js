var React = require("react-native");
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} = React;

var Forecast = require('./Forecast');

var WeatherProject = React.createClass({
  
  getInitialState: function(){
    return { 
      zip: '',
      forecast: null/*{
        main: 'Clouds',
        description: 'few clouds',
        temp: 45.7
      }*/
     };
  },

  render:function(){
    var content = null;
    if(this.state.forecast !== null){
        content = <Forecast 
                      main = {this.state.forecast.main}
                      description = {this.state.forecast.description}
                      temp = {this.state.forecast.temp} />

    }
    return(
      <View style={styles.container}>
        <Image source={require('image!farm')}
               resizeMode='cover'
               style={styles.backdrop}>
          <View style={styles.overlay}>
           <View style={styles.row}>
             <Text style={styles.mainText}>
               Current weather for
             </Text>
             <View style={styles.zipContainer}>
               <TextInput
                 style={[styles.zipCode, styles.mainText]}
                 returnKeyType='go'
                 onSubmitEditing={this._handleTextChange}/>
             </View>
           </View>
           {content}
         </View>
        </Image>
      </View>
      );
  },

  _handleTextChange: function(event){
    var zip = event.nativeEvent.text;
    this.setState({zip: zip});
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+zip+',us&units=imperial&appid=44db6a862fba0b067b1930da0d769e98')
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          this.setState({
              forecast: {
                main: responseJSON.weather[0].main,
                description: responseJSON.weather[0].description,
                temp: responseJSON.main.temp
              }
          });
        })
        .catch((error)=>{
          console.warn(error);
        });
    console.log(event.nativeEvent.text);
    this.setState({
      zip: event.nativeEvent.text
    });
  },

});

var baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});

module.exports = WeatherProject;