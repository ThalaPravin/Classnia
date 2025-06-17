import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const JoinClassPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [joinForm, setJoinForm] = useState({
    name: '',
    phone: '',
    rollNumber: '',
    gender: '',
    transactionId: '',
    screenshot: null
  });

  // Mock data for available classes
  const availableClasses = [
    { id: 'CLS001', subject: 'Mathematics', teacher: 'Mr. Smith', fee: 2000, students: 25 },
    { id: 'CLS002', subject: 'Physics', teacher: 'Dr. Johnson', fee: 2500, students: 18 },
    { id: 'CLS003', subject: 'Chemistry', teacher: 'Ms. Davis', fee: 2200, students: 22 },
    { id: 'CLS004', subject: 'Biology', teacher: 'Dr. Wilson', fee: 2300, students: 20 },
    { id: 'CLS005', subject: 'English', teacher: 'Ms. Brown', fee: 1800, students: 30 },
    { id: 'CLS006', subject: 'History', teacher: 'Mr. Taylor', fee: 1900, students: 15 }
  ];

  const filteredClasses = availableClasses.filter(cls =>
    cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinClass = (classData:any) => {
    setSelectedClass(classData);
    setJoinModalVisible(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setJoinForm({ ...joinForm, screenshot: result.assets[0] });
    }
  };

  const handleFormSubmit = () => {
    if (!joinForm.name || !joinForm.phone || !joinForm.rollNumber || !joinForm.gender || !joinForm.transactionId) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (!joinForm.screenshot) {
      Alert.alert('Error', 'Please upload payment screenshot');
      return;
    }

    // Submit join request
    Alert.alert(
      'Success', 
      'Join request submitted successfully! You will be notified once the teacher approves your request.',
      [{ text: 'OK', onPress: () => {
        setJoinModalVisible(false);
        setJoinForm({ name: '', phone: '', rollNumber: '', gender: '', transactionId: '', screenshot: null });
      }}]
    );
  };

  const renderClassCard = ({ item }: { item: any }) => (
    <View style={styles.classCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.subjectText}>{item.subject}</Text>
          <Text style={styles.classIdText}>Class ID: {item.id}</Text>
        </View>
        <View style={styles.feeContainer}>
          <Text style={styles.feeText}>₹{item.fee}</Text>
          <Text style={styles.feeLabel}>per month</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={16} color="#666" />
          <Text style={styles.infoText}>{item.teacher}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="group" size={16} color="#666" />
          <Text style={styles.infoText}>{item.students} students enrolled</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => handleJoinClass(item)}
      >
        <Ionicons name="add-circle-outline" size={16} color="white" />
        <Text style={styles.joinButtonText}>Join Class</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Classes</Text>
        <Text style={styles.headerSubtitle}>Find and join classes that interest you</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search classes, teachers, or class ID..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Classes List */}
      <FlatList
        data={filteredClasses}
        renderItem={renderClassCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Join Class Modal */}
      <Modal
        visible={joinModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setJoinModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Join {selectedClass?.subject}</Text>
              <TouchableOpacity
                onPress={() => setJoinModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.classInfo}>
                <Text style={styles.classInfoText}>Teacher: {selectedClass?.teacher}</Text>
                <Text style={styles.classInfoText}>Monthly Fee: ₹{selectedClass?.fee}</Text>
                <Text style={styles.classInfoText}>Class ID: {selectedClass?.id}</Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  value={joinForm.name}
                  onChangeText={(text) => setJoinForm({...joinForm, name: text})}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  value={joinForm.phone}
                  onChangeText={(text) => setJoinForm({...joinForm, phone: text})}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Roll Number *</Text>
                <TextInput
                  style={styles.input}
                  value={joinForm.rollNumber}
                  onChangeText={(text) => setJoinForm({...joinForm, rollNumber: text})}
                  placeholder="Enter your roll number"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Gender *</Text>
                <View style={styles.genderContainer}>
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <TouchableOpacity
                      key={gender}
                      style={[
                        styles.genderOption,
                        joinForm.gender === gender.toLowerCase() && styles.selectedGender
                      ]}
                      onPress={() => setJoinForm({...joinForm, gender: gender.toLowerCase()})}
                    >
                      <Text style={[
                        styles.genderText,
                        joinForm.gender === gender.toLowerCase() && styles.selectedGenderText
                      ]}>
                        {gender}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Transaction ID *</Text>
                <TextInput
                  style={styles.input}
                  value={joinForm.transactionId}
                  onChangeText={(text) => setJoinForm({...joinForm, transactionId: text})}
                  placeholder="Enter payment transaction ID"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Payment Screenshot *</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                  <MaterialIcons name="cloud-upload" size={24} color="#4467EE" />
                  <Text style={styles.uploadText}>
                    {joinForm.screenshot ? 'Screenshot Uploaded' : 'Upload Payment Screenshot'}
                  </Text>
                </TouchableOpacity>
                {joinForm.screenshot && (
                  <Image source={{ uri: joinForm.screenshot.uri }} style={styles.previewImage} />
                )}
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                <Text style={styles.submitButtonText}>Submit Join Request</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    margin: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  classCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4467EE',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  subjectText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  classIdText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  feeContainer: {
    alignItems: 'flex-end',
  },
  feeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4467EE',
  },
  feeLabel: {
    fontSize: 12,
    color: '#666',
  },
  cardBody: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#666',
  },
  joinButton: {
    backgroundColor: '#4467EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    padding: 20,
  },
  classInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  classInfoText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  selectedGender: {
    backgroundColor: '#4467EE',
    borderColor: '#4467EE',
  },
  genderText: {
    fontSize: 15,
    color: '#666',
  },
  selectedGenderText: {
    color: 'white',
    fontWeight: '600',
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#4467EE',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  uploadText: {
    marginTop: 8,
    fontSize: 15,
    color: '#4467EE',
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#4467EE',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JoinClassPage;