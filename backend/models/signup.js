const User = require('./user')

app.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user (replace with your database logic)
      // const newUser = new User({ name, email, password, role });
      const newUser = await User.create({
        name,
        email,
        password,
        role,
      });
      newUser.save();
  
      res.status(201).json({ message: 'Signup successful', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Signup failed', error });
    }
  });
  