// screens/teacher/CreateClassScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CreateClassScreen() {
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    monthlyFee: '',
    qrImage: null
  });
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSubmit = () => {
    if (!formData.className || !formData.subject || !formData.monthlyFee) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    
    // Generate class code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
    
    // Here you'll integrate with Firebase
    console.log('Creating class:', formData);
  };

  const selectImage = () => {
    Alert.alert('Select Image', 'Choose from camera or gallery', [
      { text: 'Camera', onPress: () => console.log('Open camera') },
      { text: 'Gallery', onPress: () => console.log('Open gallery') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="book" size={28} color="#4467EE" />
          <Text style={styles.headerTitle}>Create New Class</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Set up a new class and generate a unique class code for students to join
        </Text>
      </View>

      {/* Form Card */}
      <View style={styles.formCard}>
        
        {/* Class Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Class Name *</Text>
          <TextInput
            style={styles.textInput}
            value={formData.className}
            onChangeText={(value) => setFormData({...formData, className: value})}
            placeholder="Enter class name (e.g., Physics Grade 12)"
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Subject */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject *</Text>
          <TextInput
            style={styles.textInput}
            value={formData.subject}
            onChangeText={(value) => setFormData({...formData, subject: value})}
            placeholder="Enter subject (e.g., Mathematics, Physics)"
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Monthly Fee */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monthly Fee (₹) *</Text>
          <View style={styles.feeInputContainer}>
            <Ionicons name="cash" size={20} color="#6B7280" style={styles.feeIcon} />
            <TextInput
              style={styles.feeInput}
              value={formData.monthlyFee}
              onChangeText={(value) => setFormData({...formData, monthlyFee: value})}
              placeholder="2000"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* QR Code Upload */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Payment QR Code</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={selectImage}>
            <Ionicons name="cloud-upload" size={32} color="#4467EE" />
            <Text style={styles.uploadText}>
              {formData.qrImage ? 'QR Code Selected' : 'Tap to upload QR code'}
            </Text>
            <Text style={styles.uploadSubtext}>
              PNG, JPG up to 5MB
            </Text>
            <View style={styles.uploadButton}>
              <Ionicons name="camera" size={16} color="white" />
              <Text style={styles.uploadButtonText}>Choose Image</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Class</Text>
        </TouchableOpacity>
      </View>

      {/* Generated Class Code */}
      {generatedCode && (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>Class Created Successfully! 🎉</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Class Code</Text>
            <View style={styles.codeRow}>
              <Text style={styles.codeText}>{generatedCode}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Ionicons name="copy" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.shareText}>
            Share this code with students so they can join your class
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
  },
  headerSubtitle: {
    color: '#6B7280',
    fontSize: 16,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    color: 'black',
    fontSize: 16,
  },
  feeInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  feeInput: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    paddingLeft: 48,
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  uploadText: {
    color: '#374151',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4467EE',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#4467EE',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  successCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  successTitle: {
    color: '#059669',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  codeContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4467EE',
    marginBottom: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  codeLabel: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    marginRight: 12,
  },
  copyButton: {
    backgroundColor: '#4467EE',
    padding: 8,
    borderRadius: 8,
  },
  shareText: {
    color: '#374151',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});