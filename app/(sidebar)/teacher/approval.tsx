// TeacherApprovalsPage.js - Expo React Native Component
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Modal, 
  Alert,
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TeacherApprovalsPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  // Mock data - this would come from Firebase
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: '1',
      studentName: 'Pravin Avhad',
      className: 'Mathematics Grade 10',
      phone: '+91 9876543210',
      rollNumber: 'MT001',
      gender: 'Male',
      screenshotUrl: 'https://via.placeholder.com/300x400/4467EE/white?text=Payment+Screenshot',
      requestDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      studentName: 'Ritesh Deshmukh',
      className: 'Physics Grade 12',
      phone: '+91 9876543211',
      rollNumber: 'PH002',
      gender: 'Female',
      screenshotUrl: 'https://via.placeholder.com/300x400/4467EE/white?text=Payment+Screenshot+2',
      requestDate: '2024-01-16',
      status: 'pending'
    },
    {
      id: '3',
      studentName: 'Virat Kohli',
      className: 'Chemistry Grade 11',
      phone: '+91 9876543212',
      rollNumber: 'CH003',
      gender: 'Male',
      screenshotUrl: 'https://via.placeholder.com/300x400/4467EE/white?text=Payment+Screenshot+3',
      requestDate: '2024-01-17',
      status: 'pending'
    }
  ]);

  const handleViewScreenshot = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  const handleApprove = (requestId, studentName) => {
    Alert.alert(
      'Approve Request',
      `Are you sure you want to approve ${studentName}'s request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          style: 'default',
          onPress: () => {
            setPendingRequests(prev => 
              prev.filter(request => request.id !== requestId)
            );
            Alert.alert('Success', `${studentName} has been approved successfully!`);
          }
        }
      ]
    );
  };

  const handleReject = (requestId, studentName) => {
    Alert.alert(
      'Reject Request',
      `Are you sure you want to reject ${studentName}'s request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setPendingRequests(prev => 
              prev.filter(request => request.id !== requestId)
            );
            Alert.alert('Rejected', `${studentName}'s request has been rejected.`);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Join Requests</Text>
        <Text style={styles.headerSubtitle}>
          {pendingRequests.length} pending approval{pendingRequests.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {pendingRequests.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#4467EE" />
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptySubtitle}>
              No pending join requests at the moment
            </Text>
          </View>
        ) : (
          pendingRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              {/* Student Info Header */}
              <View style={styles.cardHeader}>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{request.studentName}</Text>
                  <Text style={styles.className}>{request.className}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>PENDING</Text>
                </View>
              </View>

              {/* Student Details */}
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone:</Text>
                  <Text style={styles.detailValue}>{request.phone}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Roll Number:</Text>
                  <Text style={styles.detailValue}>{request.rollNumber}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Gender:</Text>
                  <Text style={styles.detailValue}>{request.gender}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Request Date:</Text>
                  <Text style={styles.detailValue}>
                    {new Date(request.requestDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsContainer}>
                {/* View Screenshot Button */}
                <TouchableOpacity
                  onPress={() => handleViewScreenshot(request.screenshotUrl)}
                  style={styles.screenshotButton}
                >
                  <Ionicons name="image-outline" size={20} color="white" />
                  <Text style={styles.screenshotButtonText}>View Screenshot</Text>
                </TouchableOpacity>

                {/* Approve/Reject Buttons */}
                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity
                    onPress={() => handleReject(request.id, request.studentName)}
                    style={[styles.actionButton, styles.rejectButton]}
                  >
                    <Ionicons name="close-circle-outline" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Reject</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleApprove(request.id, request.studentName)}
                    style={[styles.actionButton, styles.approveButton]}
                  >
                    <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Payment Screenshot</Text>
              <TouchableOpacity
                onPress={() => setImageModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
            
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.modalImage}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  requestCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4467EE',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  className: {
    fontSize: 16,
    color: '#4467EE',
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: '#4467EE20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#4467EE',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#888',
    fontSize: 14,
  },
  detailValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  actionsContainer: {
    gap: 12,
  },
  screenshotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  screenshotButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  rejectButton: {
    backgroundColor: '#dc2626',
  },
  approveButton: {
    backgroundColor: '#4467EE',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxWidth: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalCloseButton: {
    padding: 8,
    backgroundColor: '#444',
    borderRadius: 20,
  },
  modalImage: {
    width: 280,
    height: 400,
    borderRadius: 8,
    resizeMode: 'contain',
  },
});