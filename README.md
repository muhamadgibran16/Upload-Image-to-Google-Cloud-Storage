# Upload Image to Google Cloud Storage

This readme provides an overview and explanation of the code provided. The code is written in JavaScript and is used for handling file uploads to Google Cloud Storage and generating public and private URLs for the uploaded files.

## Prerequisites

Before running the code, ensure that you have the following prerequisites:
```Node.js``` installed on your machine.
```@google-cloud/storage``` package installed.

## Setup

Clone the repository and navigate to the project directory.

Install the required dependencies by running the following command:
```js
  npm install
```
Set up the required environment variables:

```GOOGLE_APPLICATION_CREDENTIALS```: Path to your Google Cloud service account key file.
```GCP_PROJECT_ID```: Google Cloud project ID.

## Code Explanation
The code consists of two main functions: PublicURL and PrivateURL. Let's go through each function and understand what it does.

#### PublicURL
The PublicURL function handles the upload of a file to Google Cloud Storage and generates a public URL for the uploaded file. 

#### PrivateURL
The PrivateURL function handles the upload of a file to Google Cloud Storage and generates a private URL with limited access for the uploaded file.

## Usage
To use the code, you can follow these steps:

Ensure that you have set up the environment variables mentioned in the setup section.
Import the required functions (```PublicURL``` and ```PrivateURL```) into your application.
Invoke the desired function based on your requirements:
```PublicURL```: Pass the request and response objects as parameters.
```PrivateURL```: Pass the request and response objects as parameters.

## Conclusion
This code provides a convenient way to upload files to Google Cloud Storage and generate public or private URLs for the uploaded files. It can be integrated into your ```Node.js``` application to handle file uploads and manage access to the uploaded files.