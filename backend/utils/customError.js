

const customError = (massage, status) => { 
    const error = new Error(massage);
    error.status = status;
    return error;
};
  
export default customError;