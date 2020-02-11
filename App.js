import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, StatusBar, ActivityIndicator} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null
        };
    }

    componentDidMount() {
        return fetch('https://newsapi.org/v2/top-headlines?country=gr&apiKey=7f11520bb08342ec9422d3bb93e4a58a')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.articles
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        } else {

            let posts = this.state.dataSource.map((val, key) => {
                return <Card key={key} title={val.title} style={styles.card}>
                    <View style={styles.user}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{uri: val.urlToImage}}
                        />
                        <Text style={styles.description}>{val.description}</Text>
                    </View>
                </Card>
            });

            return (
                <ScrollView style={styles.container}>
                    <StatusBar barStyle="dark-content" backgroundColor="#cacaca"/>
                    <Text style={styles.headTitle}>News</Text>
                    {posts}
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    user: {
        padding: 0
    },
    image: {
        width: '100%',
        height: 200
    },
    description: {
        paddingVertical:  20
    },
    card: {

    },
    headTitle: {
        color: "#000",
        textAlign: 'center',
        padding: 15,
        fontSize: 20
    }
});
