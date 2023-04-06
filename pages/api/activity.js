import { access } from 'fs';
import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  try {
    const query = `SELECT a.*, u.* FROM activity_log a JOIN users u ON a.user_id = u.id`;
    const log = await executeQuery({ query });
    const activityLog = JSON.parse(log)
    res.json(activityLog).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
