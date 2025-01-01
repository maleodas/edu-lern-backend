import { permissionModel } from '../models/screenPermission.model';

export const addPermission = async (req, res) => {
  // #swagger.tags = ['Permission']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
                $name: 'John Doe',
                $key: 'JHON',
                $validFrom: '2024-10-07T06:49:41.988Z',
                $validTill: '2024-10-07T06:49:41.988Z',
                $application: 'https://www.google.com',
                $description: ''
            }
    } */
  try {
    const user = req.body;

    const uModel = new permissionModel({
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

export const deletePermission = async (req, res) => {
  // #swagger.tags = ['Permission']
  try {
    const users = await permissionModel.deleteOne({ _id: req.params.id });
    const result = { ...users, token: '', message: '' };
    result.message = `deleted successfully.`;
    res.json(result.message);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const getAllPermission = async (req, res) => {
  // #swagger.tags = ['Permission']
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
      users = await permissionModel
        .find({
          _id: { $gt: id },
        })
        .limit(limit)
        .sort({ createdAt: orderDirection });
    } else {
      users = await permissionModel
        .find({})
        .sort({ createdAt: orderDirection })
        .limit(limit);
    }
    const totalItems = await permissionModel.countDocuments({});
    await res.json({
      limit,
      totalPages: Math.ceil(totalItems / limit),
      totalItems: Math.ceil(totalItems),
      data: users,
    });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const updatePermission = async (req, res) => {
  // #swagger.tags = ['Permission']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add a application',
            schema: {
                $name: 'John Doe',
                $key: 'JHON',
                $validFrom: '2024-10-07T06:49:41.988Z',
                $validTill: '2024-10-07T06:49:41.988Z',
                $application: 'https://www.google.com',
                $description: ''
            }
    } */
  try {
    const user = await permissionModel.findByIdAndUpdate(
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

export const getPermissionById = async (req, res) => {
  // #swagger.tags = ['Permission']
  try {
    const users = await permissionModel.findById(req.params.id);
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};
