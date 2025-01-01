import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HASHVALUE, JWT_SECRET } from '../constants/envVariables';
import { sendEmail } from '../function/sendEmail';
import { accessTokenModel } from '../models/accessToken';
import { adminModel } from '../models/admin.model';
import { userModel } from '../models/user.model';

export const signUpAdmin = async (req, res) => {
  // #swagger.tags = ['Admin']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a user',
            schema: {
                $name: 'John Doe',
                $age: 29,
                about: ''
            }
    } */
  try {
    const user = req.body;
    if (!user.email) {
      throw new Error('Email cannot be null or empty');
    }
    const uModel = new adminModel({
      ...user,
      email: user.email?.toLowerCase(),
    });
    const existingUser = await adminModel.findOne({
      email: uModel.email,
    });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const saltRounds = parseFloat(HASHVALUE);
    if (isNaN(saltRounds) || saltRounds <= 0) {
      throw new Error('Salt rounds must be a positive number');
    }

    uModel.password = await bcrypt.hash(uModel.password, saltRounds);
    const newUser = await uModel.save();
    await sendEmail(
      newUser.email,
      'Welcome to Our Service!',
      "Thank you for signing up! We're glad to have you.",
      "<strong>Thank you for signing up! We're glad to have you.</strong>",
    );
    res.json({ message: 'registered successfully.' });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  // #swagger.tags = ['Admin']
  const { email, password } = req.body;

  try {
    const user = await adminModel
      .findOne({
        email: email.trim().toLowerCase(),
      })
      .select('+password')
      .exec();

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Email or password incorrect');
    }

    const login = { user: {}, token: '', message: '', role: 'admin' };
    login.user = { ...user, password: null };
    login.token = await jwt.sign(
      {
        dealerEmailID: user.email,
        id: user._id,
      },
      JWT_SECRET,
    );
    login.message = 'Login Successfully';
    res.json({ token: login.token, message: login.message, role: login.role });

    return login;
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    await adminModel.deleteOne({ _id: req.params.id });
    res.json({ message: 'Deleted Successfully.' });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const getAllAdmin = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const orderDirection = req.query.orderDirection === 'desc' ? -1 : 1;
    const { id } = req.body;
    const limit = req.body.limit ? parseInt(req.body.limit) : 0;
    let users;
    if (id) {
      users = await adminModel
        .find({
          _id: { $gt: id, $ne: req.user.id },
          role: 'admin',
        })
        .limit(limit)
        .sort({ createdAt: orderDirection });
    } else {
      users = await adminModel
        .find({
          role: 'admin',
          _id: { $ne: req.user.id },
        })
        .sort({ createdAt: orderDirection })
        .limit(limit);
    }
    const totalItems = await adminModel.countDocuments({
      role: 'admin',
      _id: { $ne: req.user.id },
    });
    await res.json({
      limit,
      totalPages: Math.ceil(totalItems / limit),
      totalItems: Math.ceil(totalItems),
      users,
    });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const user = await adminModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    if (!user) {
      throw new Error('User can not be updated');
    }

    res.json({
      data: user,
      message: 'Updated Successfully',
    });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const getAdminById = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const users = await adminModel.findById(req.params.id);
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};

export const updatePasswordAdmin = async (req, res) => {
  // #swagger.tags = ['Admin']
  const body = req.body;

  try {
    const data = await adminModel.findById(req.user.id, '+password');

    if (!data) {
      throw new Error('User does not exist.');
    }
    const valid = await bcrypt.compare(body.oldPass, data.password);
    if (!valid) {
      throw new Error('Current Password incorrect');
    }
    const nextPass = await bcrypt.hash(body.newPass, parseFloat(HASHVALUE));

    const updatedUser = await adminModel.findByIdAndUpdate(
      req.user.id,
      { password: nextPass },
      { new: true },
    );
    if (!updatedUser) {
      throw new Error('Error occurred while updating user password');
    }
    res.json({ message: 'Password Updated Successfully.' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    res.status(err.status).json({ message: err.message });
  }
};

export const forgotPasswordAdmin = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const result = {
      token: '',
    };
    result.token = await jwt.sign(
      {
        email: req.body.email,
      },
      JWT_SECRET,
      {
        expiresIn: '2d',
      },
    );

    const userObj = {
      email: req.body.email,
      accessToken: result.token,
    };
    const users = await accessTokenModel.create(userObj);
    if (!users) {
      throw new Error('Access Token can not be created');
    }

    await sendEmail(
      req.body.email,
      'Password Recovery ✔', // Subject line
      'This is a password recovery mail', // plain text body
      `<b>This is a password recovery mail</b><br>Click here to change password.<br>${
        req.body.url
      }?${result.token}`,
    );

    // const info = await transporter.sendMail(obj);
    // if (info) {
    res.json(`Recovery Mail sent to ${req.body.email}`);
    // } else {
    //   throw new Error(`Error occurred while sending mail ${info}`);
    // }
  } catch (err) {
    console.error(err);
    res.json(err);

    throw err;
  }
};

export const updateForgotPasswordAdmin = async (req, res) => {
  // #swagger.tags = ['Admin']

  const body = req.body;

  try {
    let data = await accessTokenModel.findOne({
      accessToken: req.query.token,
    });
    data = JSON.parse(JSON.stringify(data));
    if (!data) {
      throw new Error('Access Token has been expired');
    }
    const user = await adminModel.findOne({ userId: data.userId });

    if (!user) {
      throw new Error('User Does not exist.');
    }

    const nextPass = await bcrypt.hash(body.newPass, parseFloat(HASHVALUE));

    const updatedUser = await adminModel.findByIdAndUpdate(
      user.id,
      { password: nextPass },
      { new: true },
    );
    if (!updatedUser) {
      throw new Error('Error occurred while updating user password');
    }
    res.json({ message: 'Password Updated Successfully.' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    res.status(err.status).json({ message: err.message });
  }
};

export const requestApproval = async (req, res) => {
  // #swagger.tags = ['Admin']
  const body = req.body;

  try {
    const data = await userModel.findById(req.params.id, '+request');
    if (!data) {
      throw new Error('User does not exist.');
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { request: body.request },
      { new: true },
    );
    if (!updatedUser) {
      throw new Error('Error occurred while updating user password');
    }
    res.json({ message: 'request Updated Successfully.' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    res.status(err.status).json({ message: err.message });
  }
};

export const getAllAdminName = async (req, res) => {
  try {
    const users = await adminModel.find();
    const totalItems = await adminModel.countDocuments({});
    await res.json({
      totalItems: Math.ceil(totalItems),
      data: users.map(user => {
        const obj = { name: user.name, id: user.id };
        return obj;
      }),
    });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};
