export const APP_CONSTANTS = {
  SERVICES: {
    PRODUCT_SEARCH: 'Product Search',
    KEYWORD_SEARCH: 'Keyword Search'
  },
  STATUS: {
    SCHEDULED: 'Scheduled',
    PROCESSING: 'Processing',
    COMPLETED: 'Completed',
    FAILED: 'Failed',
    STOPPED: 'Stopped'
  },
  UI: {
    SNACKBAR_DURATION: 5000,
    SNACKBAR_POSITION: 'center',
    ANIMATION_DURATION: '225ms',
    ANIMATION_CURVE: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  VALIDATION: {
    REQUIRED_FIELDS: {
      PRODUCT_SEARCH: ['country', 'webPID', 'pincode'],
      KEYWORD_SEARCH: ['country', 'brand']
    }
  },
  TIME_FORMAT: {
    REGEX: /(\d+):(\d+) (\w+)/,
    DEFAULT_FORMAT: 'hh:mm A'
  }
};

export const ERROR_MESSAGES = {
  VALIDATION: {
    INVALID_DATE: 'Please select a valid date',
    INVALID_TIME: 'Please select a valid time',
    MISSING_DATA: 'Required data is missing',
    INVALID_FORMAT: 'Invalid data format'
  },
  API: {
    NOT_FOUND: 'The requested resource was not found',
    UNAUTHORIZED: 'Please log in to continue',
    FORBIDDEN: 'You do not have permission to perform this action',
    BAD_REQUEST: 'Invalid request. Please check your input',
    SERVER_ERROR: 'Server error. Please try again later'
  },
  BATCH: {
    PROCESSING_FAILED: 'Batch processing failed',
    MISSING_REQUIRED_DATA: 'Missing required data for processing',
    STOPPED: 'Processing stopped by user'
  }
};

export const SUCCESS_MESSAGES = {
  BATCH: {
    COMPLETED: 'Batch processing completed successfully',
    SCHEDULED: 'Batch scheduled successfully',
    STOPPED: 'Batch processing stopped successfully'
  },
  FORM: {
    VALID: 'Form validation successful',
    SUBMITTED: 'Form submitted successfully'
  }
}; 