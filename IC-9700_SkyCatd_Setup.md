# IC-9700 and SkyCATd Configuration Guide

## Overview
This guide covers the complete setup process for connecting an Icom IC-9700 transceiver to the SkyCATd.exe CAT (Computer Aided Transceiver) control program for remote operation and control.

## Prerequisites
- Icom IC-9700 transceiver
- Windows computer with .NET 9.0 Desktop Runtime installed
- USB cable for IC-9700 connection
- Icom USB driver (typically installed automatically)

## Part 1: IC-9700 Radio Configuration

### 1.1 CI-V Settings
Access: **Menu > Set > Connectors > CI-V**

| Setting | Value | Description |
|---------|-------|-------------|
| CI-V Address | `94` (hex) / `148` (decimal) | Default address for IC-9700 |
| CI-V Baud Rate | `19200` bps | Recommended for performance |
| CI-V Transceive | `ON` | Allows radio to send status updates |
| CI-V Output | `ON` | Enables CI-V communication |

### 1.2 USB Settings
Access: **Menu > Set > Connectors > USB**

| Setting | Value | Description |
|---------|-------|-------------|
| USB CI-V | `LINK` or `UNLINK TO [A]` | Enables CAT control via USB |
| USB Baud Rate | `19200` | Must match CI-V baud rate |
| USB Echo Back | `OFF` | Prevents communication conflicts |
| USB TO SEND | `1s` or `OFF` | Transmission timeout setting |

### 1.3 Additional Radio Settings
- **Menu > Set > Others > Quick Setup**: Ensure settings don't conflict with CAT control
- **Data Mode**: Configure if using digital modes through CAT

## Part 2: Windows System Setup

### 2.1 Driver Installation
1. Connect IC-9700 to computer via USB
2. Windows should automatically install the Icom USB driver
3. If automatic installation fails, download driver from Icom website

### 2.2 COM Port Identification
1. Open **Device Manager** (Windows key + X, then M)
2. Expand **Ports (COM & LPT)** section
3. Note the COM port number assigned to "Silicon Labs CP210x USB to UART Bridge"
4. Example: `COM3`, `COM4`, etc.

### 2.3 COM Port Verification
Verify the COM port settings match your radio configuration:
- **Baud Rate**: `19200`
- **Data Bits**: `8`
- **Stop Bits**: `1`
- **Parity**: `None`

## Part 3: SkyCATd Configuration

### 3.1 Installation Requirements
- Download SkyCATd from: https://ve3nea.github.io/SkyCAT/
- Ensure .NET 9.0 Desktop Runtime is installed

### 3.2 Command Line Usage

#### Basic Command Structure
```
skycatd.exe -m IC-9700 -r COMx -s baudrate
```

#### Example Commands

**Standard Setup:**
```
skycatd.exe -m IC-9700 -r COM3 -s 19200
```

**With Verbose Logging (recommended for troubleshooting):**
```
skycatd.exe -m IC-9700 -r COM3 -s 19200 -vvv -f
```

**With Custom TCP Port:**
```
skycatd.exe -m IC-9700 -r COM3 -s 19200 -t 4532
```

### 3.3 Command Line Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `-m` | Radio model | `IC-9700` |
| `-r` | COM port | `COM3` |
| `-s` | Baud rate | `19200` |
| `-t` | TCP listening port | `4532` (default) |
| `-vvv` | Verbose logging | N/A |
| `-f` | Log to file | N/A |
| `-d` | Run as daemon/service | N/A |

## Part 4: Testing and Troubleshooting

### 4.1 Initial Connection Test
1. Open Command Prompt as Administrator
2. Navigate to SkyCATd installation directory
3. Run: `skycatd.exe -m IC-9700 -r COM3 -s 19200 -vvv -f`
4. Look for successful connection messages
5. Test by changing frequency on radio - SkyCATd should detect changes

### 4.2 Common Issues and Solutions

#### Issue: "Port in use" or "Access denied"
**Solution:**
- Close any other software using the COM port
- Ensure no other CAT control programs are running
- Try running Command Prompt as Administrator

#### Issue: No communication between radio and software
**Solution:**
1. Verify COM port number in Device Manager
2. Check radio USB settings are correct
3. Try different baud rates (9600, 19200, 115200)
4. Ensure USB cable supports data transfer (not charge-only)

#### Issue: SkyCATd starts but doesn't control radio
**Solution:**
1. Verify CI-V settings on radio
2. Check that USB CI-V is set to LINK
3. Try power cycling the radio
4. Use verbose logging to identify specific errors

### 4.3 Advanced Configuration

#### Protocol Details
The IC-9700 uses Icom's CI-V protocol with these specifications:
- Default CI-V Address: 0x94 (148 decimal)
- Supported baud rates: 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200
- Data format: 8 data bits, 1 stop bit, no parity

#### Radio Definition File
SkyCATd uses a JSON configuration file (`IC-9700.json`) that defines:
- CI-V command codes and response formats
- Supported operating modes (LSB, USB, AM, CW, RTTY, FM, etc.)
- Frequency and mode control sequences
- Split operation handling
- PTT control commands

This file is automatically loaded when using `-m IC-9700` parameter.

## Part 5: Usage Examples

### 5.1 Remote Operation Setup
Once SkyCATd is running, it provides a TCP interface (default port 4532) that other applications can use to control the radio remotely.

### 5.2 Integration with Other Software
SkyCATd can be used with logging software, contest programs, and digital mode applications that support CAT control via TCP/IP.

## Part 6: Reference Information

### 6.1 Supported IC-9700 Features
- Frequency control (VHF/UHF/SHF bands)
- Mode selection
- Split operation
- PTT control
- Memory channel access
- Band switching

### 6.2 Performance Notes
- USB connection recommended over serial for reliability
- 19200 baud provides good balance of speed and reliability
- Higher baud rates (115200) may cause issues with some USB adapters

## Appendix: Quick Reference

### Essential Radio Menu Paths
- CI-V Settings: `Menu > Set > Connectors > CI-V`
- USB Settings: `Menu > Set > Connectors > USB`
- Quick Setup: `Menu > Set > Others > Quick Setup`

### Common Command Examples
```bash
# Basic connection
skycatd.exe -m IC-9700 -r COM3 -s 19200

# With logging for troubleshooting
skycatd.exe -m IC-9700 -r COM3 -s 19200 -vvv -f

# Custom TCP port
skycatd.exe -m IC-9700 -r COM3 -s 19200 -t 8080
```

### Default Values
- CI-V Address: 148 (decimal) / 0x94 (hex)
- Baud Rate: 19200 bps
- TCP Port: 4532
- Data Format: 8N1 (8 data bits, no parity, 1 stop bit)

---

**Note:** Replace `COM3` with your actual COM port number and adjust baud rates as needed for your specific setup.
