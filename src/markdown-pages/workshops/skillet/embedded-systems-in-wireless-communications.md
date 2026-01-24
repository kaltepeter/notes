---
title: "Advanced Electricity: Embedded Systems in Wireless Communications"
date: 2026-01-24
tags:
  - course
  - skillet
  - electronics
---

https://skillet.academy/courses/hands-on-electronics/lectures/56567662

## Microcontrollers (MCUs)

Microcontrollers are compact integrated circuits designed to perform specific control functions in embedded systems

- CPU: central processing unit for executing instructions
- Memory: includes both RAM and ROM/Flash (permenant storage)
- I/O Ports: input/output interfaces for connecting sensors, actuators, and other peripherals
- Timers and counters: for precise control of operations.
- Applications
  - Consumer electronics: remote controls, microwave ovens, washing machines
  - automotive: engine control units, airbag systems, and infotainment
  - industrial applications, PLCs, robotic controls and sensors

## Microprocessors

Microprocessors are central processing units (CPUs) used in general purpose computing systesm, capable of executing a wide range of tasks.

- CPU: powerful processing unit with multiple cores
- Cache memory: high-speed memory for rapid data access
- Control unit: manages data flow and instructions
- arithmetic logic unit (ALU): performs arithmetic and logical operations

|                                  | Microcontrollers                                                                                 | Microprocessors                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Integration                      | Integrate CPU, memory and I/O ports on a single chip, disigned for specific control applications | Primarily consist of a CPU, requiring external components (memory, I/O) for full functionality, designed for general purpose computing |
| Applications                     | Used in embeedded systems for dedicated tasks (e.g. applicances, automotive systems)             | Used in complex computing systems for a wide range of tasks (e.g. PCs, sensors)                                                        |
| Complexity and Power Consumption | Simpler, lower power consumption, and optimized for control tasks                                | More complex, higher consumption, and designed for computing tasks                                                                     |

## Programming Microcontrollers and Microprocessors

### Microcontrollers

- Dev environments: often programmed using integrated development environments (IDEs) like Arduino IDE, MPLAB (for PC), or Atmel Studio (for AVR)
- Languages: commonly used languages like C, C++, and assembly language
- Tools: require specific tools such as compilers, debuggers, and programmers (e.g. USB to serial converters) to upload code
- Application Focus: programs are typically optimized for specific task and real-time operations, such as sensor data processing, motor control, and user interface handling.

## Microprocessors

- Dev environment: programmmed using advanced IDEs like Visual Studio, Eclipse, or command-line tools for compiling and debugging
- Languages: use higher-level languages like Python, Java, C++, and assembly for system-level programming
- Tools: require extensive toolchains including compilers, linkers, debuggers, and often rely on operating systems (e.g. linux, windows) for development
- Application focus: programs are designed for a wide range of applications from operating systems and application software to complex algorithms and user application

## Embedded Systems

Embedded systems are specialized computing systems that perform dedicated functions or tasks within a larger system. They are designed to be highly efficient and reliable.

- Microcontroller/microprocessor: acts as the brain of the system, executingt the programmed tasks
- Memory: includes RAM (temporary storage) and ROM/Flash (for permenant storage of the firmware)
- Input/Output interfaces: connect to sensors, actuators, and other peripherals to interact with the external environment
- Power supply: provides the necessary power for the system's operation
- Applications
    - Automotive: engine control units, airbag systems, and infotainment systems
    - Consumer electronics: smart home devices, wearable technology, and household appliances
    - Industrial automation: robotics, programmable logic controllers (PLCs), and monitoring systems
    - Healthcare: medical devices such as heart rate monitors, MRI machines, and infusion pumps
- Characteristics
    - Real-time operation: capable of performing tasks within strict timing constraints
    - Reliability: designed for high reliability and stability, often operating continous for extended periods
    - Resource-constrained: optimized for limited resources (memory, processing power, and power consumption)

## Wireless Communication

Wireless communication involves transmitting data or information without the need for physical connections, using electromagntic waves

