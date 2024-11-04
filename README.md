# RSA Timing Attack Demonstration

This project simulates an RSA Timing Attack to showcase the vulnerability of RSA encryption in real-world scenarios. It includes a visual representation of a Sender and Receiver communicating using RSA encryption, with an Attacker attempting to exploit timing discrepancies during decryption to reveal potential weaknesses in the encryption system. The project is built using HTML, CSS, and JavaScript, and includes interactive features to help users understand the concept of timing attacks on RSA.
Project Overview

In cryptography, timing attacks are a side-channel attack in which an attacker attempts to compromise a cryptosystem by analyzing the time taken to execute cryptographic algorithms. By measuring the decryption time across multiple attempts, an attacker can infer information about the private key.

This basic demo illustrates the concept by simulating multiple decryption attempts by an attacker who uses timing information to potentially uncover weaknesses. The demo shows an animated flow of encrypted messages from Sender to Receiver, with the Attacker intercepting the messages to analyze decryption timings.
Features: 
- RSA Encryption/Decryption: Uses RSA to encrypt messages from Sender to Receiver, with decryption taking place on the Attacker's computer to simulate timing analysis.
- Interactive Message Input: Users can enter a message to be encrypted and specify the number of decryption attempts.
- Timing Attack Simulation: Simulates decryption timing measurements for multiple attempts, which the attacker uses for analysis.
- Visual Representation: Simple representations of three computers (Sender, Receiver, and Attacker) connected with lines indicating message flow.
- Graphical Timing Analysis: A line graph using Chart.js displays the decryption time for each attempt, with color-coded points (green for faster times and red for slower ones) to indicate timing variations.
