

const errorHandler = (err, req, res, next) => { 
  let statusCode = '';
  let message = '';
  // classify and handle mongoose operation error
  if (err.name === 'ValidationError') { 
    statusCode = 400;
    message = 'Error in schema validation process';
  } else if (err.name === 'CastError') { 
    statusCode = 400; 
    message = 'Error in cast value process'
  } else if (err.name === 'MongoError') { 
    statusCode = 409;
    message = 'Duplicated value';
  } else if (err.name === 'VersionError') { 
    statusCode = 400; 
    message = 'Mongoose version error'
  } else if (!err.name && !err.message) { 
    statusCode = 500; 
    message = 'Query, connection, other internal error';
  } else { 
    statusCode = err.status; // this is dev logic error 
    message = err.message;
  }

  if (err.status !== 500) { 
    res.status(statusCode).json(message);
  } else { 
    res.status(500).json(messgae);
  }
};

export default errorHandler;