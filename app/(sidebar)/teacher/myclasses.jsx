import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock data - replace with Firebase data
const mockClasses = [
  {
    id: '1',
    subject: 'Mathematics',
    className: 'Grade 10 Math',
    monthlyFee: 1500,
    totalStudents: 25,
    activeStudents: 23,
    classCode: 'MATH10A',
    createdDate: '2024-01-15',
    description: 'Advanced mathematics for grade 10 students',
  },
  {
    id: '2',
    subject: 'Physics',
    className: 'Grade 12 Physics',
    monthlyFee: 2000,
    totalStudents: 18,
    activeStudents: 18,
    classCode: 'PHY12B',
    createdDate: '2024-02-01',
    description: 'Comprehensive physics course for grade 12',
  },
  {
    id: '3',
    subject: 'Chemistry',
    className: 'Grade 11 Chemistry',
    monthlyFee: 1800,
    totalStudents: 20,
    activeStudents: 19,
    classCode: 'CHEM11C',
    createdDate: '2024-01-20',
    description: 'Organic and inorganic chemistry fundamentals',
  },
];

export default function MyClasses() {
  const router = useRouter();
  const [classes, setClasses] = useState(mockClasses);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClass, setNewClass] = useState({
    subject: '',
    className: '',
    monthlyFee: '',
    description: '',
  });

  const handleCreateClass = () => {
    // Here you would integrate with Firebase
    const classCode = generateClassCode();
    const newClassData = {
      id: Date.now().toString(),
      ...newClass,
      monthlyFee: parseInt(newClass.monthlyFee),
      totalStudents: 0,
      activeStudents: 0,
      classCode,
      createdDate: new Date().toISOString().split('T')[0],
    };
    
    setClasses([...classes, newClassData]);
    setNewClass({ subject: '', className: '', monthlyFee: '', description: '' });
    setShowCreateModal(false);
  };

  const generateClassCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleViewDetails = (classId) => {
    router.push(`/(sidebar)/(teacher)/classdetails/${classId}`);
  };

  const ClassCard = ({ classData }) => (
    <View style={styles.classCard}>
      <View style={styles.cardHeader}>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectText}>{classData.subject}</Text>
        </View>
        <Text style={styles.classCode}>Code: {classData.classCode}</Text>
      </View>
      
      <Text style={styles.className}>{classData.className}</Text>
      <Text style={styles.classDescription}>{classData.description}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.statText}>{classData.totalStudents} Students</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
          <Text style={styles.statText}>{classData.activeStudents} Active</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="cash-outline" size={16} color="#FF9800" />
          <Text style={styles.statText}>₹{classData.monthlyFee}/month</Text>
        </View>
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => handleViewDetails(classData.id)}
        >
          <Ionicons name="eye-outline" size={16} color="#fff" />
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.createdDate}>
        Created: {new Date(classData.createdDate).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Classes</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.createButtonText}>Create Class</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{classes.length}</Text>
          <Text style={styles.summaryLabel}>Total Classes</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {classes.reduce((sum, cls) => sum + cls.totalStudents, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Total Students</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            ₹{classes.reduce((sum, cls) => sum + (cls.monthlyFee * cls.activeStudents), 0)}
          </Text>
          <Text style={styles.summaryLabel}>Monthly Revenue</Text>
        </View>
      </View>

      <ScrollView style={styles.classesContainer} showsVerticalScrollIndicator={false}>
        {classes.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Classes Yet</Text>
            <Text style={styles.emptySubtitle}>Create your first class to get started</Text>
          </View>
        ) : (
          <View style={styles.classGrid}>
            {classes.map((classData) => (
              <ClassCard key={classData.id} classData={classData} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Create Class Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Class</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Subject</Text>
                <TextInput
                  style={styles.input}
                  value={newClass.subject}
                  onChangeText={(text) => setNewClass({...newClass, subject: text})}
                  placeholder="e.g., Mathematics, Physics"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Class Name</Text>
                <TextInput
                  style={styles.input}
                  value={newClass.className}
                  onChangeText={(text) => setNewClass({...newClass, className: text})}
                  placeholder="e.g., Grade 10 Math Advanced"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Monthly Fee (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={newClass.monthlyFee}
                  onChangeText={(text) => setNewClass({...newClass, monthlyFee: text})}
                  placeholder="e.g., 1500"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newClass.description}
                  onChangeText={(text) => setNewClass({...newClass, description: text})}
                  placeholder="Brief description of the class"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleCreateClass}
              >
                <Text style={styles.submitButtonText}>Create Class</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  classesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  classGrid: {
    gap: 16,
    paddingBottom: 20,
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  subjectText: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '600',
  },
  classCode: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  classDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#E3F2FD',
  },
  createdDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});