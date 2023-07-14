const SibApiV3Sdk = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const resetRequests = require("../model/forgetPasswordRequests");
const User = require("../model/user");

require("dotenv").config();

const sendMail = async (email) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    console.log(apiKey);

    const transEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const user = await User.findOne({ where: { email: email } });
    // console.log(user);
    const sender = {
      email: "ritu.jr1@gmail.com",
    };

    const receivers = [
      {
        email: email,
      },
    ];

    const uuid = uuidv4();

    resetRequests.create({
      id: uuid,
      isActive: true,
      userId: user.id,
    });

    const link = `http://localhost:3000/password/forget-password/${uuid}`;

    const response = await transEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: `Hey {{params.name}}. We made things easy for you`,
      textContent: `Click here to reset your password {{params.link}}`,
      params: {
        link: link,
        name: user.name,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const response = await sendMail(req.body.email);
    res.status(200).json({ success: true, message: response });
  } catch (error) {
    res.status(401).json({ success: false, error: error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const uid = req.params.id;
    const request = await resetRequests.findOne({ where: { id: uid } });
    if (request === null || request.isActive === false) {
      return res.redirect("http://localhost:3000/error");
    }

    return res.redirect(`http://localhost:3000/resetpassword/${uid}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    console.log(req.body);
    const uid = req.params.id;
    const password = req.body.password;
    const request = await resetRequests.findOne({ where: { id: uid } });
    if (request === null || request.isActive === false) {
      throw new Error("Link invalid");
    }
    request.isActive = false;
    request.save();
    //update
    const user = await User.findOne({ where: { id: request.userId } });
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    user.password = hash;
    user.save();
    res
      .status(200)
      .json({ success: true, message: "Password successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
