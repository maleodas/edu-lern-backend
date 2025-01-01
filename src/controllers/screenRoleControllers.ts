import { screenRoleModel } from '../models/screenRole.model';

export const addRole = async (req, res) => {
  // #swagger.tags = ['screenRole']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
                $name: 'John Doe',
                $code: 'JHON',
                $validFrom: '2024-10-07T06:49:41.988Z',
                $validTill: '2024-10-07T06:49:41.988Z',
                $application: 'https://www.google.com',
                $description: ''
            }
    } */
  try {
    const user = req.body;

    const uModel = new screenRoleModel({
      ...user,
    });
    const newUser = await uModel.save();
    const result = { ...newUser, token: '', message: '' };

    result.message = `registered successfully.`;
    res.json('registered successfully.');
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  // #swagger.tags = ['screenRole']
  try {
    const users = await screenRoleModel.deleteOne({ _id: req.params.id });
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const getAllRole = async (req, res) => {
  // #swagger.tags = ['screenRole']
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
      users = await screenRoleModel
        .find({
          _id: { $gt: id },
        })
        .limit(limit)
        .sort({ createdAt: orderDirection });
    } else {
      users = await screenRoleModel
        .find({})
        .sort({ createdAt: orderDirection })
        .limit(limit);
    }
    const totalItems = await screenRoleModel.countDocuments({});
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

export const updateRole = async (req, res) => {
  // #swagger.tags = ['screenRole']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
                $name: 'John Doe',
                $code: 'JHON',
                $validFrom: '2024-10-07T06:49:41.988Z',
                $validTill: '2024-10-07T06:49:41.988Z',
                $application: 'https://www.google.com',
                $description: ''
            }
    } */
  try {
    const user = await screenRoleModel.findByIdAndUpdate(
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

export const getRoleById = async (req, res) => {
  // #swagger.tags = ['screenRole']
  try {
    const users = await screenRoleModel.findById(req.params.id);
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};
