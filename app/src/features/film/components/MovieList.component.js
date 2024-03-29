import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { Fontisto, Octicons } from "@expo/vector-icons";

import textStyle from "@src/components/typography/text.style";
import { theme } from "@src/infrastructure/theme";
import { navigate } from "@src/infrastructure/navigation/navigator.navigation";
import { AUTH_ROUTE } from "@src/infrastructure/navigation/route";
import DropDownComponent from "@src/components/dropdown/DropDown.component";
import MovieItem from "./MovieItem.component";
import { FlashList } from "@shopify/flash-list";

const mockMovieGenres = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Comedy",
  },
  {
    id: 3,
    name: "Drama",
  },
];
const parse = () => {
  return mockMovieGenres.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
};
const MovieList = ({ genre, data }) => {
  const [selectedGenre, setSelectedGenre] = useState();
  console.log("selectedGenre", selectedGenre);
  return (
    <View style={styles.container}>
      <DropDownComponent
        label={"Thể loại"}
        style={{ paddingHorizontal: 12 }}
        values={parse(mockMovieGenres)}
        onSelect={setSelectedGenre}
        selectedItem={selectedGenre}
      ></DropDownComponent>
      <FlashList
        estimatedItemSize={60}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={undefined}
        data={[1, 2, 3]}
        renderItem={({ item }) => {
          return (
            <View style={{ marginVertical: 8 }}>
              <MovieItem movie={item}></MovieItem>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default MovieList;
