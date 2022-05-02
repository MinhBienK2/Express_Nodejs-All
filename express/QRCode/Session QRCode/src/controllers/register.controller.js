const catchAsync = require("../utils/catchAsync");
const { StudentInfo } = require("../models");
var QRCode = require("qrcode");

const getRegisterController = catchAsync(async (req, res, next) => {
  res.render("web");
});

const registerController = catchAsync(async (req, res, next) => {
  QRCode.toDataURL(JSON.stringify(req.body), function (err, url) {
    res.status(200).send(
      `
        <div style="display:flex;justify-content: center;">
            <div>
                <img src=${url} alt="">
                <br/>
                <a download=${url} href=${url} title="ImageName">
                    download QR Code
                </a>
            </div>
        </div>
      `
    );
  });
});

module.exports = {
  getRegisterController,
  registerController,
};
