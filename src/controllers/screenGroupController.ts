import { screenGroupModel } from '../models/screenGroups.models';

export const addGroup = async (req, res) => {
  // #swagger.tags = ['screenGroup']
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

    const uModel = new screenGroupModel({
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

export const deleteGroup = async (req, res) => {
  // #swagger.tags = ['screenGroup']
  try {
    const users = await screenGroupModel.deleteOne({ _id: req.params.id });
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    res.status(error.status).json({ message: error.message });
  }
};

export const getAllGroup = async (req, res) => {
  // #swagger.tags = ['screenGroup']
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
      users = await screenGroupModel
        .find({
          _id: { $gt: id },
        })
        .limit(limit)
        .sort({ createdAt: orderDirection });
    } else {
      users = await screenGroupModel
        .find({})
        .sort({ createdAt: orderDirection })
        .limit(limit);
    }
    const totalItems = await screenGroupModel.countDocuments({});
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

export const updateGroup = async (req, res) => {
  // #swagger.tags = ['screenGroup']
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
    const user = await screenGroupModel.findByIdAndUpdate(
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

export const getGroupById = async (req, res) => {
  // #swagger.tags = ['screenGroup']
  try {
    const users = await screenGroupModel.findById(req.params.id);
    res.json(users);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};
