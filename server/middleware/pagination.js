const Expense = require("../model/expense");

const pagination = async (req, res, next) => {
  try {
    console.log(req.query.limit);
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < expenses.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    const totalPage = Math.ceil(expenses.length / 5);
    let totalPages = [];
    for (let index = 1; index <= totalPage; index++) {
      totalPages.push(index);
    }
    results.totalPages = totalPages;
    results.expenses = expenses.slice(startIndex, endIndex);
    req.results = results;
    next();
  } catch (error) {
    res.status(500).json({ success: fail, error: error });
  }
};

module.exports = pagination;
