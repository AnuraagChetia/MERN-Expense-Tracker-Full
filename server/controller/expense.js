const Expense = require("../model/expense");
const User = require("../model/user");
const sequelize = require("../util/database");
const AWS = require("aws-sdk");

exports.getExpense = async (req, res) => {
  try {
    res.status(200).json(req.results);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postExpense = async (req, res) => {
  const t = await sequelize.transaction();
  const { category, amount, note } = req.body;
  try {
    const response = await Expense.create({
      category: category,
      amount: amount,
      note: note,
      userId: req.user.id,
    });
    const updatedTotalExpense = Number(req.user.totalExpense) + Number(amount);
    User.update(
      { totalExpense: updatedTotalExpense },
      { where: { id: req.user.id } }
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const id = req.params.id;
    const exp = await Expense.findByPk(id);
    if (req.user.id === exp.userId) {
      const result = await exp.destroy({ transaction: t });
      const updatedTotalExpense =
        Number(req.user.totalExpense) - Number(exp.amount);
      User.update(
        { totalExpense: updatedTotalExpense },
        { where: { id: req.user.id }, transaction: t }
      );
      await t.commit();
      res.status(200).json(result);
    }
  } catch (error) {
    await t.rollback();
    res.status(500).json(error);
  }
};

exports.downloadExpense = async (req, res) => {
  if (!req.user.isPremium) {
    try {
      // const expenses = await req.user.getExpenses();
      const expenses = await Expense.findAll({
        where: { userId: req.user.id },
      });
      // console.log(expenses);
      //  file name  //                           //  data    //
      const fileUrl = await uploadToS3(
        `${req.user.id}_${new Date()}_expenses.csv`,
        JSON.stringify(expenses)
      );

      // console.log('fileUrl>>>>>', fileUrl);
      await req.user.createDownload({ file_url: fileUrl });

      res.status(201).json({ fileUrl: fileUrl, success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, status: false });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "user does not have Premium Membership",
    });
  }
};

function uploadToS3(fileName, data) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: "expensebucket77", // pass your bucket name
    Key: fileName, // file will be saved as expensebuclet77/<fileName>
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (s3Err, response) => {
      if (s3Err) {
        reject(s3Err);
      } else {
        // console.log(`File uploaded successfully at ${response.Location}`);
        resolve(response.Location);
      }
    });
  });
}
