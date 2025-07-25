const ping = async (req, res, next) => {
    try {
      const healthcheck = {
        status: 'OK',
        message: 'PONG',
        uptime: process.uptime(),
        responTime : process.hrtime(), 
        timestamp: new Date().toISOString()
      };
  
      res.status(200).json(healthcheck);
    } catch (error) {
      next(error);
    }
  };
  
  export default {
    ping
  };
  