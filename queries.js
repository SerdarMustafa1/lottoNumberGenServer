const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'serdarmustafa',
  host: 'localhost',
  database: 'kanban',
  password: '',
  port: 5432
});

const getPlans = (request, response) => {
  pool.query(
    'SELECT * FROM plans ORDER BY project_id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// const getPlanById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("SELECT * FROM plans WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

const createPlan = (request, response) => {
  console.log(request.body);
  const planID = request.body.planID;
  const planName = request.body.planName;
  const barColor = request.body.barColor;
  const checkbox_state = true;
  pool.query(
    'INSERT INTO plans (plan_id, plan_name, bar_color, checkbox_state) VALUES ($1, $2, $3, $4)',
    [planID, planName, barColor, checkbox_state],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response.status(201).send(`Plan added with ID: ${results.insertId}`);
    }
  );
};

const updatePlan = (request, response) => {
  //const id = parseInt(request.params.id);
  const { plan_id, plan_name, bar_color, checkbox_state } = request.body;

  pool.query(
    'UPDATE plans SET plan_name = $1, plan_id = $2 WHERE id = $3',
    [plan_id, plan_name, bar_color, checkbox_state],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Plan modified with ID: ${id}`);
    }
  );
};

// const deletePlan = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("DELETE FROM Plans WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`Plan deleted with ID: ${id}`);
//   });
// };

module.exports = {
  getPlans,
  createPlan,
  updatePlan
  //deletePlan
};
