import React, {useState} from 'react';
import {
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Platform,
    Vibration, Alert,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function App() {
    const [image, setImage] = useState(require('./assets/Emty_ball.png'));
    const [question, setQuestion] = useState('');

    const listOfImages = [
        require('./assets/1.png'), require('./assets/2.png'), require('./assets/3.png'),
        require('./assets/4.png'), require('./assets/5.png'), require('./assets/6.png'),
        require('./assets/7.png'), require('./assets/8.png'), require('./assets/9.png'),
        require('./assets/10.png'), require('./assets/11.png'), require('./assets/12.png'),
        require('./assets/13.png'), require('./assets/14.png'), require('./assets/15.png'),
        require('./assets/16.png'), require('./assets/17.png'), require('./assets/18.png'),
        require('./assets/19.png'),
    ];

    const getRandomIndex = () => Math.floor(Math.random() * listOfImages.length);

    const getDestiny = () => {

        if (!question) {
            Alert.alert('Ошибка ввода', "Чтобы узнать свою судьбу, нужно ввести вопрос")
        } else if (!question.endsWith('?')) {
            Alert.alert('Ошибка ввода', "Вы ввели не вопрос :)")
        } else {
            Vibration.vibrate(50);
            setImage(listOfImages[getRandomIndex()]);
        }

    };

    const resetImage = () => {
        setImage(require('./assets/Emty_ball.png'));
        setQuestion('');
    };

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            enableOnAndroid={true}
            extraHeight={Platform.OS === 'android' ? 100 : 0}
            keyboardShouldPersistTaps="handled"
        >
            <Image source={image} style={styles.image}/>

            <TextInput
                value={question}
                placeholder="Введите вопрос"
                placeholderTextColor="#ddd"
                style={styles.input}
                onChangeText={setQuestion}
            />

            <TouchableOpacity style={styles.button} onPress={getDestiny} activeOpacity={0.85}>
                <Text style={styles.buttonText}>Узнать свою судьбу</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetImage} activeOpacity={0.85}>
                <Text style={styles.buttonText}>Сбросить</Text>
            </TouchableOpacity>

            <StatusBar style="light"/>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a0b3b',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 40,
    },
    input: {
        width: '85%',
        height: 52,
        backgroundColor: '#2e1a55',
        borderRadius: 26,
        paddingHorizontal: 20,
        color: '#fff',
        fontSize: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#8e44ad',
    },
    button: {
        width: '70%',
        backgroundColor: '#8e44ad',
        paddingVertical: 14,
        borderRadius: 30,
        marginBottom: 14,
        alignItems: 'center',
        shadowColor: '#8e44ad',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 2,
    },
    resetButton: {
        backgroundColor: '#4a235a',
        shadowColor: '#4a235a',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
