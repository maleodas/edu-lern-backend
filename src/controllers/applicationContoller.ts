import { applicationModel } from '../models/application.models';

export const addApplication = async (req, res) => {
  // #swagger.tags = ['Applications']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
                $name: 'John Doe',
                $key: 'KLSDJFKJDSI123JNJKN12J3NI',
                $status: true,
                $admin: ['id'],
                $redirectUrl: ['https://www.google.com'],
                $description: ''
            }
    } */
  try {
    const user = req.body;

    const uModel = new applicationModel({
      ...user,
    });
    const newUser = await uModel.save();
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

export const deleteApplication = async (req, res) => {
  // #swagger.tags = ['Applications']
  try {
    const users = await applicationModel.deleteOne({ _id: req.params.id });
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const getAllApplication = async (req, res) => {
  // #swagger.tags = ['Applications']
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
      users = await applicationModel
        .find({
          _id: { $gt: id },
        })
        .limit(limit)
        .sort({ createdAt: orderDirection });
    } else {
      users = await applicationModel
        .find({})
        .sort({ createdAt: orderDirection })
        .limit(limit);
    }
    const totalItems = await applicationModel.countDocuments({});
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

export const updateApplication = async (req, res) => {
  // #swagger.tags = ['Applications']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
                $name: 'John Doe',
                $key: 'KLSDJFKJDSI123JNJKN12J3NI',
                $status: true,
                $admin: ['id'],
                $redirectUrl: ['https://www.google.com'],
                $description: ''
            }
    } */
  try {
    const user = await applicationModel.findByIdAndUpdate(
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

export const getApplicationById = async (req, res) => {
  // #swagger.tags = ['Applications']
  try {
    const users = await applicationModel.findById(req.params.id);
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};
