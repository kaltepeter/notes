---
title: "CompTIA Network+ Certification Bundle"
date: 2025-09-07
tags:
  - networking
  - comptia
---

https://mammothclub.com/course-learn/definitive-comptia-network-certification-n10-009-bundle-20-with-10-practice-exams-1/13287-01-01-01-introduction-to-networking

## Communication Types

- unicast (email)
- broadcast (video stream)
- multicast 

## Network Models and Topologies

- OSI model: theroetical framework developed by ISO, dividing into 7 layers
    - Physical layer - transmission and reception over a physcial medium 
    - Data link layer - provides error detection and correction
    - Network layer - manages routing and forwarding packets between devices across different networks
    - Transport layer - end to end communication, reliability, and error recovery between devices
    - session layer - manages and establishes sessions or connections of applications between different devices
    - presentation layer - translate data between application and lower layers ensuring compatibility
    - application layer - provides network services directly to end users or applications, ftp or email
- TCP/ICP (Transmission Control Protocol)
    - link layer - equivelent to physical and data link layers
    - internet layer - equivelent to OSI network layer
    - transport layer - similar to OSI transport layer
    - application layer - similar to session, presentation, and application layers in OSI models

### Workgroup

- peer-to-peer networking
- decentralized management
- ease of setup

### Domain

- A network conrfiguration characerized by a centralizxed server that manages user authernication, access control and resource sharing.
- Scalability

### Netork Topologies

Referws to the phisical and logical layout of devices and the way they are interconnected

Physical

- Bus topology - datga travels along a bus and all devices read the data
    - single comm line
    - simple structure
    - shared comm medium
    - ethernet technology
- Star topology - all devices connect to a central hub or switch. e.g. home wifi
    - centralizxed hub or switch
    - easy management
    - scalability
    - dependence of central hub
- Ring topology - All connected in a closed loop. Data moves from one to another.
    - Closed loop, circular
    - data flows in one direction
    - fault tollerance challenges
    - simple structure
- Mesh topology - Devices are connected with multiple paths, if one fails, another will work
    - redundency
    - scalability

Logical

Are connected with how data appears to flow within the network, irrespective of the physcial layout

- Bus 
- star 
- ring
- mesh

Wireless

- Infrastructure mode
- Ad-hoc mode
- mesh topology (wireless mesh)

## Network Components

Hardware

- Router 
    - connects different networks
    - makes decisions based on the address of the data
- Switches
    - Function within a local area network
    - Manage the flow of data within a specific network
- Network Cables
    - Establish phsical connections in a network
    - Quality and type inpacts the speed and reliability of data transmission
- Nodes
    - Devices within a network
    - They can send and receive data within a network

Software

- Operating System (OS)
    - Manages computer hardware and provides services for computer programs
    - Acts as intermediary between users and computer hardware
- Web browsers
    - Allow users to access and interact with the world wide web
    - Interpret and display web pages
- Database Management Systems (DBMS)
    - Manage and organize data in databases
    - MySQL, Oracle, Postgres

Network Services

Invisible architects and traffic mangers ensuring that this flow is efficient, secure, and well coodrinated.

- Communication Services 
    - TCP
    - IP
- Security Services 
    - Firewalls
    - Intrusion Detection Systems (IDS)
    - Encryption protocols
- Management Services
    - Simple network management protocol (SNMP)

## Standards

A set of rules, specifications, or guidelines that define how components of a network should operate.

- Consistency
- Interoperability
- Scalability
- Security - SSL, TLS
- Facilitating innovation - baseline to build on

Examples

- Ethernet
- Wi-Fi (IEE 802.11)
- TCP/IP
- HTTP and HTTPS

Standards Ogranizations

Entities that develop and establish guidelines, rules, and specifications to ensure interoperability, compatability, and reliability of network technologies. 

- International Organization for Standardization (ISO)
- Institute of Electrical and Electronics Engineers (IEEE)
- Internet Engineering Task Force (IETF)
- International Telecommunication Union (ITU)
- Electronic Industries Alliance (EIA)

IEEE Network Standards

Plays a pivotal role in developing and maintaining standards for various technologies, including those related to computer networking.

- IEEE 802 family
    - IEEE 802.3 - ethernet
    - IEEE 802.11 - Wi-Fi
        - 802.11a, 802.11b, 802.11g, 802.11n, 802.11ac, etc.
    - IEEE 802.1Q - Virtual LANs (VLANs)
    - IEEE 802.15 - Wireless Personal Area Network (WPANs), bluetooth, zigbee
    - IEEE 802.16 - WiMAX - wireless over long distance

## 10Base Standards

Series of networking standards used in ethernet networks

- "10" indicates a network speed of 10 megabits per second
- "Base" represents the type of cabling used in the network

### 10Base-2 (Thinnet)

- Bus topology
- Thin coaxial cable
- 185 meters segment length
- 30 nodes per segment
- Baseband (Digital signaling) 

### 10Base-5 (Thicknet)

- Bus topology
- Thick coaxial cable (RG-8)
- 500 meters
- 100 nodes per segment
- Baseband
- More challenging to install due to thickness

### 10Base-T

