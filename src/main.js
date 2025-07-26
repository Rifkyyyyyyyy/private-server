import web from './application/web.js';
import { logger } from './application/logger.js';

const PORT = process.env.APP_PORT || 3000;

web.web.listen(PORT, () => {
  logger.info(`✅ Aplikasi berjalan di PORT: ${PORT}`);
});
