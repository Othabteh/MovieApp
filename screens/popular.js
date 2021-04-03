import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, Modal, SafeAreaView } from 'react-native';

export default function Upcoming() {
  const apiUrlList = 'https://api.themoviedb.org/3/movie/popular?api_key=9eccd2f76e387bef9ff61b5805ae15b3&language=en-US&page=1';

  const [state, setState] = useState({
    results: [],
    selected: {},
    cridets: [],
  });
  useEffect(() => {
    axios.get(apiUrlList).then(({ data }) => {
      let result = data.results;
      setState((prevState) => {
        return { ...prevState, results: result };
      });
    });
  }, []);

  const openPopup = (id) => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9eccd2f76e387bef9ff61b5805ae15b3&language=en-US`).then(({ data }) => {
      let result = data;
      console.log(result);
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=9eccd2f76e387bef9ff61b5805ae15b3&language=en-US`).then(({ data }) => {
      let result = data.cast;
      setState((prevState) => {
        return { ...prevState, cridets: result };
      });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>

      <StatusBar style='auto' />
      <ScrollView style={styles.results}>
        {state.results.map((result) => (
          <TouchableHighlight key={result.id} onPress={() => openPopup(result.id)}>
            <View style={styles.result}>
              <View style={{ width: '20%' }}>
                <Image
                  source={{ uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${result.poster_path}` }}
                  style={{
                    width: 100,
                    height: 200,
                    borderRadius: 20,
                  }}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.moveName}>{result.title}</Text>
                <Text style={styles.moveDate}>{result.release_date}</Text>
                <Text style={styles.moveType}>{result.genre_ids}</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text style={styles.percent}>{result.vote_average}</Text>
              </View>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>

      <Modal animationType='fade' transparent={false} visible={typeof state.selected.title != 'undefined'}>
        <TouchableHighlight
          onPress={() =>
            setState((prevState) => {
              return { ...prevState, selected: [] };
            })
          }
        >
          <Icon style={styles.icon} name='chevron-left' size={60} color='black' />
        </TouchableHighlight>
        <ScrollView style={styles.results}>
          <View style={styles.popup}>
            <Image
              source={{ uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${state.selected.poster_path}` }}
              style={{
                width: 200,
                height: 300,
                borderRadius: 20,
                alignSelf: 'center',
                marginBottom: 10,
              }}
            />
            <Text style={styles.popTitle}>{state.selected.title}</Text>
            <Text style={styles.popRating}>{state.selected.vote_average}</Text>

            <Text style={styles.headings}>Overview</Text>
            <Text style={{ fontSize: 16, lineHeight: 30 }}>{state.selected.overview}</Text>

            <Text style={styles.headings}>Genres</Text>
            <View style={styles.genresContainer}>
              {state.selected?.genres?.map((item, index) => (
                <Text key={index} style={styles.genres}>
                  {item.name}
                </Text>
              ))}
            </View>
            <Text style={styles.headings}>Credits</Text>

            <ScrollView horizontal={true}>
              {state.cridets?.map((item, index) => (
                <View key={index} style={styles.cridetContainer}>
                  <Image
                    source={{ uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.profile_path}` }}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 150 / 2,
                      overflow: 'hidden',
                      borderWidth: 3,
                      borderColor: '#fff',
                      marginBottom: 10,
                    }}
                  />
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    justifyContent: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 20,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filter: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#dadada',
    borderRadius: 30,
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
  },

  info: {
    width: '50%',
    marginLeft: 50,
    marginTop: 20,
  },
  moveName: {
    color: '#615a5a',
    fontSize: 18,
    fontWeight: '700',
  },
  moveDate: {
    color: 'gray',
    fontSize: 18,
    marginVertical: 30,
  },
  moveType: {
    color: 'black',
    fontSize: 18,
    backgroundColor: '#dadada',
    borderRadius: 30,
    textAlign: 'center',
  },
  percent: {
    marginTop: 170,
    fontSize: 20,
    fontWeight: '700',
    paddingRight: 10,
    color: 'green',
  },
  popup: {
    padding: 20,
  },
  popTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
    alignSelf: 'center',
  },
  popRating: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
    alignSelf: 'center',
    color: 'green',
    marginBottom: 15,
  },
  icon: {
    width: 100,
    fontWeight: '700',
  },
  genresContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  genres: {
    marginHorizontal: 5,
    paddingHorizontal: 15,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
    backgroundColor: '#dadada',
    borderRadius: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  headings: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
  },
  cridetContainer: {
    alignItems: 'center',
  },
});
