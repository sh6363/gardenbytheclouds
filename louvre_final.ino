const int ledPin = 9; // Define the LED pin
int brightness = 5; // Initial brightness level
int fadeAmount = 5; // Amount to fade the LED by

void setup() {
  pinMode(ledPin, OUTPUT); // Set the LED pin as an output
  Serial.begin(9600); // Initialize serial communication
}

void loop() {
  // Check if data is available from serial port
  if (Serial.available() > 0) {
    // Read the incoming byte
    char receivedChar = Serial.read();
    // If '1' is received, increase brightness gradually
    if (receivedChar == '1') {
      for (int i = brightness; i <= 255; i += fadeAmount) {
        analogWrite(ledPin, i); // Set the LED brightness
        delay(30); // Wait a little before next step
      }
      delay(3000); // Wait for 3 seconds
      // Gradually decrease brightness back to 50
      for (int i = 255; i >= brightness; i -= fadeAmount) {
        analogWrite(ledPin, i); // Set the LED brightness
        delay(30); // Wait a little before next step
      }
    }
  }
  // If '1' is not received, keep the LED at dim level 50
  analogWrite(ledPin, brightness);
}
