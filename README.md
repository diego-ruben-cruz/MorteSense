<a name="readme-top"></a>

<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->

[![Issues][issues-shield]][issues-url]

<!-- [![MIT License][license-shield]][license-url] -->

<!-- ABOUT THE PROJECT -->

# Technical Documentation


## Project Repository

[Link to MorteSense, Group 28, project repository](https://github.com/diego-ruben-cruz/MorteSense)

<!-- PROJECT LOGO -->
<br />
  <h3 align="center">DIY Security.</h3>
  <h3 align="center">Microwave Motion Detector Sensor</h3>

<p align="center">
  <img src="https://github.com/diego-ruben-cruz/MorteSense/blob/main/frontend/public/logo.png" alt="My Image" width="1000" height="auto">
</p>
  <p align="center">
    <br />
    <br />
    <br />
    <a href="https://youtu.be/-TZKTMkuT48">View Demo</a>
    ·
    <a href="https://github.com/diego-ruben-cruz/MorteSense/issues">Report Bug</a>
    ·
    <a href="https://github.com/diego-ruben-cruz/MorteSense/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <li><a href="#about-the-project">About The Project</a></li>
      <li><a href="#inspiration">Inspiration</a></li>
      <li><a href="#challenges-we-ran-into">Challenges we ran into</a></li>
      <li><a href="#accomplishments-we-are-proud-of">Accomplishments we're proud of</a></li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites-and-installation">Prerequisites and Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#citation">Citation</li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img width="1012" alt="image" src="https://github.com/diego-ruben-cruz/MorteSense/assets/22685770/87117ac6-9d99-415a-bb4e-8ee2301747c8">

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This is the comprehensive project for CMPE 195 at San Jose State University, during 2023. This project is a multi-tiered, end-to-end system comprised of several elements:

- A web-based application enabling customers to oversee their sensor' data
- A MorteSense API responsible for processing requests coming from the client app
- A database designed to maintain records of users and sensors

## Inspiration

- State of the Art: Passive Infrared (PIR) Motion Sensor Systems

## Challenges we ran into

- Power Delivery
- Enclosure Design and Prototyping

## Accomplishments we are proud of

- Learning LaTeX to create the final project report
- Using CAD to design a high-fidelity rendition of microcontroller for reference

## Architecture

<img width="567" alt="image" src="https://github.com/diego-ruben-cruz/MorteSense/assets/22685770/ce273ef4-fefb-475e-800a-c3fdb1f1103f">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites and Installation

#### Hardware

- Raspberry Pi Pico W Microcontroller
- CQRobot 5.8GHz Microwave Motion Sensor
- Red and Green Bulbs
- 100 Ohm Resistors
- Fritzing Circuit Design Software
- Solidworks (or any CAD Program)

#### Backend

- Requirements.txt
- Redis server
- Python Flask
- MySQL
- AWS
- Twilio API

#### Frontend

- NodeJS
- ReactJS
- Tailwind CSS

#### API Tooling

- Postman

  - filename

- AWS RDS connection

1. Command to get into MySQL CLI

```
mysql -h [DATABASE_NAME].[HOST] -P 3306 -u admin -p
```

2. Password to get into MySQL CLI

```
your password
```

#### Installing Dependencies

In the root directory:

Run the following command:

```cmd
npm i
```

In backend folder:

Run the following command using pip:

```cmd
pip3 install -r requirements.txt
```

<!-- USAGE -->

## Usage

**Here is the basic process of running the system**

- Run Redis server with before running `backend`
- Run `backend` with `flask run run --host=0.0.0.0` before running `frontend`
- Run `frontend` with `npm start`

### Test backend API

To test the backend API, the end user can use the json files provided in the `postman` directory.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Project Planning (Spring 2023)

  - [x] Created Project Schedule
  - [x] Created Software Specifications/Requirements Document
  - [x] Created Semi-Formal Project Progress Report
  - [x] Created GANTT Chart for Project Development Progress
  - [x] Peformed basic hardware interfacing and diagnostics

- Released Beta (Summer 2023)

  - [x] Create Initial Pages for web app client
  - [x] Create CAD for Microcontroller
  - [x] Created low-fidelity enclosure (changed because of modified form factor)

- Product Launch (Fall 2023)
  - [x] Test full-fledged prototype
  - [x] Perform final revisions on product
  - [x] Prepare product for public release with Project Report

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Here are some resources we made use of while developing, for those who wish to build on our work:

- [Flask Documentation](https://flask.palletsprojects.com/)
- [ReactJS Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Raspberry Pi Pico W Documentation](https://www.raspberrypi.org/documentation/pico/)
- [Raspberry Pi Pico W SDK](https://github.com/raspberrypi/pico-sdk/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Redis Documentation](https://redis.io/documentation)
- [Axios Documentation](https://axios-http.com/docs/intro)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Citation

```ts
@misc{MorteSense-2023,
  author       = {{S. Abdulkhamidov} and {D. Cruz} and {D. G. Carrasco} and {S. Gevorgyan}},
  title        = {MorteSense: DIY Home Security},
  howpublished = {\url{https://github.com/diego-ruben-cruz/MorteSense}},
  year         = {2023},
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the Apache 2.0 License. See `LICENSE.txt` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/diego-ruben-cruz/readme.svg?style=for-the-badge
[contributors-url]: https://github.com/diego-ruben-cruz/MorteSense/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/diego-ruben-cruz/readme.svg?style=for-the-badge
[forks-url]: https://github.com/diego-ruben-cruz/MorteSense/forks
[stars-shield]: https://img.shields.io/github/stars/diego-ruben-cruz/readme.svg?style=for-the-badge
[stars-url]: https://github.com/diego-ruben-cruz/MorteSense/stargazers
[issues-shield]: https://img.shields.io/github/issues/diego-ruben-cruz/readme.svg?style=for-the-badge
[issues-url]: https://github.com/diego-ruben-cruz/MorteSense/issues
[license-shield]: https://img.shields.io/github/license/diego-ruben-cruz/readme.svg?style=for-the-badge
[license-url]: https://github.com/diego-ruben-cruz/MorteSense/blob/master/LICENSE
