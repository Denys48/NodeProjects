const os = require('node:os');

const getSystemInfo = () => {
    const freeMemory = (os.freemem()/1024**3).toFixed(2); 
    const uptime = os.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const formattedUptime = `${hours}:${minutes}:${seconds}`;
    
    return {
        platform: os.platform(),
        freeMemory: `${freeMemory} GB`,
        uptime: formattedUptime,
        cpuCount: os.cpus().length,
    }
};

const logSystemInfo = () => {
    const systemInfo = getSystemInfo();
    console.log(systemInfo);
};

module.exports = logSystemInfo;