- Star topology
- Twisted pair (Category 3 or higher)
- 100 meters segment length
- 2 nodes per segment (point-to-point connection)
- Baseband

### 10Base-F (Fiber Optic)

- Star topology
- Twisted pair (Category 3 or higher)
- 100 meters segment length
- 2 nodes per segment (point-to-point connection)
- Baseband

## Ethernet

- Widely used networking technology that defines the physical and data link layers of the OSI model. 
- Provides a standard for connecting computers and devices on a local area network
- Simple, scalable, and versitile
- CSMA/CD Protocol - stops collisions, uses backoffs 
- Frame structure - discrete units. Source, dest, ac addresses, data payload, error chekcing bits, etc.
- Data rate and media types - 10/100/1000mbps

### Ethernet Frames

- fundamental units of data transmission in ethernet networks
- Encapsulates the data to be transmitted, along with the essential control information

### Components of Ethernet Frame

- Preamble, alternating 1 and 0 at the beginning for synchronizing with the bit stream
- Start Frame Delimiter (SFD), marks the end of the preamble and beginning of the frame
- Destination and Source MAC Addresses, identifies the sender and receiver
- Lenght/Type field, indicates length of data or type of protocol
- Data payload, info transmitted
- Frame Check Sequence (FCS), allows for error checking

Variations: Ethernet II Frame (DIX Ethernet) and 802.3 Frame (IEEE Ethernet)

## MAC Addresses

Media Access Controller

A hardware address associated with the physcial network interface of a device. 

Format

- 48-bit alphanumeric value
- Represented as six groups of two hexadecimal digits separated by colons
- First half/24 bits usually identifies the manufacturer
- E.g. 00:1A:2B:3C:4D:5E

Uniqueness

- 2^48 possible combinations
- Two devices rarely have the same MAC address
- Ensures that each device on a network can be reliably identified

Function

- Devices on a local network use the MAC address to communicate on the same subnet

Mac Addresses and Switching

Enables switches to forward data only to the port where the recipient device is connected, reducing uneccsary traffic

- LAN communication
- Switching in Action
- Changing MAC Addresses. Some allow changes for privacy and security. 

## Access Methods

Refer to the set of rules and protocols that govern how network devices, particularly computers, gain access to the network medium for transmitting data. 

- Efficient resource utilization
- Fairness
- Minimization of collisions

Common Access Methods

- Carrier sense multiple access with collision detection (CSMA, CD). common in ethernet, 10Base-T
- Carrier sense multiple access with collision avoidance (CSMA/CA). Wireless. Devices send channel before transmission and use methods to avoid collisions. Detecting is more challenging.
- Token passing. Special data packet circulates the network, only the device with the token can transmit data. Token ring network.
- Polling. Central controller polls and allows transmissions. Legacy.

## OSI Reference Model (OSI/RM)

- Developed by ISO
- 7 layers

Upper Layers

- Application, presentation, and session are primarily concerned with user experience.

Lower Layers

- Physical layer, Data link layer, Network layer.

## Network Communication

- Protocols
- Data Transmission
- Devices
- Media
- Topologies
- Addressing
- Routing

### Cabling

- Ethernet cables
    - Twisted pair
        - UTP (Unshielded Twisted Pair)
        - STP (Shielded Twisted Pair), extra shielding to prevent Electromagnetic Interference
        - Cat 5e. Up to 1g / sec
        - Cat 6
        - Cat 6a. 10g/sec or more
        - Cat 7
- Fiber Optic. Uses light
    - Single mode. Longer distances
    - Multi mode. Best for shorter distance
    - LC,SC,ST,MTP/MPO are different types of connectors. Differ in size and simplicity.
- Coaxial cables. 
    - Cable
    - CAT TV

### Connectors

- RJ45 Connector: Standard for ethernet, 8 pins.  
- Fiber Optic Connectors: Lucent Connector (LC), Subscriber Connector (SC), and Straight Tip (ST)
- BNC Connectors: Used for coaxial, especially older ones in a T connector configuration
- USB (Universal Serial Bus) Connector. Commonly used to connect devices and networking equipment. USB A, USB B, USB C
- MTP / MPO : fiber lines, connected in single connector
- Modular: phone and data. RJ45. RJ11. 

### Transmission Methods

Serial vs. Parallel
- serial: bit transmission, pathway, speed, applications. 
    - 1 bit at a time
    - single path
    - slower
    - Better for long distance, fewer wires, simplicity, less prone to interference.
- parallel: cabling consumption, speed advantages and disadvantages. 
    - multiple bits over channels at once
    - can send and receive concurrently
    - faster transfer
    - short distance using parallel bus
    - cabling consumption requires extra wires
    - high speed
    - several bits processed at once
    - complex
    - signal interference

Baseband vs. Broadband
- baseband. 
    - digital signal. 
    - full bandwidth, uses entire channel for single signal
    - localized, short distance
    - ethernet
    - simple, low interference
    - signal loss means long distances don't work, one signal at a time
- broadband. 
    - modulated analog signal. 
    - numerous frequency ranges for bandwidth
    - simutaneous transmission of multiple signals
    - voice, video, and data over the same channel
    - cable tv uses broadband
    - high data speed, numerous signals at once
    - complexity, interference risk