- Transmitter: converts and sends data as electromagnetic signals
- Reciever: captures and converts signals back into data
- Medium: the space or spectrum through which signals travel, such as air or vacuum
- types
    - radio frequency (RF): use radio waves for communication
    - infrared (IR): uses infrared light for short-range communication
    - microwave: uses high-frequency waves for long-distance and high-capacity communication
- Applications
    - mobile phones, wireless internet (Wi-Fi), bluetooth devices, and sc communication

## WiFi

Wi-Fi (Wireless Fidelity) is a wireless networking technology that allows devices to connect to the internet and communicate over a wireless signal

- Fequency bands: operates mainly in the 2.4 GHz and 5 GHz bands
    - 2.4 can go through walls, etc, has interference issues
    - 5 is short range and less susceptible to interference
- Standards: Governed by iEEE 802.11 standards (e.g. 802.11a/b/g/n/ax)
- Range: typical indoor range is up to 150 ft (45 meters), outdoor range up to 300 feet (90 meters)
- Benefits
    - Convenience: enables mobility and eliminates the need for cables
    - Speed: high-speed data transfer suitable for internet browsing, streaming, and gaming
    - Compatibility: widely supported by various devices like smartphones, laptops, and smart home devices

## Bluetooth

Bluetooth is a wireless technology standard for exchanging data over short distances using UHF radio waves in the ISM bands, from 2.4 to 2.485 GHz

- Short range: typically up to 30 feet (10 meters), ideal for personal area networks (PANs)
- Low power consumption: designed to conserve battery life, making it suitable for portable devices
- Profiles: supports various profiles for different types of communicastion, such as audio (A2DP), file transfer (FTP), and human interface devices (HID)
- Applications
    - audio devices: wireless headphones, speakers, and hands-free headsets
    - peripheral devices: keyboards, mice, and game controllers
    - data transfer: between mobile devices, like smartphones and tablets

## Radio Waves

RF refers to the use of electromagnetic waves in the frequency range of 3 KHz to 300 GHz to transmit data wirelessly

- Wide range: capable of long-distance communication, from a few meters to thousands of kilometers
- Versatility: used in various applications including broadcasting, communication, and radar systems
- Fequency bands: different applications use different frequency bands (, AM/FM radio, TV broadcasting, cellular networks)
- Examples:
    - Broadcasting: AM/FM radio, television signals
    - Communication: mobile phone networks, walkie-talkies, Wi-Fi
    - Control systems: remote controls, garage door openers, and wireless sensor networks

## Internet of Things

The Internet of Things (IoT) is a network of interconnected physical devices that can collect, exchange, and act on data via the internet

- key components: include sensors/actuators, connectivity (Wi-Fi, Bluetooth, celluar), data processing, and user interfaces
- applications: found in smart homes, healthcare, industrial automation, and smart cities, enhancing automation, efficeincy, and decision making
- smart thermostats: automatically adjust heating and cooling based on user preferences and occupancy
- connected lighting: lights that can be controlled remotely or automated based on presence and schedules
- home security systems: cameras, sensors, and alarms that can be monitored and controlled via smartphone apps
- wearable health monitors: devices that track vital signs like heart rate, blood pressure, and sleep patterns, transmitting data to healthcare providers
- remote patient monitoring: sensors and devices that allow doctors to monitor patients health conditions from a distance
- smart medication dispensers: automated devices that dispense medication and remind patients to take their doses

## Robotics

Robotics involves the creation and use of robots-automated machines capable of performing tasks traditionally done by humans.

- Sensors and actuators: gather information and enable movement
- control systems: process data and control robot actions
- Applications
    - Manufacturing, Healthcare, Service Industry: from industrial assembly lines to surgical robotsw and robotic vacuum cleaners
- Sense, compute, do
- Domestic robots: devices like vacuum cleaners (e.g. Roomba) that automate household chores
- Robotic waiters: used in restaurants to serve food and drinks, enhancing customer service
- Customer service robots: deployed in retail environments to assist customers with information and product selection