/**
 * DummyController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  getData: function (req, res) {

    Dummy.find().exec((err, records)=>{
      if (err) {
        sails.log('getData err');
        return res.serverError(err);
      }
      sails.log('Returning dummy records:', records.length);
      return res.json({
        data: records
      });
    });
  },

};
