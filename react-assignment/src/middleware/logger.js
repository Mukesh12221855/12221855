const eventLog = [];

/**
 * Custom logger for application events
 * @param {string} action - Description of the action/event
 * @param {*} details - Optional data related to the event
 */
export function recordLog(action, details = null) {
  const entry = {
    action,
    details,
    time: new Date().toLocaleString(),
  };
  eventLog.push(entry);
}

/**
 * Retrieve all logged events
 * @returns {Array} - List of logged entries
 */
export function fetchLogs() {
  return [...eventLog]; // Return a copy to prevent external mutation
}
