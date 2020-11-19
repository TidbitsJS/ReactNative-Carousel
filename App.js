import React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions } from 'react-native';
const {width, height} = Dimensions.get('screen');

// import example from './Images/alert.png'
// const exampleUri = Image.resolveAssetSource(example).uri

const image01 = require('./Images/alert.png')
const image02 = require('./Images/energy.png')
const image03 = require('./Images/soft-drink.png')
const image04 = require('./Images/cookies.png')

const bgs = ['#F57A08', '#FF9BFF', '#ED2061', '#F79E60'];
const DATA = [
  {
    "key": "3571572",
    "title": "Multi-lateral intermediate moratorium",
    "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    "image": image01
  },
  {
    "key": "3571747",
    "title": "Automated radical data-warehouse",
    "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    "image": image02
  },
  {
    "key": "3571680",
    "title": "Inverse attitude-oriented system engine",
    "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    "image": image03
  },
  {
    "key": "3571603",
    "title": "Monitored global data-warehouse",
    "description": "We need to program the open-source IB interface!",
    "image": image04
  }
]

const Indicator = ({scrollX}) => {

   return (
     <View style={{position: 'absolute', bottom: 40, flexDirection: 'row'}}>
       {DATA.map((_, i) => {
         const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
         
         const scale = scrollX.interpolate({
           inputRange,
           outputRange: [0.8, 1.4, 0.8],
           extrapolate: 'clamp',
         })

         const opacity = scrollX.interpolate({
           inputRange,
           outputRange: [0.6, 0.9, 0.6],
           extrapolate: 'clamp',
         })

         return <Animated.View key={`indicator-${i}`} 
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              opacity,
              margin: 10,
              transform: [{ scale }]
            }} />
       })}
     </View>
   )
}

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg)
  })

  return (
    <Animated.View 
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor }
      ]}
    />
  )
}

const Square = ({scrollX}) => {

  const YOLO = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX, width),
      new Animated.Value(width)
  ), 1)

  const rotate = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: ['35deg', '0deg', '35deg']
  })

  const translateX = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, -height, 0]
  })

  const translateY = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, -height, 0]
  })

  return (
    <Animated.View 
      style={{
        width: height, 
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.65,
        left: -height * 0.35,
        transform: [
          { rotate },
          { translateX },
          { translateY }
        ]
      }}
    />
  )
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList 
          data={DATA}
          keyExtractor={item => item.key}
          horizontal
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX} }}],
            {useNativeDriver: false}
          )}
          contentContainerStyle={{paddingBottom: 100}}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({item}) => {
            console.log(require('./Images/alert.png'))
            return (
              <View style={{width, padding: 20 ,alignItems: 'center'}}>
                <View style={{flex: .7, justifyContent: 'center'}}>
                  <Image 
                    source={ item.image }
                    style={{
                      width: width / 2,
                      height: height / 2,
                      resizeMode: 'contain'
                    }}
                  />
                </View>
                <View style={{flex: .3}}>
                    <Text style={{ 
                        color: '#fff', 
                        fontWeight: '800', 
                        fontSize: 24, 
                        marginBottom: 10, 
                        marginTop: 10
                    }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: '#fff', fontWeight: '300'}}>
                      {item.description}
                    </Text>
                </View>
              </View>
            )
          }}
       />
       <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
