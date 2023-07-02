const { Storage } = require('@google-cloud/storage')
const { Users } = require('../models/model')

/** Configuration to Google Cloud Storage */
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GCP_PROJECT_ID,
})

/** Set up bucket name */
const bucket = storage.bucket('ember-user') // replace with your bucket name

/** Public URL */
const PublicURL = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Please upload a file!',
      })
    }
    const folder = 'userprofile'
    const filename = `${folder}/${req.uid}/${req.file.originalname}`
    const blob = bucket.file(filename)
    const blobStream = blob.createWriteStream()

    blobStream.on('error', (err) => {
      res.status(500).json({
        message: err.message,
      })
    })
    const publicUrl = new URL(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
    blobStream.on('finish', async () => {
      await blob.makePublic()
      try {
        console.log('User => ', Users)
        await Users.update({
          photo: publicUrl.toString()
        }, {
          where: {
            uid: req.uid
          }
        })
        res.status(200).json({
          success: true,
          message: 'File uploaded successfully and URL is inserted into the database!',
          image: filename,
          url: publicUrl,
        })
      } catch (err) {
        console.log(err)
        res.status(500).json({
          message: 'File uploaded successfully, but URL is not inserted into the database!',
          image: filename,
          url: publicUrl,
        })
      }
    })
    blobStream.end(req.file.buffer)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: `Could not upload the file. ${err}`,
    })
  }
}

/** Private URL */
const PrivateURL = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      message: 'Please upload a file!',
    })
  }
  const folder = 'userprofile'
  const filename = `${folder}/${req.uid}/${req.file.originalname}`
  const blob = bucket.file(filename)
  const blobStream = blob.createWriteStream()
  try {
    blobStream.on('error', (err) => {
      res.status(500).json({
        message: err.message,
      })
    })
    blobStream.on('finish', async () => {
      const expirationDate = new Date()
      expirationDate.setFullYear(expirationDate.getFullYear() + 5) // expire after 5 years

      const config = {
        action: 'read',
        expires: expirationDate,
      };

      const [privateUrl] = await blob.getSignedUrl(config)

      res.status(200).json({
        success: true,
        message: 'Image Upload Successfully!',
        image: filename,
        url: privateUrl,
      })
    })
    blobStream.end(req.file.buffer)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: `Could not upload the file. ${err}`,
    })
  }
}

module.exports = {
  PublicURL,
  PrivateURL
}