// src/components/MyButton.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const MyButton = ({ title }) => (
  <TouchableOpacity style={{ backgroundColor: Colors.secondary }}>
    <Text style={{ color: Colors.white }}>{title}</Text>
  </TouchableOpacity>
);

export default MyButton;
