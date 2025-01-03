import { dashboardModel } from '../models/dashboardModel';

export const addDashboard = async (req, res) => {
  // #swagger.tags = ['dashboard']
  /*  #swagger.parameters['body'] = {
              in: 'body',
              description: 'Add a application',
              schema: {
              popularService:[{ title: '',  image: ''}],
              Vontéllesgotoservices: [{ title: '',  image: ''}],
               GuideToHelp: [{ title: '',  image: ''}],
              madeOnSite: [{image: '', featuredin: '', by: '', id: 1}],           
              }
      } */
  try {
    const user = req.body;

    const newUser = new dashboardModel(user);

    await newUser.save();

    res.json('registered successfully.');
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  // #swagger.tags = ['dashboard']

  try {
    const dahboardData = await dashboardModel.find();

    res.json(dahboardData);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
};
