const sgMail = require("@sendgrid/mail");
const config = require("../config");

sgMail.setApiKey(config.SENDGRID_API_KEY);

module.exports = sgMail;
