/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);



  const getArt = async () => {

      var raw = JSON.stringify({ 
      "q": "cats",
      "query": {
          "term": {
              "is_public_domain": true
          }
      }
  });


var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    };
     try {
      const response = await fetch('https://api.artic.edu/api/v1/artworks/129884',requestOptions);
      const json = await response.json();
      setData(json.art);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }




  useEffect(() => {
    getArt();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text>{item.data.title}</Text>
          )}
        />
      )}
    </View>
  );
};