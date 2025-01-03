import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HASHVALUE, JWT_SECRET } from '../constants/envVariables';
import { sendEmail } from '../function/sendEmail';
import { accessTokenModel } from '../models/accessToken';
import { userModel } from '../models/user.model';

export const signUpUser = async (req, res) => {
  // #swagger.tags = ['User']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
              fullName: '',
              userName: '',
              email: '',
              password: '',
              role: '',
            }
    } */
  try {
    const user = req.body;
    if (!user.email) {
      throw new Error('Email cannot be null or empty');
    }
    const uModel = new userModel({
      ...user,
      email: user.email?.toLowerCase(),
    });
    const existingUser = await userModel.findOne({
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

    const result = { ...newUser, token: '', message: '' };

    result.message = `registered successfully.`;
    res.json(result.message);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  // #swagger.tags = ['User']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
                $email: 'kKfDx@example.com',
                $password: 'JHON',
            }
    } */
  const data = req.body;
  try {
    const uModel = new userModel(data);
    uModel.email = uModel.email.toLowerCase();
    const user = await userModel
      .findOne({
        email: uModel.email,
      })
      .select('+password')
      .exec();

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    const valid = await bcrypt.compare(uModel.password, user.password);
    if (!valid) {
      throw new Error('Email or password incorrect');
    }

    const login = { user: {}, token: '', message: '', role: 'user' };
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

export const deleteUser = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const users = await userModel.deleteOne({ _id: req.params.id });
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  // #swagger.tags = ['User']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a user',
            schema: {
                $limit: 10,
                $id: '',
            }
    } */
  try {
    const orderDirection = req.query.orderDirection === 'desc' ? -1 : 1;
    const { id } = req.body;
    const limit = req.body.limit ? parseInt(req.body.limit) : 0;
    let users;
    if (id) {
      users = await userModel
        .find({ _id: { $gt: id, $ne: req.user.id } })
        .limit(limit)
        .sort({ createdAt: orderDirection });
    } else {
      users = await userModel
        .find({ _id: { $ne: req.user.id } })
        .sort({ createdAt: orderDirection })
        .limit(limit);
    }
    const totalItems = await userModel.countDocuments({
      role: 'user',
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

export const updateUser = async (req, res) => {
  // #swagger.tags = ['User']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
              fullName: '',
              userName: '',
              email: '',
              password: '',
              role: '',
            }
    } */
  try {
    const user = await userModel.findByIdAndUpdate(
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

export const getUserById = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const users = await userModel.findById(req.params.id);
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};

export const updatePasswordUser = async (req, res) => {
  // #swagger.tags = ['User']
  const body = req.body;

  try {
    const data = await userModel.findById(req.user.id, '+password');

    if (!data) {
      throw new Error('User does not exist.');
    }
    const valid = await bcrypt.compare(body.oldPass, data.password);
    if (!valid) {
      throw new Error('Password incorrect');
    }
    const nextPass = await bcrypt.hash(body.newPass, parseFloat(HASHVALUE));

    const updatedUser = await userModel.findByIdAndUpdate(
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

export const forgotPasswordUser = async (req, res) => {
  // #swagger.tags = ['User']
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
      }/${result.token}`,
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

export const updateForgotPasswordUser = async (req, res) => {
  // #swagger.tags = ['User']

  const body = req.body;

  try {
    let data = await accessTokenModel.findOne({
      accessToken: req.query.token,
    });
    data = JSON.parse(JSON.stringify(data));
    if (!data) {
      throw new Error('Access Token has been expired');
    }
    const user = await userModel.findOne({ userId: data.userId });

    if (!user) {
      throw new Error('User Does not exist.');
    }

    const nextPass = await bcrypt.hash(body.newPass, parseFloat(HASHVALUE));

    const updatedUser = await userModel.findByIdAndUpdate(
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
