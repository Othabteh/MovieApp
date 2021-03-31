import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';

export default function App() {
  const apiUrl = 'https://api.themoviedb.org/4/list/1?page=1&api_key=9eccd2f76e387bef9ff61b5805ae15b3&sort_by=original_order.asc';
  const [state, setState] = useState({
    results: [],
    selected: {},
  });
  useEffect(() => {
    axios(apiUrl).then(({ data }) => {
      let result = data.results;
      setState((prevState) => {
        return { ...prevState, results: result };
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>

      <StatusBar style='auto' />
      <ScrollView style={styles.results}>
        {state.results.map((result) => (
          <View key={result.id} style={styles.result}>
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
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    justifyContent: 'flex-start',
    padding: 70,
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 20,
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
});
