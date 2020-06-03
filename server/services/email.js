const mail = require("../config/mail");

const send = async ({ to, from, subject, text, html }) => {
  const msg = { to, from, subject, text, html };
  await mail.send(msg);
};

const sendResetPasswordLink = async ({ to, from, url: { link, time } }) => {
  const subject = " Reset Password Link";
  const html = `<p>Reset link will expire in ${time}. <a href="${link}">Reset Link</a></p>`;
  const email = { to, from, subject, html };
  await send(email);
};

module.exports = {
  send,
  sendResetPasswordLink,
};
