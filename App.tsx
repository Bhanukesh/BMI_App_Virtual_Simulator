import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [recommendation, setRecommendation] = useState({ yoga: '', nutrition: '' });

  const calculateBMI = () => {
    const weightInKg =
      weightUnit === 'lbs' ? parseFloat(weight) * 0.453592 : parseFloat(weight);
    const heightInM =
      heightUnit === 'in' ? parseFloat(height) * 0.0254 : parseFloat(height) / 100;
    
    const bmiValue = weightInKg / (heightInM * heightInM);
    setBmi(bmiValue.toFixed(2));

    // Determine BMI status
    if (bmiValue < 18.5) {
      setStatus('Underweight');
      setRecommendation({
        yoga: 'Light stretching exercises',
        nutrition: 'Calorie-dense snacks like nuts and seeds'
      });
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setStatus('Normal weight');
      setRecommendation({
        yoga: 'Vinyasa yoga',
        nutrition: 'Balanced diet with whole grains'
      });
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setStatus('Overweight');
      setRecommendation({
        yoga: 'Power yoga',
        nutrition: 'High-fiber vegetables and lean proteins'
      });
    } else {
      setStatus('Obese');
      setRecommendation({
        yoga: 'Gentle yoga',
        nutrition: 'Low-carbohydrate meals and avoid sugary drinks'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight"
        keyboardType="numeric"
      />
      <Picker
        selectedValue={weightUnit}
        onValueChange={(itemValue) => setWeightUnit(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Kilograms (kg)" value="kg" />
        <Picker.Item label="Pounds (lbs)" value="lbs" />
      </Picker>
      
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        placeholder="Height"
        keyboardType="numeric"
      />
      <Picker
        selectedValue={heightUnit}
        onValueChange={(itemValue) => setHeightUnit(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Centimeters (cm)" value="cm" />
        <Picker.Item label="Inches (in)" value="in" />
      </Picker>
      
      <Button title="Calculate" onPress={calculateBMI} />
      
      {bmi && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Your BMI: {bmi}</Text>
          <Text style={styles.resultText}>Status: {status}</Text>
          <Text style={styles.resultText}>Yoga recommendation: {recommendation.yoga}</Text>
          <Text style={styles.resultText}>Nutrition recommendation: {recommendation.nutrition}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    marginVertical: 10,
  },
  result: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default App;
