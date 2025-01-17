import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

/* Hướng dẫn sử dụng */
/* Thêm những dòng này vào screen */
/* 
    //Handle custom alert
      let isCorrectAnswer = true;
      const [alertVisible, setAlertVisible] = useState(false);
      const [alertTile, setAlertTile] = useState("ss");
      const [alertMessage, setMessage] = useState("sss");
      const runAlert = ({title, message}) => {
        setAlertTile(title)
        setMessage(message)
        setAlertVisible(true)
      }

    //khi cần alert thì chạy runAlert()

    //ở phần render
    <Alert
              visible={alertVisible}
              title={alertTile}
              message={alertMessage}
              onClose={() => {
                setAlertVisible(false);
              }}
              isCorrectAnswer={isCorrectAnswer}
            />
 */

export default Alert = ({
  visible,
  title,
  message,
  onClose,
  isCorrectAnswer,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
