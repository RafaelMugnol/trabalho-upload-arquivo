const Box = require('../models/Box');

class BoxController {
  async store(req, res) {
    let box = await Box.findOne({ title: req.body.title });
    
    if (box == null)
        box = await Box.create({ title: req.body.title });

    return res.json(box);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: {
        sort: { createdAt: -1 }
      }
    });

    return res.json(box);
  }
}

module.exports = new BoxController();
