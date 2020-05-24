/**
 * Usage:
 *
 * ```
 * res.emailAddressInUse();
 * ```
 *
 */

module.exports = function emailAddressInUse (){

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  return res.status(409).send('Email address is already taken by another user.');
};