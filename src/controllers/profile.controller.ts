import { Request, Response } from 'express';
import {Profile}  from '../models/profile.model';

class ProfileController {
  static async getAllProfiles(req: Request, res: Response): Promise<Response> {
    try {
      const profiles = await Profile.findAll();

      return res.status(200).json(profiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      return res.status(500).json({ message: 'Error fetching profiles' });
    }
  }
}

export default ProfileController;
